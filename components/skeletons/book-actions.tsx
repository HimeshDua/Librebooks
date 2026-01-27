export function UserBookActionsSkeleton() {
  return (
    <div className="mt-4 flex flex-wrap gap-3 max-w-238 w-full animate-pulse">
      <div className="flex-1 md:w-auto h-12 rounded-md bg-linear-to-r from-muted via-muted/80 to-muted relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="flex-1 md:w-auto h-12 rounded-md bg-linear-to-r from-muted/80 via-muted/60 to-muted/80 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="h-12 w-12 rounded-md bg-linear-to-r from-muted via-muted/80 to-muted relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
