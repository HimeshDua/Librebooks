import Link from "next/link";
import { Button } from "../ui/button";

export function PaginationControls({ query, page, totalPages }: { query: string; page: number; totalPages: number }) {
    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPages;

    const makeUrl = (newPage: number) => {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        params.set("page", newPage.toString());
        return `/library?${params.toString()}`;
    };

    return (
        <nav className="flex items-center justify-center gap-3 mt-10 w-full" aria-label="Pagination">
            <Link href={makeUrl(Math.max(1, page - 1))} aria-disabled={prevDisabled}>
                <Button className="rounded-2xl text-center" variant="outline" size="sm" disabled={prevDisabled}>
                    ← Prev
                </Button>
            </Link>

            <div className="px-3 py-2 rounded-full bg-muted text-sm font-semibold min-w-[80px] text-center">
                Page {page} / {totalPages || 1}
            </div>

            <Link href={makeUrl(Math.min(totalPages || 1, page + 1))} className='' aria-disabled={nextDisabled}>
                <Button className="rounded-2xl text-center" variant="outline" size="sm" disabled={nextDisabled}>
                    Next →
                </Button>
            </Link>
        </nav>
    );
}
