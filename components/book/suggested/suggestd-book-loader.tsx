import {getSuggestedBooks} from '@/lib/library/books/actions/getSuggestedBook';
import SuggestedBookSection from './suggested-book-section';

type SuggestedBooksLoaderProps = {
  currentBookId: number;
  languages: string[];
};

export default async function SuggestedBooksLoader({
  currentBookId,
  languages,
}: SuggestedBooksLoaderProps) {
  const {data, error} = await getSuggestedBooks({
    currentBookId,
    languages,
  });

  if (error || !data || data.length === 0) return null;

  return <SuggestedBookSection books={data} />;
}
