'use server';
import {getUserByInfo} from '@/lib/getUserByInfo';
import {publicSupabase as supabase} from '@/lib/supabase/public';
import type {SuggestedBook} from '@/types/book';
import {getUserFavorites} from '../favorites/actions/getUserFavorites';

type getSuggestedBookResult = Promise<{
  data: SuggestedBook[] | null;
  error: Error | null;
}>;

type getSuggestedBooksProps = {
  currentBookId: number;
  languages: string[];
};

export const getSuggestedBooks = async ({
  currentBookId,
  languages,
}: getSuggestedBooksProps): getSuggestedBookResult => {
  const userId = (await getUserByInfo()).user?.id ?? null;

  if (!userId) return {data: null, error: null};

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
