import DetailedBookSkeleton from '@/components/book/detailed-book-skeleton';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';

function BookPageSkeleton() {
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <DetailedBookSkeleton />
      <Footer />
    </div>
  );
}

export default BookPageSkeleton;
