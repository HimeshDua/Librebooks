'use client';

import Link from 'next/link';
import Image from 'next/image';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Button} from '@/components/ui/button';
import {LocalBook} from '@/types';
import {useViewMode} from '@/store';
import {cn} from '@/lib/utils';
import {Search} from '@hugeicons/core-free-icons';
import {HugeiconsIcon} from '@hugeicons/react';

interface BookDisplayProps {
  books: LocalBook[];
  query: string;
}

const layoutClasses = {
  COMPACT: 'space-y-2',
  GRID: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6',
};

export function BookDisplay({books, query}: BookDisplayProps) {
  const mode = useViewMode(m => m.mode);
  const isCompact = mode === 'COMPACT';

  if (!books || books.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-md mx-auto">
          <HugeiconsIcon
            icon={Search}
            className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-sm text-muted-foreground">
            {query
              ? `No results for "${query}". Try different keywords or browse all books.`
              : 'No books available at the moment. Please check back later.'}
          </p>
          {query && (
            <Button
              render={
                <Link prefetch href="/library">
                  Browse All Books
                </Link>
              }
              variant="outline"
              className="mt-4"
            ></Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ul role="listbox" className={cn('transition-all duration-200', layoutClasses[mode])}>
      {books.map((book: LocalBook, index) => (
        <HoverCard
          key={book.slug}
          //openDelay={150}
          // closeDelay={100}
        >
          <HoverCardTrigger

          //asChild
          >
            <div
              title={book.title}
              className={cn(
                'group/card relative duration-200 rounded-lg',
                isCompact &&
                  'hover:bg-muted/50 border border-transparent hover:border-border px-2 py-1'
              )}
            >
              <Link
                href={`/book/${book.slug}`}
                aria-label={`Open ${book.title}`}
                role="listitem"
                className={cn('flex w-full', isCompact ? 'items-center gap-4' : 'flex-col')}
              >
                <div
                  className={cn(
                    'relative bg-muted overflow-hidden flex-shrink-0 shadow-sm border border-border/50 rounded-lg',
                    isCompact ? 'w-12 h-16 rounded-md' : 'w-full aspect-[3/4]'
                  )}
                >
                  {book.cover_url ? (
                    <Image
                      priority={index < 6}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      src={book.cover_url}
                      alt={book.title}
                      fill
                      sizes={
                        isCompact
                          ? '48px'
                          : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                      }
                      quality={75}
                      className={cn(
                        'object-cover transition-transform duration-200 ease-out ',
                        isCompact
                          ? ''
                          : 'group-hover/card:scale-[1.01] md:group-hover/card:scale-[1.02]'
                      )}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      No cover
                    </div>
                  )}
                </div>
                <div className={cn('flex flex-col min-w-0', isCompact ? 'flex-1' : 'p-3')}>
                  <h3
                    className={cn(
                      'font-semibold leading-snug',
                      isCompact ? 'text-sm truncate' : 'text-sm line-clamp-2'
                    )}
                  >
                    {book.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground truncate">
                    {book.author || 'Unknown'}
                  </p>

                  {isCompact && book.download_count && (
                    <span className="mt-1 text-xs text-muted-foreground">
                      {book.download_count.toLocaleString()} downloads
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </HoverCardTrigger>

          <HoverCardContent
            className="hidden md:block w-72 p-4 bg-background/90 backdrop-blur-xl rounded-xl shadow-lg border border-border/50"
            side="top"
            align="center"
            sideOffset={14}
          >
            <div className="flex gap-3">
              <div className="relative w-20 h-28 shrink-0 rounded-md overflow-hidden bg-muted">
                {book.cover_url ? (
                  <Image
                    src={book.cover_url}
                    alt={book.title}
                    fill
                    sizes="80px"
                    quality={75}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                    No cover
                  </div>
                )}
              </div>

              {/* TEXT */}
              <div className="flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="text-sm font-semibold leading-tight line-clamp-2">{book.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {book.author || 'Unknown'}
                  </p>
                </div>

                {book.download_count && (
                  <p className="text-xs text-muted-foreground">
                    {book.download_count.toLocaleString()} downloads
                  </p>
                )}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </ul>
  );
}
