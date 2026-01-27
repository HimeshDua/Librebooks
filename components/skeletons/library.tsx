import SelectBookCategory from '../book/bookCategory';
import LibHeader from '../library/header';
import {PaginationControls} from '../library/pagination-control';
import {SearchForm} from '../library/searchForm';
import {ViewModeToggle} from '../library/viewMode';
import {Separator} from '../ui/separator';
import {BookDisplaySkeleton} from './book-display';

export function LibrarySkeleton() {
  return (
    <main className="min-h-screen w-full py-6 sm:py-4 px-4 mx-auto">
      <div className="max-w-7xl mx-auto p-0">
        <LibHeader />

        <section className="mb-8">
          <SearchForm />
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg text-nowrap font-semibold">Popular Books</h2>

            <span className="px-2 py-1 text-nowrap bg-muted rounded-full text-xs font-medium">
              12342 books
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ViewModeToggle className="order-2 sm:order-1" />
            <SelectBookCategory className="w-full sm:w-auto min-w-40" />
          </div>
        </div>

        <Separator className="my-5" />

        <BookDisplaySkeleton />

        <div className="mt-8">
          <PaginationControls page={1} query={''} category={''} totalPages={1042} />
        </div>
      </div>
    </main>
  );
}

export default LibrarySkeleton;
