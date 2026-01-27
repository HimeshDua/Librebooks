import {Separator} from '@/components/ui/separator';
import type {LocalBook} from '@/types';
import {ViewModeToggle} from '@/components/library/viewMode';
import {BookDisplay} from '@/components/library/book-display';
import SelectBookCategory from '@/components/book/bookCategory';
import {SearchForm} from '@/components/library/searchForm';
import {PaginationControls} from '@/components/library/pagination-control';
import {BookDisplaySkeleton} from '@/components/skeletons/book-display';
import {getBooksByCategory} from '@/lib/library/getBooksByCategory';
import {fetchBooksDirectly} from '@/lib/library/fetchBooksDirectly';
import {LIBRARY_CONFIG} from '@/lib/library/config';
import {getPopularBooks} from '@/lib/library/getPopularBooks';
import type {Metadata} from 'next';
import {Suspense} from 'react';
import LibHeader from '@/components/library/header';

export const metadata: Metadata = {
  title: 'Free Public Domain Books | LibreBooks Library',
  description:
    'Explore 12000+ free public domain books. Read, download, and discover classic literature, fiction, non-fiction, and academic works. No registration required.',
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
  ],

  openGraph: {
    type: 'website',
    url: `https://${process.env.VERCEL_URL || 'librebooks.vercel.app'}/library`,
    title: 'LibreBooks - Free Public Domain Library',
    description:
      'Discover 12000+ free public domain books. Read online or download instantly. No costs, no registration.',
    siteName: 'LibreBooks',
    images: [
      {
        url: '/og-library.jpg',
        width: 1200,
        height: 630,
        alt: 'LibreBooks - Free Public Domain Books Library',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LibreBooks - Free Public Domain Library',
    description: 'Explore 12000+ free public domain books. Read instantly in your browser.',
    creator: '@HimeshDua',
    images: ['/og-library.jpg'],
  },

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

  alternates: {
    canonical: `https://${process.env.VERCEL_URL || 'librebooks.vercel.app'}/library`,
    languages: {
      'en-US': `https://${process.env.VERCEL_URL || 'librebooks.vercel.app'}/library`,
    },
  },

  verification: {google: 'ZqN_pVPqcbynnIC9mI9y7Zk3IDzxfkwuP9hapELyTuU'},

  appLinks: {
    web: {
      url: 'https://librebooks.vercel.app/library',
      should_fallback: true,
    },
  },

  category: 'education',
  classification: 'Digital Library',
};

type LibraryProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    view?: string;
  }>;
};

export default async function Library({searchParams}: LibraryProps) {
  const resolvedParams = await searchParams;
  const page = Math.max(1, Number(resolvedParams.page) || 1);
  const query = (resolvedParams.q || '').trim();
  const category = resolvedParams.category || 'All';

  const {PAGE_SIZE, MAX_CACHED_PAGE, CACHED_CATEGORIES} = LIBRARY_CONFIG;

  let books: LocalBook[] = [];
  let count = 0;
  let error: string | null = null;

  try {
    if (query) {
      const result = await fetchBooksDirectly(page, PAGE_SIZE, 'All', query);
      books = result.data;
      count = result.count;
      error = result.error || null;
    } else if (page > MAX_CACHED_PAGE) {
      const result = await fetchBooksDirectly(page, PAGE_SIZE, category);
      books = result.data;
      count = result.count;
      error = result.error || null;
    } else if (category === 'All') {
      ///cached
      const result = await getPopularBooks(page, PAGE_SIZE);
      books = result.data;
      count = result.count;
      error = result.error || null;
    } else if (CACHED_CATEGORIES.includes(category as (typeof CACHED_CATEGORIES)[number])) {
      ///cached
      const result = await getBooksByCategory(category, page, PAGE_SIZE);
      books = result.data;
      count = result.count;
      error = result.error || null;
    } else {
      const result = await fetchBooksDirectly(page, PAGE_SIZE, category);
      books = result.data;
      count = result.count;
      error = result.error || null;
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
    <main className="min-h-screen w-full py-6 sm:py-4 px-4 mx-auto">
      <div className="max-w-7xl mx-auto p-0">
        <LibHeader />
        <section className="mb-8">
          <SearchForm initialQuery={query} />
        </section>

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
            <SelectBookCategory className="w-full sm:w-auto min-w-40" />
          </div>
        </div>

        <Separator className="my-5" />

        <Suspense fallback={<BookDisplaySkeleton />}>
          <BookDisplay books={books} query={query} />
        </Suspense>

        {books && books.length > 0 && (
          <div className="mt-8">
            <PaginationControls
              page={page}
              query={query}
              category={category}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </main>
  );
}
