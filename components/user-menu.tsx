'use client';

import {useState, useEffect} from 'react';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {LogoutButton} from './logout-button';
import Link from 'next/link';
import {Tooltip, TooltipContent, TooltipTrigger} from './ui/tooltip';
import {useIsMobile} from '@/hooks/useIsMobile';
import {toast} from 'sonner';
import {User} from '@supabase/supabase-js';
import {HugeiconsIcon} from '@hugeicons/react';
import {CheckCircle, Heart, Mail} from '@hugeicons/core-free-icons';
import {useFavorite} from '@/store';

export function UserMenu({user}: {user: User}) {
  const [isMobile, setIsMobile] = useState(false);
  const favoriteCount = useFavorite(f => f.favorites).size;
  const isMob = useIsMobile();

  useEffect(() => {
    const pathName = typeof window !== 'undefined' ? window.location.pathname : '';
    const isLogWarnGiven = localStorage.getItem('LogWarnGiven') !== '1' || false;

    if (pathName === '/' && !user && isLogWarnGiven) {
      setTimeout(() => {
        toast.info('Log in for a better experience', {
          action: {
            label: 'Log in',
            actionButtonStyle: {padding: '0.25rem 0.75rem'},
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
      <PopoverTrigger className="order-2 md:order-1 hover:border-primary/60 transition-all">
        <Avatar className="w-8 h-8">
          <AvatarImage className="object-fill" src="/avatars/default-user.jpg" alt={user.email} />
          <AvatarFallback className="bg-muted text-sm">
            {user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[98svw] md:w-64 mt-2 me-0.5 rounded-xl border-border/60 shadow-lg backdrop-blur-sm bg-background/90"
      >
        <div className="flex flex-col gap-3" suppressHydrationWarning>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Mail} className="size-4" />
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            {isVerified ? (
              <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                {isMobile ? (
                  <>
                    <HugeiconsIcon
                      icon={CheckCircle}
                      className="size-4"
                      aria-label="Email is verified"
                    />
                    Verfied
                  </>
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                      <HugeiconsIcon
                        icon={CheckCircle}
                        className="size-4"
                        aria-label="Email is verified"
                      />
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
        </div>

        <Separator className="my-2" />
        {favoriteCount > 0 && (
          <Link href="/book/favorites" className="group flex items-center justify-between  ">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Heart} className="size-4" fill="red" />
              <span className="text-sm font-medium">Books Loved by You</span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground bg-background/80 rounded-full px-2 py-0.5">
              {favoriteCount || 0}
            </span>
          </Link>
        )}
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
