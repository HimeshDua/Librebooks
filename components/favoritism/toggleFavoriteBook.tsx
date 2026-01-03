'use client';

import {useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {HeartIcon, HeartOffIcon} from 'lucide-react';
import {toast} from 'sonner';
import {ConfettiButton} from '../ui/confetti';
import AuthDialog from '../auth-dialog';
import {cn} from '@/lib/utils';
import {useFavorite} from '@/store/index';
import {getUserFavorites} from '@/lib/library/books/getUserFavorites';
import {publicSupabase as supabase} from '@/lib/supabase/public';

type Props = {
  id: string | null;
  bookId: number;
  bookTitle: string;
};

function ToggleFavoriteBook({id, bookId, bookTitle}: Props) {
  const {favorites, toggle, setAll} = useFavorite();

  const [loading, setLoading] = useState(false);
  const isFavorite = favorites.has(bookId);

  // 🔹 Hydrate favorites once
  useEffect(() => {
    if (!id) return;

    getUserFavorites(id)
      .then(setAll)
      .catch(() => toast.error('Failed to load favorites'));
  }, [id, setAll]);

  const handleToggleFavorite = async () => {
    if (!id) return;
    setLoading(true);

    try {
      if (isFavorite) {
        const {error} = await supabase
          .from('favorites')
          .delete()
          .match({user_id: id, book_id: bookId});

        if (error) throw error;

        toggle(bookId);
        toast.success(`Removed "${bookTitle}" from favorites`);
      } else {
        const {error} = await supabase.from('favorites').insert({user_id: id, book_id: bookId});

        if (error) throw error;

        toggle(bookId);
        toast.success(`Added "${bookTitle}" to favorites`);
      }
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
