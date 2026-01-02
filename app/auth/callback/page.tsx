'use server';
import {getUserByInfo} from '@/lib/getUserByInfo';
import {redirect} from 'next/navigation';

export default async function AuthCallback() {
  const {user} = await getUserByInfo();
  if (user) redirect('/library');
  else redirect('/auth/login');
}
