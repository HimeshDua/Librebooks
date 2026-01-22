import {publicSupabase} from '@/lib/supabase/public';
import {cache} from 'react';

export const getPopularBooks = cache(async (page: number, pageSize: number) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {data, count, error} = await publicSupabase
    .from('book')
    .select('id, slug, title, author, cover_url, download_count', {count: 'exact'})
    .order('download_count', {ascending: false})
    .range(from, to);

  if (error) {
    console.error('[getPopularBooks]', error.message);
    return {data: [], count: 0, error: error.message};
  }

  return {data: data || [], count: count || 0, error: null};
});
