'use server';

import SuggestedBookSectionLoadingState from '@/components/book/suggested/loading-state';
import SuggestedBooksLoader from '@/components/book/suggested/suggestd-book-server';
import {generateMetadataComponent} from '@/components/book/bookmetacomponents';
import {getBookFromSlug} from '@/lib/library/books/actions/getBookfromSlug';
import {publicSupabase as supabase} from '@/lib/supabase/public';
import DetailedBook from '@/components/book/detailedBook';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import {getUserByInfo} from '@/lib/getUserByInfo';
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
  const userId = (await getUserByInfo()).user?.id ?? null;

  const {data: book, error} = await getBookFromSlug(slug);
  if (error || !book) return notFound();

  return (
    <div className="max-w-6xl min-h-[85vh] flex flex-col gap-y-8 px-4 mx-auto">
      <DetailedBook book={book} userId={userId} />
      <Suspense fallback={<SuggestedBookSectionLoadingState />}>
        <SuggestedBooksLoader currentBookId={book?.id!} languages={book.languages} />
      </Suspense>
    </div>
  );
}
