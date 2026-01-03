'use client';

import {supabase} from '@/lib/supabase/client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {toast} from 'sonner';

export function LoginForm() {
  const handleGoogleLogin = async () => {
    try {
      toast.info('Redirecting to Google sign-in...');
      const {error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google sign-in error:', error.message);
        toast.error('Google sign-in failed. Check console for details.');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      toast.error('Unexpected error. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-10">
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
            Don’t have an account?{' '}
            <a href="/auth/sign-up" className="underline underline-offset-4 text-primary">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
