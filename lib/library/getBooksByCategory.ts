import {unstable_cache} from 'next/cache';
import {publicSupabase} from '@/lib/supabase/public';

export async function getBooksByCategory(category: string, page: number, pageSize: number) {
  const cachedFunction = unstable_cache(
    async (c: string, p: number, ps: number) => {
      const from = (p - 1) * ps;
      const to = from + ps - 1;

      const {data, count, error} = await publicSupabase
        .from('books')
        .select('id,slug,title,author,cover_url,download_count', {count: 'exact'})
        .contains('bookshelves', [c])
        .order('download_count', {ascending: false})
        .range(from, to);

      if (error) {
        console.error(`Error fetching ${c} books:`, error);
        return {data: [], count: 0, error};
      }

      console.log(`Fetched ${c} books from database. Category caching in effect.`);
      return {data: data || [], count: count || 0, error: null};
    },
    [`category-books-${category}`],
    {
      revalidate: 3600,
      tags: ['books', 'categories', `category-${category}`],
    }
  );

  return cachedFunction(category, page, pageSize);
}
