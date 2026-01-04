export default function FooterLoading() {
  return (
    <footer className="border-t border-border/40 py-10 text-center">
      <div className="max-w-5xl mx-auto px-6 space-y-6 sm:space-y-4">
        <div className="h-4 bg-muted rounded animate-pulse w-64 mx-auto" />

        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3 mx-auto" />
        </div>

        <div className="h-3 bg-muted/80 rounded animate-pulse w-80 mx-auto" />

        <div className="h-px bg-muted/30 animate-pulse mt-6" />
      </div>
    </footer>
  );
}
