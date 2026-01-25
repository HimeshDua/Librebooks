'use client';

import {useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';
import {useFavorite} from '@/store';
import {toggleFavoriteBook} from '@/lib/library/books/actions/toggleFavoriteBook';
import {getUserFavorites} from '@/lib/library/books/favorites/actions/getFavBookIds';
import {HugeiconsIcon} from '@hugeicons/react';
import {Heart, HeartOff} from '@hugeicons/core-free-icons';

type Props = {
  userId: string | null;
  bookId: number;
  bookTitle: string;
  title?: string;
  minimal?: boolean;
  variant?: 'link' | 'destructive' | 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
};

function ToggleFavoriteBook({
  userId,
  bookId,
  bookTitle,
  title,
  minimal,
  variant,
  className,
}: Props) {
  const {favorites, toggle, setAll} = useFavorite();

  const [loading, setLoading] = useState(true);
  const isFavorite = favorites.has(bookId);
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    getUserFavorites(userId)
      .then(setAll)
      .catch(() => toast.error('Failed to load favorites'))
      .then(() => setLoading(false));
  }, [userId, setAll]);

  const handleToggleFavorite = async () => {
    if (!userId) {
      setLoading(false);
    }

    try {
      if (userId) {
        const {error, message} = await toggleFavoriteBook({
          isFavorite,
          book_id: bookId,
          bookTitle,
          user_id: userId,
        });

        if (error) throw error;
        toast.success(message);
      }

      toggle(bookId);
      if (!userId) {
        toast.info('Save your favorite books across devices via Login');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title={title || 'Add To Favorite'}
      disabled={loading}
      className={cn(
        'flex-1 md:w-auto py-4 flex items-center gap-2 cursor-pointer',
        loading && 'animate-pulse! transition',
        className
      )}
      variant={variant || 'destructive'}
      size={minimal ? 'sm' : 'default'}
      onClick={handleToggleFavorite}
    >
      {isFavorite ? <HugeiconsIcon icon={HeartOff} /> : <HugeiconsIcon icon={Heart} />}
      <span className={cn('hidden md:inline', minimal && 'hidden md:hidden')}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </span>
    </Button>
  );
}

export default ToggleFavoriteBook;
