import {publicSupabase} from '@/lib/supabase/public';

export async function getSuggestedBooks({
  currentBookId,
  favoriteIds,
  languages,
}: {
  currentBookId: number;
  favoriteIds: number[];
  languages: string[];
}) {
  let query = publicSupabase
    .from('book')
    .select('id, slug, title, cover_url')
    .neq('id', currentBookId)
    .order('download_count', {ascending: false})
    .limit(6);

  if (favoriteIds.length) {
    query.not('id', 'in', `(${favoriteIds.join(',')})`);
  }

  if (languages.length) {
    query.overlaps('languages', languages);
  }

  return query;
}
