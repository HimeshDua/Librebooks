import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {HugeiconsIcon} from '@hugeicons/react';
import {Search} from '@hugeicons/core-free-icons';

export function SearchFormSkeleton() {
  return (
    <form className="flex items-center gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <HugeiconsIcon
          icon={Search}
          className="size-4 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <Input
          placeholder="Search books by title or author..."
          className="pl-10 pr-10 rounded-full"
        />
      </div>

      <Button type="submit" className="rounded-full px-6">
        Search
      </Button>
    </form>
  );
}
