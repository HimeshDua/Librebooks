'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const getSession = async () => {
      const {
        data: {session},
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error(error.message);
      }
      if (session) {
        router.push('/library');
      } else {
        router.push('/auth/login');
      }
    };

    getSession();
  }, [router]);

  return <p>Loading...</p>;
}
