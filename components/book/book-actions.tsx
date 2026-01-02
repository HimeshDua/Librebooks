'use server';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import ToggleFavoriteBook from '../favoritism/toggleFavoriteBook';
import AuthDialog from '../auth-dialog';
import {BookOpen} from 'lucide-react';
import type {Book} from '@/types';
import {getUserByInfo} from '@/lib/getUserByInfo';

export default async function UserBookActions({book}: {book: Book}) {
  const userId = (await getUserByInfo()).user?.id ?? null;

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {book.epub && (
        <Button asChild>
          <Link href={`/read/${book.gutenberg_id}`}>
            <BookOpen className="mr-2 h-4 w-4" /> Read Online
          </Link>
        </Button>
      )}

      {book.epub &&
        (userId ? (
          <Button className="w-full py-4 md:w-auto" variant="outline" asChild>
            <Link href={book.epub} target="_blank">
              📚 Download ePub
            </Link>
          </Button>
        ) : (
          <AuthDialog description="download books" dialogTrigger="Download EPUB" />
        ))}

      <ToggleFavoriteBook id={userId} bookId={book.id} bookTitle={book.title} />
    </div>
  );
}
