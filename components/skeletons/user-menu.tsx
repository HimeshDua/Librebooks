import {cn} from '@/lib/utils';
import {buttonVariants} from '../ui/button';
import {Skeleton} from '../ui/skeleton';

export function UserMenuSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className={(cn(buttonVariants({variant: 'ghost'})), 'hidden sm:block h-7 w-20')} />

      <Skeleton
        className={
          (cn(buttonVariants({variant: 'default'})), 'hidden sm:block h-7 w-24 rounded-full')
        }
      />
    </div>
  );
}
