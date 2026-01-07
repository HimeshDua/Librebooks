'use client';

import {cn} from '@/lib/utils';
import {useViewMode} from '@/store';
import {Grid3X3, List} from 'lucide-react';
import {Button} from '../ui/button';

export function ViewModeToggle({className}: {className?: string}) {
  const mode = useViewMode(m => m.mode);
  const setViewMode = useViewMode(m => m.setMode);

  return (
    <div
      className={cn(
        className,
        'flex items-center border border-border rounded-lg p-1 bg-background'
      )}
    >
      <Button
        onClick={() => setViewMode('GRID')}
        variant={mode === 'GRID' ? 'default' : 'outline'}
        size="icon"
        className={cn('p-2 rounded-md transition-colors', 'rounded-r-none duration-150')}
        title="Grid view"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => setViewMode('COMPACT')}
        variant={mode === 'GRID' ? 'outline' : 'default'}
        size="icon"
        className={cn('p-2 rounded-md transition-colors', 'rounded-l-none duration-150')}
        title="Compact view"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  );
}
