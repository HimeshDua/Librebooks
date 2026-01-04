'use client';

import {useFormState, useFormStatus} from 'react-dom';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {login, loginWithGoogle} from '@/lib/auth/actions/login';
import {Loader2} from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const {pending} = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Login
    </Button>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(login, {});

  return (
    <main className="flex min-h-[90svh] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in with email</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action={action} className="flex flex-col gap-4">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />

            {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

            <SubmitButton />
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <Link href="/auth/sign-up">
                <span className="bg-card px-2 text-muted-foreground hover:underline underline-offset-2">
                  Or Create new account
                </span>
              </Link>
            </div>
          </div>

          <form action={loginWithGoogle}>
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
