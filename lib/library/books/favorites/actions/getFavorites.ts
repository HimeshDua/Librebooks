'use server';

import {createClient} from '@/lib/supabase/server';
import type {Book} from '@/types';

type FavoriteResponse = {
  books: Book[];
};
export const getFavoriteBooks = async ({userId}: {userId: string}) => {
  const supabase = await createClient();
  const {data, error} = await supabase
    .from('favorites')
    .select('book_id, books(slug,  title, author, cover_url)')
    .eq('user_id', userId)
    .order('created_at', {ascending: false})
    .returns<FavoriteResponse[]>();

  if (error) console.error(error);
  const mapped = data ? data.flatMap(fav => fav.books || []).filter(Boolean) : [];
  return {books: mapped};
};
