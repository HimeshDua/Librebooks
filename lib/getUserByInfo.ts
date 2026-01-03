'use server';
import {createClient} from '@/lib/supabase/server';

export async function getUserByInfo() {
  const supabase = createClient();
  const {data} = await (await supabase).auth.getUser();
  return {user: data.user};
}
