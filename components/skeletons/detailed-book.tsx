import {Skeleton} from '../ui/skeleton';
import {SuggestedBooksSkeleton} from './suggested-books';

export function DetailedBookSkeleton() {
  return (
    <main className="min-h-screen w-full py-10 px-4 mx-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-4 h-3" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-4 h-3" />
          <Skeleton className="w-24 h-4" />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-xl">
              <Skeleton className="w-full h-full" />
            </div>
          </div>

          <div className="sm:col-span-1 md:col-span-1 lg:col-span-3 flex flex-col justify-center">
            <Skeleton className="h-10 w-4/5 mb-4" />

            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-48" />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="rounded-xl bg-muted/40 p-4 mb-6 backdrop-blur-sm border border-border/40">
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <Skeleton className="h-12 w-32 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Array.from({length: 3}).map((_, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/40 backdrop-blur-md border border-border/40"
                >
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Skeleton className="h-5 w-32 mb-3" />
              <div className="flex flex-wrap gap-2">
                {Array.from({length: 5}).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Skeleton className="h-5 w-32 mb-3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({length: 4}).map((_, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-muted/40 backdrop-blur-md border border-border/40"
                  >
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <SuggestedBooksSkeleton BOOKS_TO_FETCH={6} />
      </div>
    </main>
  );
}
