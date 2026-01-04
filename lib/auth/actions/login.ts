'use server';

import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';

type LoginState = {
  error?: string;
};

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const supabase = await createClient();
  const {error} = await supabase.auth.signInWithPassword({email, password});

  if (error) {
    return {error: error.message};
  }

  redirect('/library');
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}
