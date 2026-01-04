'use server';
import {generateMetadataComponent} from '@/components/book/bookmetacomponents';
import {getBookFromSlug} from '@/lib/library/books/actions/getBookfromSlug';
import {publicSupabase as supabase} from '@/lib/supabase/public';
import DetailedBook from '@/components/book/detailedBook';
import BookError from '@/components/book/book-error';
import {notFound} from 'next/navigation';
import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';
import {Suspense} from 'react';
import DetailedBookSkeleton from '@/components/book/detailed-book-skeleton';
export async function generateStaticParams() {
  const {data: popularBooks} = await supabase
    .from('books')
    .select('slug')
    .order('download_count', {ascending: false})
    .limit(300);

  return popularBooks?.map(book => ({slug: book.slug})) || [];
}

export const generateMetadata = generateMetadataComponent;
export default async function BookPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (!slug) return notFound();
  const {data: book, error} = await getBookFromSlug(slug);
  if (error || !book) return <BookError error={error?.message || null} slug={slug} />;
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <Suspense fallback={<DetailedBookSkeleton />}>
        <DetailedBook book={book} />
      </Suspense>
      <Footer />
    </div>
  );
}
