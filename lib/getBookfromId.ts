'use server';
import type {Book} from '@/types';
import type {SupabaseClient} from '@supabase/supabase-js';

export async function getBookfromId(
  supabase: SupabaseClient,
  slug: string
): Promise<{data: Book | null; error: Error | null}> {
  const {data, error} = await supabase.from('books').select('*').eq('slug', slug).single();

  return {data, error};
}
