import type {SupabaseClient} from '@supabase/supabase-js';
import {toast} from 'sonner';

export async function getUserById(
  supabase: SupabaseClient
): Promise<{userId: string | null; error: Error | null}> {
  const {data, error} = await supabase.auth.getClaims();
  const user = data?.claims;
  const userId = user?.sub ?? null;

  if (error) {
    setTimeout(() => {
      toast.error('Failed to fetch user information.', {
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
    }, 1000);
  } else if (!userId) {
    setTimeout(() => {
      toast.error('Failed to fetch user information.', {
        description: 'Please try again later.',
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

  return {userId, error};
}
