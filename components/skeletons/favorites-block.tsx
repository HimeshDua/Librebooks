export default function FavoritesBlockSkeleton() {
  return (
    <main className="min-h-screen w-full py-10 px-4 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
            <div className="w-48 h-8 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({length: 8}).map((_, index) => (
            <div key={index} className="rounded-2xl overflow-hidden border">
              <div className="relative aspect-3/4 bg-muted animate-pulse" />

              <div className="p-3">
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted/80 rounded animate-pulse w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
