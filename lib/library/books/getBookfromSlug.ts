'use server';
import {publicSupabase as supabase} from '@/lib/supabase/public';
import type {Book} from '@/types';

type GetBookFromSlugResult = Promise<{
  data: Book | null;
  error: Error | null;
}>;

export const getBookFromSlug = async (slug: string): GetBookFromSlugResult => {
  const {data, error} = await supabase.from('books').select('*').eq('slug', slug).single();
  console.log('I got hit:', slug);
  return {data, error};
};
