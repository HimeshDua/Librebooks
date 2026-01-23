'use server';

import {createClient} from '@/lib/supabase/server';
import type {Book} from '@/types/book';

type FavoriteResponse = {
  book: Book[];
};

export const getFavoriteBooks = async ({favorites}: {favorites: number[]}) => {
  const supabase = await createClient();

  const {data, error} = await supabase
    .from('favorite')
    .select('book(slug,title,author,cover_url)')
    .in('book_id', favorites)
    .order('created_at', {ascending: false})
    .returns<FavoriteResponse[]>();

  if (error) console.error(error);

  // console.log('fav books: ', data);
  const mapped = data ? data.flatMap(fav => fav.book || []).filter(Boolean) : [];
  return {books: mapped};
};
