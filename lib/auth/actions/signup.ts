'use server';

import {createClient} from '@/lib/supabase/server';
import {redirect} from 'next/navigation';

type SignupState = {
  error?: string;
};

export async function signup(_prevState: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const supabase = await createClient();

  const {error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {error: error.message};
  }

  redirect('/library');
}

export async function signupWithGoogle() {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url);
}
