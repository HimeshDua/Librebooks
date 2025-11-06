'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Search} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Book} from '@/types';

interface BookDisplayProps {
  books: Book[];
  query: string;
  urlViewMode?: string;
}

export function BookDisplay({books, query, urlViewMode}: BookDisplayProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  useEffect(() => {
    const savedViewMode = getCookie('viewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'compact') {
      setViewMode(savedViewMode);
    } else if (urlViewMode === 'grid' || urlViewMode === 'compact') {
      setViewMode(urlViewMode);
    }
  }, [urlViewMode]);

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  if (!books || books.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-md mx-auto">
          <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-sm text-muted-foreground">
            {query
              ? `No results for "${query}". Try different keywords or browse all books.`
              : 'No books available at the moment. Please check back later.'}
          </p>
          {query && (
            <Button asChild variant="outline" className="mt-4">
              <Link href="/library">Browse All Books</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return viewMode === 'compact' ? (
    // Compact View
    <div className="space-y-2">
      {books.map((book: Book) => (
        <HoverCard key={book.slug} openDelay={150} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="group/card relative transition-all duration-200 hover:bg-muted/50 rounded-lg border border-transparent hover:border-border">
              <Link
                href={`/book/${book.slug}`}
                aria-label={`Open ${book.title}`}
                className="flex items-center gap-4 p-3"
              >
                <div className="relative w-12 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  {book.cover_url ? (
                    <Image
                      loading="eager"
                      src={book.cover_url}
                      alt={book.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                      No cover
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">{book.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {book.author || 'Unknown'}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                  {book.download_count && (
                    <span>{book.download_count.toLocaleString()} downloads</span>
                  )}
                </div>
              </Link>
            </div>
          </HoverCardTrigger>

          <HoverCardContent
            className="hidden md:block w-72 p-4 bg-background/90 backdrop-blur-xl rounded-xl shadow-lg border border-border/50"
            align="center"
            side="top"
            sideOffset={16}
          >
            <div className="flex gap-3">
              <div className="relative w-full max-w-20 h-24 rounded-md overflow-hidden">
                {book.cover_url ? (
                  <Image
                    src={book.cover_url}
                    alt={book.title}
                    fill
                    className="object-cover w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    No cover
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="text-sm font-semibold leading-tight">{book.title}</h4>
                <p className="text-xs text-muted-foreground">{book.author || 'Unknown'}</p>
                <p className="text-xs mt-2 text-muted-foreground">
                  {book.download_count ? `${book.download_count.toLocaleString()} downloads` : ''}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ) : (
    // Grid View
    <ul className="group/card-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 transition-all duration-300">
      {books.map((book: Book) => (
        <HoverCard key={book.slug} openDelay={150} closeDelay={100}>
          <HoverCardTrigger asChild>
            <li className="group/card relative transition-all duration-500 md:hover:scale-[1.03] md:hover:z-10 md:group-hover/card-grid:blur-[1.2px] md:group-hover/card-grid:opacity-80 md:hover:!opacity-100 md:hover:!blur-none">
              <Link href={`/book/${book.slug}`} aria-label={`Open ${book.title}`} className="block">
                <div className="relative w-full aspect-[3/4] bg-muted rounded-lg overflow-hidden shadow-sm border border-border/50">
                  {book.cover_url ? (
                    <Image
                      loading="eager"
                      src={book.cover_url}
                      alt={book.title}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-200 ease-out group-hover/card:scale-[1.01] md:group-hover/card:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      No cover
                    </div>
                  )}
                </div>

                <div className="p-3 transition-all duration-300">
                  <h3 className="text-sm font-semibold leading-snug line-clamp-2">{book.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{book.author || 'Unknown'}</p>
                </div>
              </Link>
            </li>
          </HoverCardTrigger>

          <HoverCardContent
            className="hidden md:block w-72 p-4 bg-background/90 backdrop-blur-xl rounded-xl shadow-lg border border-border/50"
            align="center"
            side="top"
            sideOffset={16}
          >
            <div className="flex gap-3">
              <div className="relative w-full max-w-20 h-24 rounded-md overflow-hidden">
                {book.cover_url ? (
                  <Image
                    src={book.cover_url}
                    alt={book.title}
                    fill
                    className="object-cover w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    No cover
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="text-sm font-semibold leading-tight">{book.title}</h4>
                <p className="text-xs text-muted-foreground">{book.author || 'Unknown'}</p>
                <p className="text-xs mt-2 text-muted-foreground">
                  {book.download_count ? `${book.download_count.toLocaleString()} downloads` : ''}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </ul>
  );
}
