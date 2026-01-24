import {Button} from '../ui/button';

export function AuthButtonsSkeleton() {
  return (
    <div className="flex items-center gap-2" suppressHydrationWarning>
      <Button variant="ghost" className="hidden sm:flex animate-pulse bg-size-[200%_100%] px-11" />

      <Button className="rounded-full font-semibold animate-pulse bg-size-[200%_100%] px-11" />
    </div>
  );
}
