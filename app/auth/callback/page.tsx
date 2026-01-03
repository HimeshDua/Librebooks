'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {publicSupabase as supabase} from '@/lib/supabase/public';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finalize = async () => {
      const {error} = await supabase.auth.exchangeCodeForSession(window.location.search);

      if (error) {
        console.error(error);
        router.replace('/auth/login');
        return;
      }

      router.replace('/library');
    };

    finalize();
  }, [router]);

  return <p>Signing you in…</p>;
}
