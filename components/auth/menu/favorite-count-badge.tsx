import {cn} from '@/lib/utils';

export function FavoriteCountBadge({count}: {count: number}) {
  if (count <= 0) return null;

  return (
    <div
      className={cn(
        'absolute -top-1 -right-1 size-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-background',
        count > 9 && 'px-1 size-5'
      )}
    >
      size-5
      {count > 9 ? '9+' : count}
    </div>
  );
}
