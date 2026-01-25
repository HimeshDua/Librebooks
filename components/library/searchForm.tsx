'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {useState, useEffect} from 'react';
import {HugeiconsIcon} from '@hugeicons/react';
import {Search, X} from '@hugeicons/core-free-icons';
import {useSearchQuery} from '@/hooks/search-query';

export function SearchForm({initialQuery = ''}: {initialQuery?: string}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useSearchQuery({router, searchParams, searchQuery: value});
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <HugeiconsIcon
          icon={Search}
          className="size-4 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <Input
          placeholder="Search books by title or author..."
          className="pl-10 pr-10 rounded-full"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <HugeiconsIcon icon={X} className="size-4 w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <Button type="submit" className="rounded-full px-6">
        Search
      </Button>
    </form>
  );
}
