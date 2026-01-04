'use client';

import {useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {HeartIcon, HeartOffIcon} from 'lucide-react';
import {toast} from 'sonner';
import {ConfettiButton} from '../ui/confetti';
import AuthDialog from '../auth-dialog';
import {cn} from '@/lib/utils';
import {useFavorite} from '@/store/index';
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
      return;
    }

    try {
      const {error, message} = await toggleFavoriteBook({
        isFavorite,
        book_id: bookId,
        bookTitle,
        user_id: id,
      });
      if (error) throw error;
      toggle(bookId);
      toast.success(message);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return (
      <AuthDialog
        description="save favorites"
        triggerClassName="w-full py-4 md:w-auto bg-destructive text-destructive-foreground"
        dialogTrigger={
          <>
            Add to favorites <HeartIcon />
          </>
        }
      />
    );
  }

  return (
    <ConfettiButton className="w-full md:w-auto" turnConfettiOn={!isFavorite}>
      <Button
        disabled={loading}
        onClick={handleToggleFavorite}
        variant="destructive"
        className={cn(
          'w-full py-4 md:w-auto',
          loading && 'animate-pulse transition',
          isFavorite ? 'bg-red-800 hover:bg-red-800/90' : 'bg-red-600 hover:bg-red-600/90'
        )}
      >
        {isFavorite ? 'Unmark from Favorites' : 'Mark As Favorite'}
        {isFavorite ? <HeartOffIcon /> : <HeartIcon />}
      </Button>
    </ConfettiButton>
  );
}

export default ToggleFavoriteBook;
