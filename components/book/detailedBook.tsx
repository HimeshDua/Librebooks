import {Suspense} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import BackButton from '../back-button';
import {StructuredData} from './bookmetacomponents';
import type {Book} from '@/types/book';
import UserBookActions from './book-actions';
import {notFound} from 'next/navigation';

async function DetailedBook({userId, book}: {userId: string | null; book: Book}) {
  if (!book) return notFound();
  return (
    <main>
      <Suspense>
        <StructuredData book={book} />
      </Suspense>

      <div className="max-w-6xl mx-auto px-4 sm:px-0 py-10 pt-4">
        <Breadcrumb className="mb-6 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-center">
                <BackButton />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/library">Library</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <Suspense>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{book.author || 'Unknown Author'}</BreadcrumbLink>
              </BreadcrumbItem>
            </Suspense>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-muted">
              {book.cover_url ? (
                <Image
                  src={book.cover_url || '/default-book-cover.jpg'}
                  alt={`Cover of ${book.title}`}
                  width={400}
                  height={600}
                  className="object-cover w-full aspect-[3/4]"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  No Cover Available
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-1 md:col-span-1 lg:col-span-3 flex flex-col gap-y-2 justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {book.title}
            </h1>

            <div className="flex flex-col gap-y-0 text-muted-foreground text-md mb-4">
              <p>
                by <span className="font-medium text-foreground">{book.author}</span>
              </p>
              {book.languages?.length > 0 && (
                <p>
                  Language:{' '}
                  <span className="font-medium text-foreground">[{book.languages.join(', ')}]</span>
                </p>
              )}
            </div>

            {book.summaries && (
              <section className="max-w-3xl">
                <h2 className="text-xl font-semibold mb-2">About this book</h2>
                <p className="text-base leading-relaxed tracking-normal text-muted-foreground">
                  {book.summaries?.join('\n\n')}
                </p>
              </section>
            )}

            <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <Suspense fallback={<div className="h-12" />}>
                <UserBookActions userId={userId} book={book} />
              </Suspense>
            </div>

            <section className="mt-14 border-y border-border py-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <Meta label="Downloads" value={book.download_count?.toLocaleString()} />
                <Meta label="Language" value={book.languages?.join(', ')} />
                <Meta label="Source" value={book.source} />
                <Meta label="Copyright" value={book.copyright ? 'Yes' : 'No'} />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DetailedBook;

function Meta({label, value}: {label: string; value?: string}) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className="font-semibold text-foreground">{value || '—'}</div>
    </div>
  );
}
