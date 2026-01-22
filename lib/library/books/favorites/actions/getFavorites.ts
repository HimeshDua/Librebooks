'use server';

import {createClient} from '@/lib/supabase/server';
import type {Book as FavoriteResponse} from '@/types/book';

export const getFavoriteBooks = async ({favorites}: {favorites: number[]}) => {
  const supabase = await createClient();

  const {data, error} = await supabase
    .from('book')
    .select('slug,  title, author, cover_url')
    .in('id', favorites)
    .order('created_at', {ascending: false})
    .returns<FavoriteResponse[]>();

  if (error) console.error(error);

  // console.log('fav books: ', data);
  const mapped = data ? data.flatMap(fav => fav || []).filter(Boolean) : [];
  return {books: mapped};
};
