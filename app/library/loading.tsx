import {Separator} from '@/components/ui/separator';
import BookDisplaySkeleton from '@/components/library/bookDisplaySkeleton';
import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';

export default async function LibraryLoading() {
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <main className="min-h-screen py-10 px-4 mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <header className="text-center mb-8 animate-pulse">
            <div className="h-10 w-64 mx-auto rounded bg-muted" />
            <div className="mt-4 h-4 w-96 max-w-full mx-auto rounded bg-muted/70" />
          </header>

          <section className="mb-8 animate-pulse">
            <div className="h-12 w-full rounded-lg bg-muted" />
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-5 w-40 rounded bg-muted" />
              <div className="h-5 w-20 rounded-full bg-muted/70" />
            </div>

            <div className="flex gap-3">
              <div className="h-9 w-24 rounded bg-muted" />
              <div className="h-9 w-40 rounded bg-muted" />
            </div>
          </div>

          <Separator />

          <BookDisplaySkeleton />

          <div className="mt-10 flex justify-center gap-2 animate-pulse">
            <div className="h-9 w-20 rounded bg-muted" />
            <div className="h-9 w-9 rounded bg-muted" />
            <div className="h-9 w-9 rounded bg-muted" />
            <div className="h-9 w-20 rounded bg-muted" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
