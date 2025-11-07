import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {Button} from './ui/button';
import {Separator} from './ui/separator';
import Link from 'next/link';
import {cn} from '@/lib/utils';

function AuthDialog({
  dialogTrigger,
  triggerClassName,
  title,
  description,
}: {
  dialogTrigger: React.ReactNode;
  triggerClassName?: string;
  title?: string;
  description: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          'h-9 px-4 py-2',
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

        <Separator className="my-4" />

        <DialogFooter className="flex md:flex-row flex-col gap-3">
          <Link prefetch={true} href="/auth/login" className="w-full">
            <Button className="w-full">Log In</Button>
          </Link>
          <Link prefetch={true} href="/auth/sign-up" className="w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
