'use server';
import {Suspense} from 'react';
import Link from 'next/link';
import {Button} from '../ui/button';
import {UserMenu} from '../user-menu';
import {hasEnvVars} from '@/lib/utils';
import {EnvVarWarning} from '../env-var-warning';
import {ThemeToggleButton} from '../book/toggleThemeButton';
import {AuthButtonsSkeleton} from '../skeletons/auth-buttons';
import {getUserByInfo} from '@/lib/getUserByInfo';
import HeaderDrawer from './header-drawer';
import {HugeiconsIcon} from '@hugeicons/react';
import {Library, Search} from '@hugeicons/core-free-icons';

export default async function Header() {
  const {user} = await getUserByInfo();
  const isUser = !!user;

  return (
    <nav
      id="header"
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 supports-backdrop-filter:bg-background/60"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-6">
          <Link prefetch href="/" className="hidden sm:flex items-center gap-2 group">
            <HugeiconsIcon icon={Library} className="size-5" />
            <span className="font-bold text-lg tracking-tight hidden sm:block">LibreBooks</span>
          </Link>

          <div className="sm:hidden">
            <Suspense>
              <HeaderDrawer isUser={isUser} />
            </Suspense>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            {!user && (
              <Link
                prefetch
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
            )}
            <Link
              prefetch
              href="/library"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/book/favorites"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Favorites
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>
        </div>

        <Suspense>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Search books">
              <Link prefetch href="/library">
                <HugeiconsIcon icon={Search} className="size-4" />
              </Link>
            </Button>
            {isUser ? (
              <Suspense fallback={<AuthButtonsSkeleton />}>
                <UserMenu user={user} />
              </Suspense>
            ) : !hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  render={
                    <Link prefetch href="/auth/login">
                      Log In
                    </Link>
                  }
                  variant="ghost"
                  className="hidden sm:flex"
                />
                <Button
                  render={
                    <Link prefetch href="/auth/sign-up">
                      Sign Up
                    </Link>
                  }
                  className="rounded-full font-semibold"
                />
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </nav>
  );
}
