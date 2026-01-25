import type {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {type ReadonlyURLSearchParams} from 'next/navigation';

export const useSearchQuery = ({
  router,
  searchParams,
  searchQuery,
}: {
  searchParams: ReadonlyURLSearchParams;
  router: AppRouterInstance;
  searchQuery: string;
}) => {
  const params = new URLSearchParams(searchParams.toString());

  if (searchQuery.trim()) {
    params.set('q', searchQuery.trim());
    params.set('page', '1');
  } else {
    params.delete('q');
  }

  router.push(`/library?${params.toString()}`);
};
