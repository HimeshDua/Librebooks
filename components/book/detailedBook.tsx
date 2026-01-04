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
import type {Book} from '@/types';
import UserBookActions from './book-actions';
import {notFound} from 'next/navigation';
import Header from '../nav/header';
import Footer from '../nav/footer';

async function DetailedBook({book}: {book: Book}) {
  if (!book) return notFound();
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <main className="min-h-screen py-10 px-4 mx-auto">
        <Suspense>
          <StructuredData book={book} />
        </Suspense>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                  <span className="font-medium text-foreground">{book.languages.join(', ')}</span>
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
                <Suspense fallback={<div className="h-12" />}>
                  <UserBookActions book={book} />
                </Suspense>
              </div>

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
      <Footer />
    </div>
  );
}

export default DetailedBook;
