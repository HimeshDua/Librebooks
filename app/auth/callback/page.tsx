'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({data}) => {
      if (data.session) router.push('/library');
      else router.push('/auth/login');
    });
  }, [router]);

  return <p>Signing you in...</p>;
}
