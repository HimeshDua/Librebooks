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
    const {error} = await supabase.from('favorites').delete().match({user_id, book_id});
    return {error: error?.message || null, message: `Removed "${bookTitle}" from favorites`};
  } else {
    const {error} = await supabase.from('favorites').insert({user_id, book_id});
    return {error: error?.message || null, message: `Added "${bookTitle}" to favorites`};
  }
};
