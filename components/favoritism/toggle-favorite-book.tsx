'use client';

import {useState} from 'react';
import {Button} from '../ui/button';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';
import {useFavorite} from '@/store';
import {toggleFavoriteBook} from '@/lib/library/books/actions/toggleFavoriteBook';
import {HugeiconsIcon} from '@hugeicons/react';
import {Heart, HeartOff} from '@hugeicons/core-free-icons';

type Props = {
  userId: string | null;
  bookId: number;
  bookTitle: string;
  title?: string;
  disabled?: boolean;
  minimal?: boolean;
  iconSize?: 'default' | 'sm' | 'icon';
  variant?: 'link' | 'destructive' | 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
  containerClassName?: string;
};

function ToggleFavoriteBook({
  userId,
  bookId,
  bookTitle,
  disabled = false,
  title,
  minimal,
  iconSize = 'default',
  variant = 'destructive',
  className,
  containerClassName,
}: Props) {
  const {favorites, toggle} = useFavorite();
  const [isToggling, setIsToggling] = useState(false);

  const [action, setAction] = useState<'add' | 'remove' | null>(null);

  const isFavorite = favorites.has(bookId);

  const handleToggleFavorite = async () => {
    if (disabled || isToggling) return;

    const wasFavorite = isFavorite;

    setAction(wasFavorite ? 'remove' : 'add');
    setIsToggling(true);

    try {
      toggle(bookId);

      if (userId) {
        const {error, message} = await toggleFavoriteBook({
          isFavorite: wasFavorite,
          book_id: bookId,
          bookTitle,
          user_id: userId,
        });

        if (error) {
          toggle(bookId);
          throw error;
        }

        toast.success(message, {
          description: `"${bookTitle}"`,
        });
      } else {
        toast.info('Login to save favorites across devices', {
          description: 'Your current favorites are stored locally',
          action: {
            label: 'Log in',
            onClick: () => {
              window.location.href = '/auth/login';
            },
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update favorites');
    } finally {
      setAction(null);
      setIsToggling(false);
    }
  };

  if (minimal) {
    return (
      <Button
        title={title || (action == 'remove' ? 'Remove from favorites' : 'Add to favorites')}
        disabled={disabled || isToggling}
        className={cn(
          'transition-all duration-200',
          'absolute top-2 right-2 z-30',
          (disabled || isToggling) && 'opacity-70 cursor-not-allowed',
          containerClassName,
          className
        )}
        variant={variant}
        size="icon"
        onClick={handleToggleFavorite}
        aria-label={action == 'remove' ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isToggling ? (
          <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isFavorite ? (
          <HugeiconsIcon icon={Heart} className="size-4 fill-red-500" />
        ) : (
          <HugeiconsIcon icon={Heart} className="size-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      title={title || (action == 'remove' ? 'Remove from favorites' : 'Add to favorites')}
      disabled={disabled || isToggling}
      className={cn(
        'flex-1 md:w-auto py-4 flex items-center justify-center gap-2 transition-all duration-200',
        (disabled || isToggling) && 'opacity-70 cursor-not-allowed',
        isToggling && 'relative overflow-hidden',
        className
      )}
      variant={variant}
      size={iconSize}
      onClick={handleToggleFavorite}
    >
      {isToggling ? (
        <>
          <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="hidden md:inline">
            {action == 'remove' ? 'Removing...' : 'Adding...'}
          </span>
        </>
      ) : (
        <>
          {isFavorite ? (
            <>
              <HugeiconsIcon icon={HeartOff} className="size-4" />
              <span className="hidden md:inline">Remove from Favorites</span>
            </>
          ) : (
            <>
              <HugeiconsIcon icon={Heart} className="size-4" />
              <span className="hidden md:inline">Add to Favorites</span>
            </>
          )}
        </>
      )}
    </Button>
  );
}

export default ToggleFavoriteBook;
