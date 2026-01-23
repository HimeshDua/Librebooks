'use server';

import {createClient} from '@/lib/supabase/server';
import type {Book} from '@/types/book';

type FavoriteResponse = {
  book: Book[];
};

type getFavoriteBooksProps = {
  favorites: number[];
  userId: string | null;
};

export const getFavoriteBooks = async ({favorites, userId}: getFavoriteBooksProps) => {
  const supabase = await createClient();

  let query = supabase
    .from('favorite')
    .select('book(slug,title,author,cover_url)')
    .order('created_at', {ascending: false});

  if (userId) {
    query.eq('user_id', userId);
  } else if (favorites.length > 0) {
    query.in('book_id', favorites);
  }

  const {data, error} = await query.returns<FavoriteResponse[]>();
  if (error) console.error(error);

  const mapped = data ? data.flatMap(fav => fav.book || []).filter(Boolean) : [];
  return {books: mapped};
};
