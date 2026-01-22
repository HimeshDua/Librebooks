'use server';

import {createClient} from '@/lib/supabase/server';

export async function getUserFavorites(userId: string) {
  const supabase = await createClient();
  const {data, error} = await supabase.from('favorite').select('book_id').eq('user_id', userId);

  if (error) {
    console.error('[getUserFavorites]', error.message);
    return [];
  }

  return data.map(f => f.book_id) as number[];
}
