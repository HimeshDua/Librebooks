import {Separator} from '@/components/ui/separator';
import type {LocalBook} from '@/types';
import {ViewModeToggle} from '@/components/library/viewMode';
import {BookDisplay} from '@/components/library/bookDisplay';
import SelectBookCategory from '@/components/book/bookCategory';
import {SearchForm} from '@/components/library/searchForm';
import {PaginationControls} from '@/components/library/paginationControl';
import {Suspense} from 'react';
import BookDisplaySkeleton from '@/components/library/bookDisplaySkeleton';
// import {getPopularBooks} from '@/lib/library/getPopularBooks';
import {getBooksByCategory} from '@/lib/library/getBooksByCategory';
import {fetchBooksDirectly} from '@/lib/library/fetchBooksDirectly';
import {LIBRARY_CONFIG} from '@/lib/library/config';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Free Public Domain Books | LibreBooks Library',
  description:
    'Explore 30,000+ free public domain books. Read, download, and discover classic literature, fiction, non-fiction, and academic works. No registration required.',
  keywords: [
    'free books',
    'public domain books',
    'classic literature',
    'free ebooks',
    'online library',
    'project gutenberg books',
    'free reading',
    'digital library',
    'ebook collection',
    'literary classics',
  ].join(', '),

  // Open Graph for Social Media
  openGraph: {
    type: 'website',
    url: `https://${process.env.VERCEL_URL || 'librebooks.vercel.app'}/library`,
    title: 'LibreBooks - Free Public Domain Library',
    description:
      'Discover 30,000+ free public domain books. Read online or download instantly. No costs, no registration.',
    siteName: 'LibreBooks',
    images: [
      {
        url: '/og-library.jpg', // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: 'LibreBooks - Free Public Domain Books Library',
      },
    ],
    locale: 'en_US',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'LibreBooks - Free Public Domain Library',
    description: 'Explore 30,000+ free public domain books. Read instantly in your browser.',
    creator: '@librebooks', // Your Twitter handle
    images: ['/og-library.jpg'],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Alternates and Canonical
  alternates: {
    canonical: `https://${process.env.VERCEL_URL || 'librebooks.vercel.app'}/library`,
    languages: {
      'en-US': `https://${process.env.VERCEL_URL || 'librebooks.vercel.app'}/library`,
    },
  },

  // verification: {
  //   google: 'your-google-verification-code', // If you have Google Search Console
  // },

  // App Links
  appLinks: {
    web: {
      url: 'https://librebooks.vercel.app/library',
      should_fallback: true,
    },
  },

  category: 'education',
  classification: 'Digital Library',
};

export default async function Library({
  searchParams,
}: {
  searchParams: Promise<{page?: string; q?: string; category?: string; view?: string}>;
}) {
  const resolvedParams = await searchParams;
  const page = Math.max(1, Number(resolvedParams.page) || 1);
  const query = (resolvedParams.q || '').trim();
  const category = resolvedParams.category || 'All';
  const urlViewMode = resolvedParams.view;

  const {PAGE_SIZE, MAX_CACHED_PAGE, CACHED_CATEGORIES} = LIBRARY_CONFIG;

  let books: LocalBook[] = [];
  let count = 0;
  let error: string | null = null;

  try {
    if (query) {
      const result = await fetchBooksDirectly(page, PAGE_SIZE, category, query);
      books = result.data;
      count = result.count;
      error = result.error?.message || null;
    } else if (page > MAX_CACHED_PAGE) {
      const result = await fetchBooksDirectly(page, PAGE_SIZE, category);
      books = result.data;
      count = result.count;
      error = result.error?.message || null;
    } else if (category === 'All') {
      // const result = await getPopularBooks(page, PAGE_SIZE);
      const result = await fetchBooksDirectly(page, PAGE_SIZE);
      books = result.data;
      count = result.count;
      error = result.error?.message || null;
    } else if (CACHED_CATEGORIES.includes(category as (typeof CACHED_CATEGORIES)[number])) {
      const result = await getBooksByCategory(category, page, PAGE_SIZE);
      books = result.data;
      count = result.count;
      error = result.error?.message || null;
    } else {
      const result = await fetchBooksDirectly(page, PAGE_SIZE, category);
      books = result.data;
      count = result.count;
      error = result.error?.message || null;
    }
  } catch (err) {
    console.error('Error fetching books:', err);
    error = err instanceof Error ? err.message : 'Failed to load books';
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl text-center">
          <h2 className="text-lg font-semibold mb-2">Failed to load books</h2>
          <p className="text-sm text-destructive">{error}</p>
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
            <ViewModeToggle className="order-2 sm:order-1" />
            <SelectBookCategory className="w-full sm:w-auto min-w-[160px]" />
          </div>
        </div>

        <Separator />

        <Suspense fallback={<BookDisplaySkeleton />}>
          <BookDisplay books={books} query={query} urlViewMode={urlViewMode} />
        </Suspense>

        {books && books.length > 0 && (
          <div className="mt-8">
            <PaginationControls
              page={page}
              query={query}
              view={urlViewMode}
              category={category}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </main>
  );
}
