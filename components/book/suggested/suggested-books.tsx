'use client';

import ToggleFavoriteBook from '@/components/favoritism/toggle-favorite-book';
import {SuggestedBooksSkeleton} from '@/components/skeletons/suggested-books';
import {blurDataUrl} from '@/data';
import {getSuggestedBooks} from '@/lib/library/books/actions/get-suggested-book';
import {useFavorite} from '@/store';
import type {SuggestedBook} from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';
import {Suspense, useEffect, useState} from 'react';

type Props = {
  userId: string | null;
  currentBookId: number;
  languages: string[];
};

const BOOKS_TO_FETCH = 6;

const getResponsiveCols = () => {
  if (typeof window === 'undefined') return 'grid-cols-2';

  const width = window.innerWidth;
  if (width < 480) return 'grid-cols-2';
  if (width < 640) return 'grid-cols-3';
  if (width < 768) return 'grid-cols-3';
  if (width < 1024) return 'grid-cols-3';
  return 'grid-cols-6';
};

export default function SuggestedBookSection({currentBookId, languages, userId}: Props) {
  const [books, setBooks] = useState<SuggestedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [gridCols, setGridCols] = useState('grid-cols-6');
  const favoriteIds = useFavorite(s => s.favorites);

  const favoriteKey = Array.from(favoriteIds).join(',');

  useEffect(() => {
    setGridCols(getResponsiveCols());

    const handleResize = () => {
      setGridCols(getResponsiveCols());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    getSuggestedBooks({
      currentBookId,
      favoriteIds: Array.from(favoriteIds),
      languages,
    })
      .then(({data, error}) => {
        if (cancelled) return;
        if (error) console.error(error.message);

        if (data) setBooks(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [currentBookId, favoriteKey, languages.join(',')]);

  if (loading || !books.length)
    return <SuggestedBooksSkeleton gridCols={gridCols} BOOKS_TO_FETCH={BOOKS_TO_FETCH} />;

  if (!books.length && !loading) return null;

  return (
    <section className="flex flex-col gap-y-6">
      <h2 className="text-3xl font-medium md:text-3xl tracking-tighter">You might also like</h2>

      <Suspense
        fallback={<SuggestedBooksSkeleton gridCols={gridCols} BOOKS_TO_FETCH={BOOKS_TO_FETCH} />}
      >
        <ul className={`grid ${gridCols} gap-4 md:gap-5 lg:gap-6`}>
          {books.map((book, index) => (
            <li
              key={book.id}
              className="group relative min-h-24 h-full w-full min-w-12 opacity-0 fade-in"
              style={{'--i': index} as React.CSSProperties}
            >
              <ToggleFavoriteBook
                minimal
                title="Add To Favorite"
                variant="secondary"
                userId={userId}
                bookId={book.id!}
                bookTitle={book.title}
                containerClassName="bg-secondary/40 hover:bg-secondary/50 border border-accent/50 size-8 sm:size-9"
                className="size-8 sm:size-9"
              />

              <Link href={`/book/${book.slug}`}>
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border">
                  <Image
                    src={book.cover_url || '/default-book-cover.jpg'}
                    alt={book.title}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    fill
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-sm font-medium line-clamp-2">{book.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Suspense>
    </section>
  );
}
