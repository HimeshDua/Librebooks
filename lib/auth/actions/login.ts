'use server';

import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  const {error} = await supabase.auth.signInWithPassword({email, password});

  if (error) {
    console.error(error.message);
    console.log(error.message);
    return;
  }

  redirect('/library');
}
