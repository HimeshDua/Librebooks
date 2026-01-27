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

  if (!userId && (!favorites || favorites.length === 0)) {
    return {books: []};
  }

  let query = supabase
    .from('favorite')
    .select('book(slug,title,author,cover_url)')
    .order('created_at', {ascending: false});

  if (userId) {
    query.eq('user_id', userId);
  } else if (favorites.length > 0) {
    if (favorites.length === 0) {
      return {books: []};
    }

    query.in('book_id', favorites);
  } else {
    return {books: []};
  }

  const {data, error} = await query.returns<FavoriteResponse[]>();
  if (error) {
    console.error('Database error:', error);
    return {books: []};
  }

  const mapped = data
    ? data
        .map(fav => fav?.book)
        .filter(Boolean)
        .flat()
    : [];

  return {books: mapped};
};
