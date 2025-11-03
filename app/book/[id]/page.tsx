

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Suspense } from 'react';
import ToggleFavoriteBook, { ToggleFavoriteBookSkeleton } from '@/components/favoritism/toggleFavoriteBook';
import AuthDialog from '@/components/auth-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import type { Book } from '@/types';
import { createClient } from '@/lib/supabase/server';
import { getUserById } from '@/lib/getUserId';
import { getBookfromId } from '@/lib/getBookfromId';

export default async function DetailedBook({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await getBookfromId(supabase, id);
  const { userId } = await getUserById(supabase);

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background text-foreground">
        <h2 className="text-xl font-bold mb-2 text-destructive">Book not found</h2>
        <p className="text-sm text-muted-foreground">
          {error ? error.message : `No book found related to ID: ${id}`}
        </p>
        <Button asChild className="mt-6">
          <Link href="/">← Back to Library</Link>
        </Button>
      </div>
    );
  }

  const book: Book = data;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 🧭 Breadcrumb */}
        <Breadcrumb className="mb-6 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{book.author || 'Unknown Author'}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 📖 Book Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* LEFT: Book Cover */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-muted">
              {book.cover_url ? (
                <Image
                  src={book.cover_url}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  No Cover Available
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-3 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-base text-muted-foreground mb-3">
              by{' '}
              <span className="font-semibold text-foreground">
                {book.author || 'Unknown Author'}
              </span>
            </p>

            {book.languages?.length > 0 && (
              <p className="text-sm mb-6 text-muted-foreground">
                Language:{' '}
                <span className="font-medium text-foreground">
                  {book.languages.join(', ')}
                </span>
              </p>
            )}

            {book.description && (
              <div className="rounded-xl bg-muted/40 p-4 mb-6 backdrop-blur-sm border border-border/40">
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-8 md:line-clamp-none">
                  {book.description}
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center gap-3">
              {book.download_links?.pdf && (
                <Button className='w-full py-4 md:w-auto' asChild>
                  <Link href={`/read/${book.id}`} target="_blank">
                    <BookOpen className="w-4 h-4 mr-2" /> Read Online
                  </Link>
                </Button>
              )}

              {book.download_links?.epub ? (
                userId ? (
                  <Button className='w-full py-4 md:w-auto' asChild variant="outline">
                    <Link href={book.download_links.epub} target="_blank">
                      📚 Download ePub
                    </Link>
                  </Button>
                ) : (
                  <AuthDialog
                    description="download books"
                    dialogTrigger={<Button variant="outline">📚 Download ePub</Button>}
                  />
                )
              ) : null}

              <Suspense fallback={<ToggleFavoriteBookSkeleton />}>
                <ToggleFavoriteBook id={userId} bookId={id} bookTitle={book.title} />
              </Suspense>
            </div>

            {/* 📊 Meta Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <div className="p-3 rounded-lg bg-muted/40 backdrop-blur-md border border-border/40">
                <strong className="block text-foreground mb-1">Downloads</strong>
                {book.download_count ? book.download_count.toLocaleString() : 'N/A'}
              </div>
              <div className="p-3 rounded-lg bg-muted/40 backdrop-blur-md border border-border/40">
                <strong className="block text-foreground mb-1">Source</strong>
                {book.source || 'Unknown'}
              </div>
              <div className="p-3 rounded-lg bg-muted/40 backdrop-blur-md border border-border/40">
                <strong className="block text-foreground mb-1">Copyright</strong>
                {book.copyright ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
