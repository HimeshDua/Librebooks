import {publicSupabase} from '@/lib/supabase/public';

export async function fetchBooksDirectly(
  page: number,
  pageSize: number,
  category: string = 'All',
  query?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let builder = publicSupabase
    .from('book')
    .select('id, slug, title, author, cover_url, download_count', {count: 'exact'})
    .order('download_count', {ascending: false})
    .range(from, to);

  if (!query && category && category !== 'All') {
    builder = builder.contains('bookshelves', [category]);
  }

  if (query && query.trim()) {
    builder = builder.or(`title.ilike.%${query}%,author.ilike.%${query}%`);
  }

  const {data, count, error} = await builder;

  if (error) {
    console.error('Error fetching books directly:', error);
    return {data: [], count: 0, error: error.message};
  }
  return {data: data || [], count: count || 0, error: null};
}
