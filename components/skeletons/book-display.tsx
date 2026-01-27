export function BookDisplaySkeleton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {Array.from({length: 12}).map((_, i) => (
        <li
          key={i}
          className="group relative overflow-hidden rounded-lg bg-background border border-border animate-pulse"
        >
          <div className="relative w-full aspect-3/4 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-muted via-muted/80 to-muted/60" />
          </div>

          <div className="p-3 space-y-3">
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted/70" />
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="h-3 w-16 rounded-full bg-muted/50" />
              <div className="h-5 w-14 rounded-full bg-muted/60" />
            </div>
          </div>

          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </li>
      ))}
    </ul>
  );
}
