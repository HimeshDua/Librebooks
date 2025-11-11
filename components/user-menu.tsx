'use client';

import {useState, useEffect, Suspense} from 'react';
import {useTheme} from 'next-themes';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {SunIcon, MoonIcon, LaptopIcon, CheckCircle2, Mail, Heart} from 'lucide-react';
import {LogoutButton} from './logout-button';
import Link from 'next/link';
import {Tooltip, TooltipContent, TooltipTrigger} from './ui/tooltip';
import {useIsMobile} from '@/hooks/useIsMobile';
import {toast} from 'sonner';
import {User} from '@supabase/supabase-js';

export function UserMenu({user, favoriteCount}: {user: User; favoriteCount: number}) {
  const {setTheme, theme} = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const isMob = useIsMobile();

  useEffect(() => {
    const pathName = typeof window !== 'undefined' ? window.location.pathname : '';
    const isLogWarnGiven = localStorage.getItem('LogWarnGiven') !== '1' || false;

    if (pathName === '/' && isLogWarnGiven) {
      setTimeout(() => {
        toast.info('Log in for a better experience', {
          action: {
            label: 'Log in',
            actionButtonStyle: {
              padding: '0.25rem 0.75rem',
            },
            onClick: () => {
              window.location.href = '/auth/login';
            },
          },
        });
      }, 300);
      localStorage.setItem('LogWarnGiven', '1');
    }

    if (isMob === null) {
      return;
    } else {
      setIsMobile(isMob);
    }
  }, [user, isMob]);

  if (!user) return null;

  const isVerified = user.user_metadata?.email_verified;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="order-2 md:order-1 rounded-full hover:border-primary/60 transition-all"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="object-fill "
              src="/avatars/default-user.jpg"
              alt={user.email}
            />
            <AvatarFallback className="bg-muted text-sm">
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-screen md:w-64 mt-2 rounded-xl border-border/60 shadow-lg backdrop-blur-sm bg-background/90"
      >
        <div className="flex flex-col gap-3" suppressHydrationWarning>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            {isVerified ? (
              <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                {isMobile ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" aria-label="Email is verified" />
                    Verfied
                  </>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CheckCircle2 className="w-3 h-3" aria-label="Email is verified" />
                    </TooltipTrigger>
                    <TooltipContent className=" sm:flex">
                      <p>Verified Email</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>
            ) : (
              <span className="text-xs text-destructive font-semibold">Unverified</span>
            )}
          </div>

          {favoriteCount > 0 && (
            <Link
              href="/book/favorites"
              className="group flex items-center justify-between bg-muted/40 hover:bg-muted/60 transition-colors rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <Heart
                  className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform"
                  fill="red"
                />
                <span className="text-sm font-medium">Books Loved by You</span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground bg-background/80 rounded-full px-2 py-0.5">
                {favoriteCount || 0}
              </span>
            </Link>
          )}
        </div>

        <Separator className="my-3" />

        <Suspense
          fallback={
            <Button size="icon" variant={'default'} aria-label="System theme">
              <LaptopIcon className="w-4 h-4" />
            </Button>
          }
        >
          <div className="flex justify-around mb-3">
            <Button
              size="icon"
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              aria-label="Light mode"
            >
              <SunIcon className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              aria-label="Dark mode"
            >
              <MoonIcon className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={theme === 'system' ? 'default' : 'outline'}
              onClick={() => setTheme('system')}
              aria-label="System theme"
            >
              <LaptopIcon className="w-4 h-4" />
            </Button>
          </div>
        </Suspense>

        <Separator className="my-2" />

        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
