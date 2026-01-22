'use client';

import {useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {HeartIcon, HeartOffIcon} from 'lucide-react';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';
import {useFavorite} from '@/store';
import {toggleFavoriteBook} from '@/lib/library/books/actions/toggleFavoriteBook';
import {getUserFavorites} from '@/lib/library/books/favorites/actions/getUserFavorites';

type Props = {
  id: string | null;
  bookId: number;
  bookTitle: string;
};

function ToggleFavoriteBook({id, bookId, bookTitle}: Props) {
  const {favorites, toggle, setAll} = useFavorite();

  const [loading, setLoading] = useState(true);
  const isFavorite = favorites.has(bookId);
  console.log('is that true? ', isFavorite);
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getUserFavorites(id)
      .then(setAll)
      .catch(() => toast.error('Failed to load favorites'))
      .then(() => setLoading(false));
  }, [id, setAll]);

  const handleToggleFavorite = async () => {
    if (!id) {
      setLoading(false);
    }

    try {
      if (id) {
        const {error, message} = await toggleFavoriteBook({
          isFavorite,
          book_id: bookId,
          bookTitle,
          user_id: id,
        });

        if (error) throw error;
        toast.success(message);
      }

      toggle(bookId);
      if (!id) {
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
      disabled={loading}
      variant="destructive"
      className={cn(
        'flex-1 md:w-auto py-4 flex items-center gap-2 cursor-pointer',
        loading && 'animate-pulse! transition',
        isFavorite ? 'bg-red-800 hover:bg-red-800/90' : 'bg-red-600 hover:bg-red-600/90'
      )}
      onClick={handleToggleFavorite}
    >
      {isFavorite ? <HeartOffIcon /> : <HeartIcon />}

      <span className="hidden md:inline">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </span>
    </Button>
  );
}

export default ToggleFavoriteBook;
