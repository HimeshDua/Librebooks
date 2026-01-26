'use server';

import {publicSupabase as supabase} from '@/lib/supabase/public';
import type {SuggestedBook} from '@/types/book';

type getSuggestedBookResult = Promise<{
  data: SuggestedBook[] | null;
  error: Error | null;
}>;

type getSuggestedBooksProps = {
  currentBookId: number;
  favorites: Set<number>;
  languages: string[];
};

export const getSuggestedBooks = async ({
  currentBookId,
  favorites,
  languages,
}: getSuggestedBooksProps): getSuggestedBookResult => {
  const favoriteIds = Array.from(favorites);
  console.log('favorites: ', favorites);

  let query = supabase
    .from('book')
    .select('id, slug, title, cover_url')
    .neq('id', currentBookId)
    .order('download_count', {ascending: false})
    .limit(5);

  if (favoriteIds.length > 0 || favorites.size) {
    query.not('id', 'in', `(${favoriteIds.join(',')})`);
  }
  if (languages.length > 0) {
   query.overlaps('languages', languages);
  }
  const {data, error} = await query;

  return {data, error};
};
