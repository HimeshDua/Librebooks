import {unstable_cache} from 'next/cache';
import {publicSupabase} from '@/lib/supabase/public';

async function fetchPopularBooks(page: number, pageSize: number) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {data, count, error} = await publicSupabase
    .from('books')
    .select('id, slug, title, author, cover_url, download_count', {count: 'exact'})
    .order('download_count', {ascending: false})
    .range(from, to);

  if (error) {
    console.error('Error fetching popular books:', error);
    return {data: [], count: 0, error};
  }

  return {data: data || [], count: count || 0, error: null};
}

export async function getPopularBooks(page: number, pageSize: number) {
  const cached = unstable_cache(
    async () => fetchPopularBooks(page, pageSize),
    ['popular-books', `page-${page}`, `size-${pageSize}`],
    {revalidate: 3600, tags: ['books', 'popular']}
  );

  return cached();
}
