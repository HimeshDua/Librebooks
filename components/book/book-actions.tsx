'use server';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import ToggleFavoriteBook from '../favoritism/toggleFavoriteBook';
import AuthDialog from '../auth-dialog';
import {BookOpen} from 'lucide-react';
import type {Book} from '@/types';
import {getUserByInfo} from '@/lib/getUserByInfo';
import {cn} from '@/lib/utils';

export default async function UserBookActions({book}: {book: Book}) {
  const userId = (await getUserByInfo()).user?.id ?? null;

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {book.epub && (
        <Button asChild className="w-full md:w-auto py-4">
          <Link href={`/read/${book.gutenberg_id}`}>
            <BookOpen className="mr-2 h-4 w-4" /> Read Online
          </Link>
        </Button>
      )}

      {book.epub &&
        (userId ? (
          <Button className="w-full md:w-auto py-4 cursor-pointer" variant="outline" asChild>
            <Link href={book.epub} target="_blank">
              📚 Download ePub
            </Link>
          </Button>
        ) : (
          <AuthDialog
            description="download books"
            dialogTrigger="Download EPUB"
            triggerClassName={cn(
              'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
              'w-full md:w-auto py-4',
              'cursor-pointer'
            )}
          />
        ))}

      <ToggleFavoriteBook id={userId} bookId={book.id} bookTitle={book.title} />
    </div>
  );
}
