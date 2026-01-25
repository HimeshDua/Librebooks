'use client';

import ToggleFavoriteBook from '@/components/favoritism/toggle-favorite-book';
import {blurDataUrl} from '@/data';
import {getSuggestedBooks} from '@/lib/library/books/actions/getSuggestedBook';
import {useFavorite} from '@/store';
import type {SuggestedBook} from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

type Props = {
  currentBookId: number;
  languages: string[];
};

export default function SuggestedBookSection({currentBookId, languages}: Props) {
  const favorites = useFavorite(s => s.favorites);
  const [books, setBooks] = useState<SuggestedBook[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      getSuggestedBooks({currentBookId, favorites, languages}).then(n => {
        if (n.error) console.error(n.error.message);
        if (n.data) setBooks(n.data);
      });
    } finally {
      setLoading(false);
    }
  }, [favorites, currentBookId, languages]);

  if (!books.length && !loading) return null;

  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-3xl font-medium md:text-4xl tracking-tight">You might also like</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map((book, index) => (
          <li
            key={book.id}
            className="group relative opacity-0 fade-in"
            style={{'--i': index} as React.CSSProperties}
          >
            <ToggleFavoriteBook
              title="Add To Favorite"
              className="absolute top-2 right-2 z-30 bg-secondary/40 hover:bg-secondary/50 border border-accent/50"
              minimal
              variant="secondary"
              bookId={book.id!}
              bookTitle={book.title}
            />

            <Link href={`/book/${book.slug}`}>
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden border">
                <Image
                  src={book.cover_url || '/default-book-cover.jpg'}
                  alt={book.title}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mt-3 text-sm font-medium line-clamp-2">{book.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
