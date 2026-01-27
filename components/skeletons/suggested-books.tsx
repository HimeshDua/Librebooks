export function SuggestedBooksSkeleton({
  gridCols = 'grid-cols-2',
  BOOKS_TO_FETCH = 6,
}: {
  gridCols?: string;
  BOOKS_TO_FETCH: number;
}) {
  return (
    <section className="flex flex-col gap-y-6">
      <h2 className="text-3xl font-medium md:text-3xl tracking-tighter">You might also like</h2>
      <div className={`grid ${gridCols} gap-4 md:gap-5 lg:gap-6`}>
        {Array.from({length: BOOKS_TO_FETCH}).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden border">
              <div className="absolute inset-0 bg-linear-to-br from-muted via-muted/80 to-muted" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded bg-muted/70" />
              <div className="h-3 w-3/4 rounded bg-muted/70" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
