import Link from 'next/link';
import {Button} from '../ui/button';

export function PaginationControls({
  query,
  page,
  totalPages,
}: {
  query: string;
  page: number;
  totalPages: number;
}) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const makeUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('page', newPage.toString());
    return `/library?${params.toString()}`;
  };

  return (
    <>
      {/* Mobile Bottom Pagination - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-40 p-4 safe-area-bottom">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          <Link
            prefetch
            href={makeUrl(Math.max(1, page - 1))}
            className="flex-1"
            aria-disabled={prevDisabled}
          >
            <Button
              className="w-full rounded-xl text-center h-12 text-sm font-medium"
              variant="outline"
              disabled={prevDisabled}
              size="lg"
            >
              ← Previous
            </Button>
          </Link>

          <div className="px-4 py-2 rounded-full bg-muted text-xs font-semibold min-w-[70px] text-center shrink-0">
            {page} / {totalPages || 1}
          </div>

          <Link
            prefetch
            href={makeUrl(Math.min(totalPages || 1, page + 1))}
            className="flex-1"
            aria-disabled={nextDisabled}
          >
            <Button
              className="w-full rounded-xl text-center h-12 text-sm font-medium"
              variant="outline"
              disabled={nextDisabled}
              size="lg"
            >
              Next →
            </Button>
          </Link>
        </div>
      </div>

      <nav
        className="hidden md:flex items-center justify-center gap-3 mt-10 w-full"
        aria-label="Pagination"
      >
        <Link prefetch href={makeUrl(Math.max(1, page - 1))} aria-disabled={prevDisabled}>
          <Button
            className="rounded-2xl text-center"
            variant="outline"
            size="sm"
            disabled={prevDisabled}
          >
            ← Previous
          </Button>
        </Link>

        <div className="px-3 py-2 rounded-full bg-muted text-sm font-semibold min-w-[80px] text-center">
          Page {page} / {totalPages || 1}
        </div>

        <Link
          prefetch
          href={makeUrl(Math.min(totalPages || 1, page + 1))}
          aria-disabled={nextDisabled}
        >
          <Button
            className="rounded-2xl text-center"
            variant="outline"
            size="sm"
            disabled={nextDisabled}
          >
            Next →
          </Button>
        </Link>
      </nav>

      {/* Spacer for mobile to prevent content from being hidden behind fixed pagination */}
      <div className="md:hidden h-20" />
    </>
  );
}
