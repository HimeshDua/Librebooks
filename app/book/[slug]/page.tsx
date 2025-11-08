import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {BookOpen} from 'lucide-react';
import {Suspense} from 'react';
import ToggleFavoriteBook, {
  ToggleFavoriteBookSkeleton,
} from '@/components/favoritism/toggleFavoriteBook';
import AuthDialog from '@/components/auth-dialog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type {Book} from '@/types';
import {publicSupabase} from '@/lib/supabase/public';
import {getUserById} from '@/lib/getUserId';
import {getBookfromSlug} from '@/lib/getBookfromSlug';
import type {Metadata} from 'next';
import BackButton from '@/components/back-button';
export async function generateStaticParams() {
  const supabase = publicSupabase;

  const {data: popularBooks} = await supabase
    .from('books')
    .select('slug')
    .order('download_count', {ascending: false})
    .limit(100);

  return (
    popularBooks?.map(book => ({
      slug: book.slug,
    })) || []
  );
}

export const revalidate = 43200;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const supabase = publicSupabase;
  const {slug} = await params;
  const {data: book} = await getBookfromSlug(supabase, slug);

  if (!book) {
    return {
      title: 'Book Not Found | LibreBooks',
      description: 'The requested book could not be found.',
    };
  }

  const metaTitle = `${book.title} by ${book.author || 'Unknown Author'} | LibreBooks`;
  const metaDescription = book.description
    ? `${book.description.substring(0, 160)}...`
    : `Read "${book.title}" by ${
        book.author || 'Unknown Author'
      } online for free. Download EPUB format.`;
  const metaImage = book.cover_url || '/default-book-cover.jpg';
  const canonicalUrl = `https://yourdomain.com/books/${slug}`;
  const authorName = book.author || 'Unknown Author';
  const bookLanguage = book.languages?.[0] || 'English';

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [`${book.title}`, authorName, 'free ebook', 'epub', 'online reader', bookLanguage],
    authors: [{name: authorName}],
    openGraph: {
      type: 'book',
      url: canonicalUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: 'LibreBooks',
      images: [
        {
          url: metaImage,
          width: 800,
          height: 600,
          alt: `Cover of ${book.title}`,
        },
      ],
      // books: {
      //   authors: [{name: authorName}],
      //   isbn: book.gutenberg_id?.toString(),
      // },
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@librebooks', // Replace with your actual Twitter handle
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'book:title': book.title,
      'book:author': authorName,
      'book:language': bookLanguage,
      'book:format': 'EPUB',
    },
  };
}

interface BookStructuredData {
  '@context': string;
  '@type': 'Book';
  name: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  bookFormat: string;
  datePublished?: string;
  description: string;
  inLanguage: string;
  isAccessibleForFree: boolean;
  image: string;
  publisher: {
    '@type': 'Organization';
    name: string;
  };
  workExample: {
    '@type': 'Book';
    isbn?: string;
    bookFormat: string;
    potentialAction: {
      '@type': 'ReadAction';
      target: {
        '@type': 'EntryPoint';
        urlTemplate: string;
      };
    };
  };
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    seller: {
      '@type': 'Organization';
      name: string;
    };
  };
}

interface StructuredDataProps {
  data: BookStructuredData;
}

function StructuredData({data}: StructuredDataProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
  );
}
export default async function DetailedBook({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const supabase = publicSupabase;

  // console.log('slug ', slug);
  const {data, error} = await getBookfromSlug(supabase, slug);
  const {userId} = await getUserById();

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background text-foreground">
        <h2 className="text-xl font-bold mb-2 text-destructive">Book not found</h2>
        <p className="text-sm text-muted-foreground">
          {error ? error.message : `No book found related to ID: ${slug}`}
        </p>
        <Button asChild className="mt-6">
          <Link prefetch={true} href="/">
            ← Back to Library
          </Link>
        </Button>
      </div>
    );
  }

  const book: Book = data;

  const structuredData: BookStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author || 'Unknown Author',
    },
    bookFormat: 'https://schema.org/EBook',
    description:
      book.description ||
      `Read "${book.title}" by ${book.author || 'Unknown Author'} online for free.`,
    inLanguage: book.languages?.[0] || 'English',
    isAccessibleForFree: true,
    image: book.cover_url || '/default-book-cover.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'Project Gutenberg',
    },
    workExample: {
      '@type': 'Book',
      isbn: book.gutenberg_id?.toString(),
      bookFormat: 'https://schema.org/EBook',
      potentialAction: {
        '@type': 'ReadAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://yourdomain.com/read/${book.gutenberg_id}`,
        },
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'LibreBooks',
      },
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData data={structuredData} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 🧭 Breadcrumb */}
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
              {book?.epub && (
                <Button className="w-full py-4 md:w-auto" asChild>
                  <Link href={`/read/${book.gutenberg_id}`}>
                    <BookOpen className="w-4 h-4 mr-2" /> Read Online
                  </Link>
                </Button>
              )}

              {book?.epub ? (
                userId ? (
                  <Button className="w-full py-4 md:w-auto" asChild variant="outline">
                    <Link href={book.epub} target="_blank">
                      📚 Download ePub
                    </Link>
                  </Button>
                ) : (
                  <AuthDialog
                    description="download books"
                    triggerClassName="w-full py-4 md:w-auto border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                    dialogTrigger={<>📚 Download ePub</>}
                  />
                )
              ) : null}

              <Suspense fallback={<ToggleFavoriteBookSkeleton />}>
                <ToggleFavoriteBook id={userId} bookId={book.id} bookTitle={book.title} />
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
