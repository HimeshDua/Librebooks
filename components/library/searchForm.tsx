'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {Search, X} from 'lucide-react';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {useState, useEffect} from 'react';

export function SearchForm({initialQuery = ''}: {initialQuery?: string}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set('q', value.trim());
      params.set('page', '1');
    } else {
      params.delete('q');
    }

    router.push(`/library?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <Button type="submit" className="rounded-full px-6">
        Search
      </Button>
    </form>
  );
}
