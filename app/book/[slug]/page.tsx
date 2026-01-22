'use server';

import SuggestedBookSectionLoadingState from '@/components/book/suggested/loading-state';
import SuggestedBooksLoader from '@/components/book/suggested/suggestd-book-loader';
import {generateMetadataComponent} from '@/components/book/bookmetacomponents';
import {getBookFromSlug} from '@/lib/library/books/actions/getBookfromSlug';
import {publicSupabase as supabase} from '@/lib/supabase/public';
import DetailedBook from '@/components/book/detailedBook';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
export async function generateStaticParams() {
  const {data: popularBooks} = await supabase
    .from('book')
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
  if (error || !book) return notFound();

  return (
    <div className="max-w-6xl flex flex-col gap-y-8 px-4 mx-auto">
      <DetailedBook book={book} />
      <Suspense fallback={<SuggestedBookSectionLoadingState />}>
        <SuggestedBooksLoader currentBookId={book?.id!} languages={book.languages} />
      </Suspense>
    </div>
  );
}
