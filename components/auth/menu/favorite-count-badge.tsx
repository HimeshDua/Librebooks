export function FavoriteCountBadge({count}: {count: number}) {
  if (count <= 0) return null;

  return (
    <div className="absolute -top-0.5 -right-0.5 size-3.5  bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-background" />
  );
}
