'use server';
import BookReader from '@/components/read/reader-block';
export default async function ReadPage({params}: {params: Promise<{id: string}>}) {
  const slug = (await params).id;

  return <BookReader slug={slug} />;
}
