'use server';

import ToggleFavoriteBook from '../favoritism/toggleFavoriteBook';
import {Button} from '@/components/ui/button';
import AuthDialog from '../auth-dialog';
import {BookOpen} from 'lucide-react';
import type {Book} from '@/types/book';
import {cn} from '@/lib/utils';
import Link from 'next/link';

export default async function UserBookActions({userId, book}: {userId: string | null; book: Book}) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 max-w-238 w-full">
      {book.epub_url && (
        <>
          <Button asChild className="flex-1 md:w-auto py-4">
            <Link href={`/read/${book.gutenberg_id}`}>
              <BookOpen className="mr-2 h-4 w-4" /> Read Online
            </Link>
          </Button>

          {userId ? (
            <Button
              className="flex-1 md:w-auto py-4 cursor-pointer bg-secondary"
              variant="outline"
              asChild
            >
              <Link href={book.epub_url} target="_blank" className="gap-x-1">
                📚 Download
                <span className="hidden md:inline -mx-px">ePub</span>
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
          )}
        </>
      )}

      <ToggleFavoriteBook id={userId ?? undefined} bookId={book.id!} bookTitle={book.title} />
    </div>
  );
}
