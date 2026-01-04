export default function HeaderLoading() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-5 h-5 bg-muted rounded animate-pulse" />
            <div className="w-24 h-5 bg-muted rounded animate-pulse" />
          </div>

          <div className="sm:hidden">
            <div className="w-6 h-6 bg-muted rounded animate-pulse" />
          </div>

          <div className="hidden sm:flex items-center gap-6">
            {Array.from({length: 4}).map((_, index) => (
              <div key={index} className="w-12 h-4 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-muted rounded-full animate-pulse" />

          <div className="sm:hidden w-9 h-9 bg-muted rounded-full animate-pulse" />

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-16 h-9 bg-muted rounded animate-pulse" />
            <div className="w-20 h-9 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
}
