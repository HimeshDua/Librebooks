'use client';

import {createClient} from '@/lib/supabase/client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    try {
      const supabase = createClient();
      const {error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Google sign-in error:', error.message);
      }
      router.back();
      router.refresh();
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in securely using your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button className="w-full" variant="outline" type="button" onClick={handleGoogleLogin}>
              Continue with Google
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              LibreBooks uses Google login for a faster and password-free experience.
            </p>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="/auth/login" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
