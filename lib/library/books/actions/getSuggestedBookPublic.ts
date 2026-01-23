'use server';

import {publicSupabase as supabase} from '@/lib/supabase/public';
import type {SuggestedBook} from '@/types/book';

type getSuggestedBookResult = Promise<{
  data: SuggestedBook[] | null;
  error: Error | null;
}>;

type getSuggestedBooksProps = {
  currentBookId: number;
  favoriteIds: number[];
  languages: string[];
};

export const getSuggestedBooksPublic = async ({
  currentBookId,
  favoriteIds,
  languages,
}: getSuggestedBooksProps): getSuggestedBookResult => {
  try {
    if (!currentBookId) return {data: null, error: null};

    // const favoriteId = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // const favoriteIds = await getUserFavorites(userId);

    const {data, error} = await supabase
      .from('book')
      .select('id, slug, title, cover_url, author, languages, download_count')
      .neq('id', currentBookId)
      .overlaps('languages', languages)
      .not('id', 'in', `(${favoriteIds.join(',')})`)
      .order('download_count', {ascending: false})
      .limit(5);
    console.log('dd', data, error);

    return {data, error};
  } catch (e: any) {
    return {data: null, error: e.message};
  }
};
