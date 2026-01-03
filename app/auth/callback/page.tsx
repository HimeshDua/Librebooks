// app/auth/callback/page.tsx
'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {supabase} from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const {error} = await supabase.auth.exchangeCodeForSession(window.location.search);

      if (error) {
        console.error(error);
        router.replace('/auth/login');
        return;
      }

      router.replace('/library');
    };

    run();
  }, [router]);

  return <p>Signing you in…</p>;
}
