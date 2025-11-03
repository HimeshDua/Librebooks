'use client';

import { useState } from 'react';
import { Library, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserMenu } from '../user-menu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { useUser } from './context/UserContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser()
  const isUser = !!user

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50 supports-[backdrop-filter]:bg-background/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left: Mobile Drawer Trigger / Brand */}
        <div className="flex items-center gap-2">
          {/* Drawer trigger only visible on mobile */}
          <div className="md:hidden">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open library">
                  <Library className="w-5 h-5 text-primary" />
                </Button>
              </DrawerTrigger>

              <DrawerContent className="w-screen md:w-64 p-4 flex flex-col">
                <DrawerHeader className="flex items-center justify-between">
                  <DrawerTitle className="font-semibold text-lg">Library Menu</DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>

                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Home / Browser Books
                  </Link>
                  {isUser ? (
                    <>
                      <Link
                        href="book/favorites"
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium hover:text-primary"
                      >
                        Favorites
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium hover:text-primary"
                      >
                        About
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground text-ellipsis text-sm px-1">
                        Log In to Unlock More Pages ✨
                      </p>
                      <Button onClick={() => setOpen(false)}>
                        <Link href="/auth/login" className="w-full h-full">
                          Log In
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Brand name for larger screens */}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <Library className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg tracking-tight">Public Library</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <UserMenu />
          <form className="flex items-center gap-2">
            <Input
              name="q"
              placeholder="Search title or author"
              aria-label="Search books by title or author"
              className="rounded-full backdrop-blur-md w-[160px] sm:w-[240px]"
            />
            <Button className="hidden md:flex rounded-full">Search</Button>
          </form>
        </div>
      </div>
    </nav>
  );
}
