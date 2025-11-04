import BookFallback from '@/components/book/bookFallback';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import type { Book } from '@/types';
import { ViewModeToggle } from '@/components/library/viewMode';
import { BookDisplay } from '@/components/library/bookDisplay';
import SelectBookCategory from '@/components/book/bookCategory';
import { SearchForm } from '@/components/library/searchForm';
import { PaginationControls } from '@/components/library/paginationControl';
import { Suspense } from 'react';


export default async function Library({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string; view?: string }>;
}) {
  const supabase = await createClient();
  const PAGE_SIZE = 12;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const query = ((await searchParams).q || '').trim();
  const urlViewMode = (await searchParams).view;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const selectColumns = 'id,title,author,cover_url,download_count';
  const builder = supabase
    .from('books')
    .select(selectColumns, { count: 'exact' })
    .order('download_count', { ascending: false })
    .range(from, to);

  const category = (await searchParams).category || 'All';
  if (category !== 'All') builder.contains('bookshelves', [category]);

  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    builder.or(`title.ilike.%${trimmedQuery}%,author.ilike.%${trimmedQuery}%`);
  }

  const { data: dataBooks, error, count } = await builder;
  const books: Book[] = (dataBooks ?? []) as Book[];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl text-center">
          <h2 className="text-lg font-semibold mb-2">Failed to load books</h2>
          <p className="text-sm text-destructive">{error.message}</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Libre Books
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Discover 30,000+ free public-domain books. Curated, searchable, and ready to read.
          </p>
        </header>

        {/* Search Section */}
        <section className="mb-8">
          <SearchForm initialQuery={query} />
        </section>

        {/* Filters and Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg text-nowrap font-semibold">
              {query ? `Search results for "${query}"` : 'Popular Books'}
            </h2>
            {count !== null && (
              <span className="px-2 py-1 text-nowrap bg-muted rounded-full text-xs font-medium">
                {count} books
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ViewModeToggle className='order-2 sm:order-1' />

            <SelectBookCategory className="w-full sm:w-auto min-w-[160px]" />
          </div>
        </div>

        <Separator />

        {/* Books Display */}
        <Suspense fallback={<BookFallback />}>
          <BookDisplay
            books={books}
            query={query}
            urlViewMode={urlViewMode}
          />
        </Suspense>

        {books && books.length > 0 && (
          <div className="mt-8">
            <PaginationControls query={query} page={page} totalPages={totalPages} />
          </div>
        )}
      </div>
    </main>
  );
}