import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '../ui/card';
import type {Book} from '@/types/book';
import {blurDataUrl} from '@/data';
import FavoritesBlockSkeleton from '../skeletons/favorites-block';
import {HugeiconsIcon} from '@hugeicons/react';
import {Heart, LibraryBig} from '@hugeicons/core-free-icons';

export default function FavoritesBlock({books, isLoading}: {isLoading: boolean; books: Book[]}) {
  if (isLoading) return <FavoritesBlockSkeleton />;

  if (isLoading && books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <HugeiconsIcon icon={Heart} className="size-12 text-red-500 mb-3" />

        <h2 className="text-2xl font-bold">No Favorite Books Yet</h2>
        <p className="text-muted-foreground mt-2 mb-4">Start exploring and add some favorites.</p>
        <Link href="/library">
          <Button className="rounded-full px-6">Browse Library</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-10 px-4 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold flex gap-2">
            <HugeiconsIcon icon={LibraryBig} /> Your Favorites
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book, idx) => (
            <Card key={book.slug} className="p-0">
              <Link href={`/book/${book.slug}`}>
                <div className="relative aspect-3/4">
                  <Image
                    loading={idx < 4 ? 'eager' : 'lazy'}
                    src={book.cover_url || '/default-book-cover.jpg'}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold truncate">{book.title || 'Something went wrong'}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {book.author || 'Unknown'}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
