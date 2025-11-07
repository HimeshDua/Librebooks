import {unstable_cache} from 'next/cache';
import {publicSupabase} from '@/lib/supabase/public';

export async function getPopularBooks(page: number, pageSize: number) {
  const cachedFunction = unstable_cache(
    async (p: number, ps: number) => {
      const from = (p - 1) * ps;
      const to = from + ps - 1;

      const {data, count, error} = await publicSupabase
        .from('books')
        .select('id,slug,title,author,cover_url,download_count', {count: 'exact'})
        .order('download_count', {ascending: false})
        .range(from, to);

      if (error) {
        console.error('Error fetching popular books:', error);
        return {data: [], count: 0, error};
      }
      console.log('Fetched popular books from database.');
      return {data: data || [], count: count || 0, error: null};
    },
    ['popular-books'],
    {revalidate: 3600, tags: ['books', 'popular']}
  );

  return cachedFunction(page, pageSize);
}
