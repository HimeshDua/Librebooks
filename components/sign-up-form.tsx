'use client';

import {supabase} from '@/lib/supabase/client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {toast} from 'sonner';

export function SignUpForm() {
  const handleGoogleSignUp = async () => {
    try {
      const {error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {redirectTo: `${window.location.origin}/auth/callback`},
      });

      if (error) {
        console.error('Google sign-up error', error);
        toast.error('Google sign-up failed. Check console for details.');
      } else {
        toast.info('Redirecting to Google...');
      }
    } catch (err) {
      console.error('Unhandled sign-up error', err);
      toast.error('Unexpected error. Try again.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Sign up instantly using your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button className="w-full" variant="outline" type="button" onClick={handleGoogleSignUp}>
              Continue with Google
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              LibreBooks uses Google login for a seamless, password-free reading experience.
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
