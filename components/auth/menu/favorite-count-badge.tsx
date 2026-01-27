export function FavoriteCountBadge({count}: {count: number}) {
  if (count <= 0) return null;

  return (
    <div className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-background">
      {count > 9 ? '9+' : count}
    </div>
  );
}
