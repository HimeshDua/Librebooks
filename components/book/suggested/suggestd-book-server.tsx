import SuggestedBookSection from './suggested-book-section';

type SuggestedBooksLoaderProps = {
  currentBookId: number;
  languages: string[];
};

export default async function SuggestedBooksLoader({
  currentBookId,
  languages,
}: SuggestedBooksLoaderProps) {
  return <SuggestedBookSection currentBookId={currentBookId} languages={languages} />;
}
