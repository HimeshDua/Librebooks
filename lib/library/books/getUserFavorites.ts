'use server';

import {publicSupabase as supabase} from '@/lib/supabase/public';

export async function getUserFavorites(userId: string) {
  const {data, error} = await supabase.from('favorites').select('book_id').eq('user_id', userId);

  if (error) {
    console.error('[getUserFavorites]', error.message);
    return [];
  }

  return data.map(f => f.book_id) as number[];
}
