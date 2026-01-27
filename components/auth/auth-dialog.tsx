'use client';

import React, {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {Button} from '../ui/button';
import {Separator} from '../ui/separator';
import Link from 'next/link';
import {cn} from '@/lib/utils';
import {useRouter} from 'next/navigation';

type AuthDialogProps = {
  dialogTrigger: React.ReactNode;
  triggerClassName?: string;
  title?: string;
  description: string;
  triggerDisabled?: boolean;
  onDialogOpen?: () => void;
  onDialogClose?: () => void;
};

function AuthDialog({
  dialogTrigger,
  triggerClassName,
  title,
  description,
  triggerDisabled = false,
  onDialogOpen,
  onDialogClose,
}: AuthDialogProps) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<string | null>(null);

  const handleRedirect = (path: string, action: string) => {
    setIsRedirecting(action);
    router.push(path);
    // Reset after timeout in case navigation fails
    setTimeout(() => setIsRedirecting(null), 3000);
  };

  return (
    <Dialog
      onOpenChange={open => {
        if (open) {
          onDialogOpen?.();
        } else {
          onDialogClose?.();
          setIsRedirecting(null);
        }
      }}
    >
      <DialogTrigger
        disabled={triggerDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          'h-9 px-4 py-2',
          triggerDisabled && 'opacity-70 cursor-not-allowed',
          triggerClassName
        )}
      >
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? 'Login Required'}</DialogTitle>
          <DialogDescription>You must be logged in to {description}.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex md:flex-row flex-col gap-3">
          <Button
            className="flex-1 transition-all duration-200"
            disabled={isRedirecting === 'login'}
            onClick={() => handleRedirect('/auth/login', 'login')}
          >
            {isRedirecting === 'login' ? (
              <div className="flex items-center justify-center gap-2">
                <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Redirecting...</span>
              </div>
            ) : (
              'Log In'
            )}
          </Button>

          <Button
            variant="outline"
            className="flex-1 transition-all duration-200"
            disabled={isRedirecting === 'signup'}
            onClick={() => handleRedirect('/auth/sign-up', 'signup')}
          >
            {isRedirecting === 'signup' ? (
              <div className="flex items-center justify-center gap-2">
                <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Redirecting...</span>
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
