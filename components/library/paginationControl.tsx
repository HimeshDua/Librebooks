import Link from 'next/link';
import {Button} from '../ui/button';

type PaginationControlsProps = {
  category: string;
  query: string;
  page: number;
  totalPages: number;
};

export function PaginationControls({category, query, page, totalPages}: PaginationControlsProps) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const makeUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    params.set('page', newPage.toString());
    return `/library?${params.toString()}`;
  };

  return (
    <>
      {/* Mobile Bottom Pagination */}
      <div className="md:hidden fixed inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm border-t border-border z-40 px-3 py-2">
        <div className="flex items-center justify-between gap-2 w-full max-w-sm mx-auto">
          <Link
            prefetch
            href={makeUrl(Math.max(1, page - 1))}
            aria-disabled={prevDisabled}
            className="flex-1 min-w-0"
          >
            <Button
              className="w-full rounded-lg text-center h-11 text-xs font-medium truncate"
              variant="outline"
              size="sm"
              disabled={prevDisabled}
            >
              ← Prev
            </Button>
          </Link>

          <div className="px-3 py-2 text-nowrap rounded-full bg-muted text-xs font-semibold text-center flex-shrink-0 w-[64px]">
            {page} / {totalPages || 1}
          </div>

          <Link
            prefetch
            href={makeUrl(Math.min(totalPages || 1, page + 1))}
            aria-disabled={nextDisabled}
            className="flex-1 min-w-0"
          >
            <Button
              className="w-full rounded-lg text-center h-11 text-xs font-medium truncate"
              variant="outline"
              size="sm"
              disabled={nextDisabled}
            >
              Next →
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop Pagination */}
      <nav
        className="hidden md:flex items-center justify-center gap-3 mt-10 w-full"
        aria-label="Pagination"
      >
        <Link prefetch href={makeUrl(Math.max(1, page - 1))} aria-disabled={prevDisabled}>
          <Button
            className="rounded-xl text-center"
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
            className="rounded-xl text-center"
            variant="outline"
            size="sm"
            disabled={nextDisabled}
          >
            Next →
          </Button>
        </Link>
      </nav>
    </>
  );
}
