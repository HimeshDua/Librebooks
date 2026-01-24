'use client';

import {useState} from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {Button} from '../ui/button';
import Link from 'next/link';
import {HugeiconsIcon} from '@hugeicons/react';
import {Library, X} from '@hugeicons/core-free-icons';

function HeaderDrawer({isUser}: {isUser: boolean}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          {/* <Library className="w-5 h-5" /> */}
          <HugeiconsIcon icon={Library} className="size-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-screen p-4 flex flex-col">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="font-semibold text-lg">Menu</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              {/* <X className="w-5 h-5" /> */}
              <HugeiconsIcon icon={X} className="size-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
          >
            Go Home
          </Link>
          <Link
            prefetch={true}
            href="/library"
            onClick={() => setOpen(false)}
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
          >
            Browse Books
          </Link>
          {isUser && (
            <Link
              prefetch
              href="/book/favorites"
              onClick={() => setOpen(false)}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
            >
              Your Favorites
            </Link>
          )}
          <Link
            prefetch
            href="/about"
            onClick={() => setOpen(false)}
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
          >
            Know About Us
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default HeaderDrawer;
