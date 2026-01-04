'use server';
import {generateMetadataComponent} from '@/components/book/bookmetacomponents';
import {getBookFromSlug} from '@/lib/library/books/actions/getBookfromSlug';
import {publicSupabase as supabase} from '@/lib/supabase/public';
import DetailedBook from '@/components/book/detailedBook';
import BookError from '@/components/book/book-error';
import {notFound} from 'next/navigation';
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
  return <DetailedBook book={book} />;
}
