'use server';
import {createClient} from '@/lib/supabase/server';
import {toast} from 'sonner';

export async function getUserById(): Promise<{userId: string | null}> {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getClaims();
  const user = data?.claims;
  const userId = user?.sub ?? null;
  const pathName = typeof window !== 'undefined' ? window.location.pathname : '';

  if (error) {
    console.error('Error fetching user claims:', error);
    setTimeout(() => {
      toast.error(`Failed to fetch user information.`, {
        description: error.message,
        action: {
          label: 'Log in',
          actionButtonStyle: {
            padding: '0.25rem 0.75rem',
          },
          onClick: () => {
            window.location.href = '/auth/login';
          },
        },
      });
    }, 300);
  } else if (!userId && pathName !== '/') {
    console.error('Error fetching user claims:', error);

    setTimeout(() => {
      toast.info('Log in for a better experience', {
        description: 'Please try again later.',
        duration: 5,
        action: {
          label: 'Log in',
          actionButtonStyle: {
            padding: '0.25rem 0.75rem',
          },
          onClick: () => {
            window.location.href = '/auth/login';
          },
        },
      });
    }, 1000);
  }

  return {userId};
}
