'use client';

import ToggleFavoriteBook from '../favoritism/toggle-favorite-book';
import {Button} from '@/components/ui/button';
import AuthDialog from '../auth/auth-dialog';
import {BookOpen, Download} from '@hugeicons/core-free-icons';
import type {Book} from '@/types/book';
import {cn} from '@/lib/utils';
import {HugeiconsIcon} from '@hugeicons/react';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export function UserBookActions({userId, book}: {userId: string | null; book: Book}) {
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (action: string, href: string) => {
    setIsRedirecting(action);
    router.push(href);
    setTimeout(() => setIsRedirecting(null), 3000);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-3 max-w-238 w-full">
      {book.epub_url && (
        <>
          <Button
            className={cn(
              'flex-1 md:w-auto py-4 transition-all duration-200',
              isRedirecting === 'read' && 'opacity-70 cursor-not-allowed'
            )}
            disabled={isRedirecting === 'read'}
            onClick={() => handleNavigation('read', `/read/${book.gutenberg_id}`)}
            nativeButton={false}
            render={
              <div className="flex items-center justify-center gap-2">
                {isRedirecting === 'read' ? (
                  <>
                    <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Opening...</span>
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={BookOpen} className="size-4" />
                    <span>Read Online</span>
                  </>
                )}
              </div>
            }
          />

          {userId ? (
            <Button
              className={cn(
                'flex-1 md:w-auto py-4 cursor-pointer bg-secondary transition-all duration-200',
                isRedirecting === 'download' && 'opacity-70 cursor-not-allowed'
              )}
              variant="outline"
              disabled={isRedirecting === 'download'}
              onClick={() => {
                setIsRedirecting('download');
                setTimeout(() => {
                  window.open(book.epub_url!, '_blank');
                  setIsRedirecting(null);
                }, 300);
              }}
              nativeButton={false}
            >
              {isRedirecting === 'download' ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Preparing download...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-1">
                  <HugeiconsIcon icon={Download} className="size-4" />
                  <span>Download</span>
                  <span className="hidden md:inline -mx-px">ePub</span>
                </div>
              )}
            </Button>
          ) : (
            <AuthDialog
              description="download books"
              dialogTrigger={
                <div className="flex items-center justify-center gap-2">
                  <HugeiconsIcon icon={Download} className="size-4" />
                  <span>Download EPUB</span>
                </div>
              }
              triggerClassName={cn(
                'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                'w-full md:w-auto py-4',
                'cursor-pointer transition-all duration-200',
                isRedirecting === 'auth' && 'opacity-70 cursor-not-allowed'
              )}
              triggerDisabled={isRedirecting === 'auth'}
              onDialogOpen={() => setIsRedirecting('auth')}
              onDialogClose={() => setIsRedirecting(null)}
            />
          )}
        </>
      )}

      <ToggleFavoriteBook
        userId={userId}
        bookId={book.id!}
        bookTitle={book.title}
        disabled={isRedirecting !== null}
        className={cn(isRedirecting && 'opacity-50 cursor-not-allowed')}
      />
    </div>
  );
}
