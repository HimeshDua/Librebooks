'use server';

import {createClient} from '@/lib/supabase/server';

type toggleFavoriteBookProps = {
  isFavorite: boolean;
  bookTitle: string;
  user_id: string;
  book_id: number;
};

export const toggleFavoriteBook = async ({
  isFavorite,
  bookTitle,
  book_id,
  user_id,
}: toggleFavoriteBookProps) => {
  const supabase = await createClient();
  if (isFavorite) {
    try {
      const {error} = await supabase.from('favorite').delete().match({user_id, book_id});
      return {error: error?.message || null, message: `Removed "${bookTitle}" from favorites`};
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const {error} = await supabase.from('favorite').insert({user_id, book_id});
      return {error: error?.message || null, message: `Added "${bookTitle}" to favorites`};
    } catch (error) {
      throw error;
    }
  }
};
