'use client';

import {useState} from 'react';
import {Library, X, Search} from 'lucide-react';
import Link from 'next/link';
import {Button} from '../ui/button';
import {UserMenu} from '../user-menu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import {useUser} from './context/UserContext';
import {hasEnvVars} from '@/lib/utils';
import {EnvVarWarning} from '../env-var-warning';
import {ThemeToggleButton} from '../book/toggleThemeButton';

export default function Header() {
  const [open, setOpen] = useState(false);
  const {user} = useUser();
  const isUser = !!user;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* ========== LEFT SIDE: Logo + Navigation ========== */}
        <div className="flex items-center gap-6">
          {/* Brand Logo */}
          <Link prefetch={true} href="/" className="hidden sm:flex items-center gap-2 group">
            <Library className="w-5 h-5" />
            <span className="font-bold text-lg tracking-tight hidden sm:block">LibreBooks</span>
          </Link>

          <div className="sm:hidden">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Library className="w-5 h-5" />
                </Button>
              </DrawerTrigger>

              <DrawerContent className="w-screen p-4 flex flex-col">
                <DrawerHeader className="flex items-center justify-between">
                  <DrawerTitle className="font-semibold text-lg">Menu</DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5" />
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
                      prefetch={true}
                      href="/book/favorites"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium py-2 hover:text-primary transition-colors"
                    >
                      Your Favorites
                    </Link>
                  )}
                  <Link
                    prefetch={true}
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium py-2 hover:text-primary transition-colors"
                  >
                    Know About Us
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            {!user && (
              <Link
                prefetch={true}
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
            )}
            <Link
              prefetch={true}
              href="/library"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse
            </Link>
            {user && (
              <Link
                prefetch={true}
                href="/book/favorites"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Favorites
              </Link>
            )}
            <Link
              prefetch={true}
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>
        </div>

        {/* ========== RIGHT SIDE: Auth / Profile ========== */}
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          {/* Quick Search Icon (Mobile) */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Search books"
          >
            <Link prefetch={true} href="/library">
              <Search className="w-4 h-4" />
            </Link>
          </Button>
          {isUser ? (
            <UserMenu user={user} />
          ) : !hasEnvVars ? (
            <EnvVarWarning />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link prefetch={true} href="/auth/login">
                  Log In
                </Link>
              </Button>
              <Button asChild className="rounded-full font-semibold">
                <Link prefetch={true} href="/auth/sign-up">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
