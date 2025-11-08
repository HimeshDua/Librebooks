import {Button} from './ui/button';

export function AuthButtonsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        className="hidden sm:flex animate-pulse bg-[length:200%_100%] px-11"
      />

      <Button
        asChild
        className="rounded-full font-semibold animate-pulse bg-[length:200%_100%] px-11"
      />
    </div>
  );
}
