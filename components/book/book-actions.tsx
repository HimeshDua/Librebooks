'use server';

import ToggleFavoriteBook from '../favoritism/toggle-favorite-book';
import {Button} from '@/components/ui/button';
import AuthDialog from '../auth-dialog';
import {BookOpen} from '@hugeicons/core-free-icons';
import type {Book} from '@/types/book';
import {cn} from '@/lib/utils';
import Link from 'next/link';
import {HugeiconsIcon} from '@hugeicons/react';

export default async function UserBookActions({userId, book}: {userId: string | null; book: Book}) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 max-w-238 w-full">
      {book.epub_url && (
        <>
          <Button
            className="flex-1 md:w-auto py-4"
            nativeButton={false}
            render={
              <Link href={`/read/${book.gutenberg_id}`}>
                <HugeiconsIcon icon={BookOpen} className="mr-2 size-4" />
                Read Online
              </Link>
            }
          />

          {userId ? (
            <Button
              className="flex-1 md:w-auto py-4 cursor-pointer bg-secondary"
              variant="outline"
              nativeButton={false}
              render={
                <Link href={book.epub_url} target="_blank" className="gap-x-1">
                  📚 Download
                  <span className="hidden md:inline -mx-px">ePub</span>
                </Link>
              }
            />
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

      <ToggleFavoriteBook userId={userId} bookId={book.id!} bookTitle={book.title} />
    </div>
  );
}
