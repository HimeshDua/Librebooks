'use client';

import React, {useState, useRef, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {HugeiconsIcon} from '@hugeicons/react';
import {Search, X} from '@hugeicons/core-free-icons';
import {useRouter, useSearchParams} from 'next/navigation';
import {useSearchQuery} from '@/hooks/search-query';

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useSearchQuery({router, searchParams, searchQuery});
  };

  // Handle click outside to collapse (optional)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isExpanded &&
        !searchQuery.trim()
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, searchQuery]);

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={cn(
            'relative flex items-center transition-all duration-300 ease-in-out',
            isExpanded ? 'w-auto md:w-64' : 'w-10'
          )}
        >
          {/* Search Icon Button (always visible) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              'absolute left-0 h-9 w-9 transition-all duration-300',
              isExpanded && 'z-10'
            )}
            onClick={handleToggle}
          >
            <HugeiconsIcon icon={Search} className="size-4" />
            <span className="sr-only">Toggle search</span>
          </Button>

          {/* Input Field */}
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={cn(
              'h-9 pl-10 pr-10 transition-all duration-300',
              isExpanded ? 'opacity-100 w-full' : 'opacity-0 w-0 pointer-events-none'
            )}
            aria-expanded={isExpanded}
            aria-label="Search input"
          />

          {/* Clear Button (only shown when expanded and has text) */}
          {isExpanded && searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 h-9 w-9"
              onClick={handleClear}
            >
              <HugeiconsIcon icon={X} className="size-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        {/* Optional: Submit button that appears when expanded */}
        {isExpanded && (
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="ml-2 h-9 px-3 text-sm"
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
