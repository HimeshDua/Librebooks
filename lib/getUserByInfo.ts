'use server';
import {publicSupabase as supabase} from './supabase/public';

export const getUserByInfo = async () => {
  const {data, error} = await supabase.auth.getSession();
  const user = data?.session?.user;
  if (!user) return {user: null};
  if (error) console.error(error.message);
  console.log('i got hit', user);
  // cacheTag('user', user.id);
  // cacheLife('hours');
  return {user: user};
};
