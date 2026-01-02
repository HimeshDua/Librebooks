import {getBookFromSlug} from '@/lib/library/books/getBookfromSlug';
import {bookDescriptionMetaData} from '@/lib/library/books/utils';
import type {Book} from '@/types';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';

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

export function StructuredData({book}: {book: Book}) {
  if (!book) return notFound();
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
    />
  );
}

type generateMetadataProps = {params: Promise<{slug: string}>};
export async function generateMetadataComponent({
  params,
}: generateMetadataProps): Promise<Metadata> {
  const {slug} = await params;
  if (!slug) return notFound();
  const {data: book, error} = await getBookFromSlug(slug);
  if (!book || error) {
    return {
      title: 'Book Not Found | LibreBooks',
      description: 'The requested book could not be found.',
    };
  }

  const metaTitle = `${book.title} by ${book.author || 'Unknown Author'} | LibreBooks`;
  const metaDescription = bookDescriptionMetaData({
    title: book.title,
    author: book.author,
    description: book.description,
  });
  const metaImage = book.cover_url || '/default-book-cover.jpg';
  const canonicalUrl = `https://librebooks.vercel.app/book/${slug}`;
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
      creator: '@HimeshDua',
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
