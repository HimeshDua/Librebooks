import {publicSupabase} from '@/lib/supabase/public';
import {cache} from 'react';

export const getBooksByCategory = cache(
  async (category: string, page: number, pageSize: number) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // cacheLife('hours');
    // cacheTag('books', 'categories', category);

    const {data, count, error} = await publicSupabase
      .from('books')
      .select('id,slug,title,author,cover_url,download_count', {count: 'exact'})
      .contains('bookshelves', [category])
      .order('download_count', {ascending: false})
      .range(from, to);

    if (error) {
      console.error(`[getBooksByCategory] ${category}`, error.message);
      return {data: [], count: 0, error: error.message};
    }

    return {data: data ?? [], count: count ?? 0, error: null};
  }
);
