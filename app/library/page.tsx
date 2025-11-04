import { Suspense } from 'react';
import { Search } from 'lucide-react';
import SelectBookCategory from '@/components/book/bookCategory';
import BookFallback from '@/components/book/bookFallback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import type { Book } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

function SearchForm({ initialQuery = '' }: { initialQuery?: string }) {
  return (
    <form className="flex items-center gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          name="q"
          placeholder="Search books by title or author..."
          aria-label="Search books"
          className="pl-10 pr-4 py-2 rounded-full w-full"
          defaultValue={initialQuery}
        />
      </div>
      <Button type="submit" className="rounded-full px-6">
        Search
      </Button>
    </form>
  );
}

function PaginationControls({ query, page, totalPages }: { query: string; page: number; totalPages: number }) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const makeUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("page", newPage.toString());
    return `/?${params.toString()}`;
  };

  return (
    <nav className="flex items-center justify-center gap-3 mt-10 w-full" aria-label="Pagination">
      <Button className="rounded-2xl" variant="outline" size="sm" disabled={prevDisabled}>
        <Link href={makeUrl(Math.max(1, page - 1))} aria-disabled={prevDisabled}>
          ← Prev
        </Link>
      </Button>

      <div className="px-3 py-2 rounded-full bg-muted text-sm font-semibold min-w-[80px] text-center">
        Page {page} / {totalPages || 1}
      </div>

      <Button className="rounded-2xl" variant="outline" size="sm" disabled={nextDisabled}>
        <Link href={makeUrl(Math.min(totalPages || 1, page + 1))} aria-disabled={nextDisabled}>
          Next →
        </Link>
      </Button>
    </nav>
  );
}

export default async function Library({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const supabase = await createClient();
  const PAGE_SIZE = 12;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const query = ((await searchParams).q || '').trim();
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
            <h2 className="text-lg font-semibold">
              {query ? `Search results for "${query}"` : 'Popular Books'}
            </h2>
            {count !== null && (
              <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                {count} books
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <SelectBookCategory className="min-w-[160px]" />
          </div>
        </div>

        <Separator />

        {/* Books Grid */}
        <Suspense fallback={<BookFallback />}>
          <section className="mt-8">
            {books && books.length > 0 ? (
              <ul className="group/card-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 transition-all duration-300">
                {books.map((book: Book) => (
                  <HoverCard key={book.id} openDelay={150} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <li className="group/card relative transition-all duration-500 md:hover:scale-[1.03] md:hover:z-10 md:group-hover/card-grid:blur-[1.2px] md:group-hover/card-grid:opacity-80 md:hover:!opacity-100 md:hover:!blur-none">
                        <Link
                          target="_blank"
                          href={`/book/${book.id}`}
                          aria-label={`Open ${book.title}`}
                          className="block"
                        >
                          <div className="relative w-full aspect-[3/4] bg-muted rounded-lg overflow-hidden shadow-sm border border-border/50">
                            {book.cover_url ? (
                              <Image
                                loading="eager"
                                src={book.cover_url}
                                alt={book.title}
                                fill
                                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-200 ease-out group-hover/card:scale-[1.01] md:group-hover/card:scale-[1.02]"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                                No cover
                              </div>
                            )}
                          </div>

                          <div className="p-3 transition-all duration-300">
                            <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {book.author || "Unknown"}
                            </p>
                          </div>
                        </Link>
                      </li>
                    </HoverCardTrigger>

                    <HoverCardContent
                      className="hidden md:block w-72 p-4 bg-background/90 backdrop-blur-xl rounded-xl shadow-lg border border-border/50"
                      align="center"
                      side="top"
                      sideOffset={16}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-full max-w-20 h-24 rounded-md overflow-hidden">
                          {book.cover_url ? (
                            <Image src={book.cover_url} alt={book.title} fill className="object-cover w-full" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                              No cover
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-between">
                          <h4 className="text-sm font-semibold leading-tight">{book.title}</h4>
                          <p className="text-xs text-muted-foreground">{book.author || "Unknown"}</p>
                          <p className="text-xs mt-2 text-muted-foreground">
                            {book.download_count
                              ? `${book.download_count.toLocaleString()} downloads`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </ul>
            ) : (
              <div className="py-20 text-center">
                <div className="max-w-md mx-auto">
                  <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No books found</h3>
                  <p className="text-sm text-muted-foreground">
                    {query
                      ? `No results for "${query}". Try different keywords or browse all books.`
                      : 'No books available at the moment. Please check back later.'
                    }
                  </p>
                  {query && (
                    <Button asChild variant="outline" className="mt-4">
                      <Link href="/library">Browse All Books</Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </section>
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