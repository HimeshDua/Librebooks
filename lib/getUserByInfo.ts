'use server';
import {publicSupabase as supabase} from './supabase/public';

export const getUserByInfo = async () => {
  const {data, error} = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) return {user: null};
  if (error) console.error(error.message);
  // cacheTag('user', user.id);
  // cacheLife('hours');
  return {user: user};
};
