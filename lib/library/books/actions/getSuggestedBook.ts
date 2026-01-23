'use server';

import {publicSupabase as supabase} from '@/lib/supabase/public';
import type {SuggestedBook} from '@/types/book';
import {getUserFavorites} from '../favorites/actions/getFavBookIds';

type getSuggestedBookResult = Promise<{
  data: SuggestedBook[] | null;
  error: Error | null;
}>;

type getSuggestedBooksProps = {
  currentBookId: number;
  languages: string[];
  userId: string | null;
};

export const getSuggestedBooks = async ({
  currentBookId,
  languages,
  userId,
}: getSuggestedBooksProps): getSuggestedBookResult => {
  if (!userId || !currentBookId) return {data: null, error: null};

  const favoriteIds = await getUserFavorites(userId);

  const {data, error} = await supabase
    .from('book')
    .select('id, slug, title, cover_url, author, languages, download_count')
    .neq('id', currentBookId)
    .overlaps('languages', languages)
    .not('id', 'in', `(${favoriteIds.join(',')})`)
    .order('download_count', {ascending: false})
    .limit(5);

  return {data, error};
};
