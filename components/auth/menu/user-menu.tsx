'use client';

import {useEffect, useState} from 'react';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {LogoutButton} from '../logout-button';
import Link from 'next/link';
import {Tooltip, TooltipContent, TooltipTrigger} from '../../ui/tooltip';
import {Button} from '../../ui/button';
import {User} from '@supabase/supabase-js';
import {HugeiconsIcon} from '@hugeicons/react';
import {CheckCircle, Mail, ChevronRight, AllBookmarkIcon} from '@hugeicons/core-free-icons';
import {useRouter} from 'next/navigation';
import {getUserFavorites} from '@/lib/library/books/favorites/actions/get-fav-book-Ids';
import {useFavorite} from '@/store';

type Props = {
  user: User;
  favoriteCount: number;
  isMobile: boolean;
};

export function UserMenu({user, favoriteCount = 0, isMobile}: Props) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const isVerified = user.user_metadata?.email_verified;
  const setFavorites = useFavorite(f => f.setAll);
  useEffect(() => {
    if (!user.id) return;
    getUserFavorites(user.id).then(data => {
      setFavorites(data);
    });
  }, [user.id]);

  const handleNavigateToFavorites = () => {
    setIsNavigating(true);
    router.push('/book/favorites');
    setTimeout(() => setIsNavigating(false), 2000);
  };

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
        className="w-[98svw] md:w-72 mt-2 me-0.5 rounded-xl border-border/60 shadow-lg backdrop-blur-sm bg-background/90"
      >
        <div className="flex flex-col gap-3" suppressHydrationWarning>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 max-w-[70%]">
              <HugeiconsIcon icon={Mail} className="size-4 shrink-0" />
              <span className="text-sm font-medium truncate" title={user.email}>
                {user.email}
              </span>
            </div>
            {isVerified ? (
              <span className="flex items-center gap-1 text-xs text-green-600 font-semibold shrink-0">
                {isMobile ? (
                  <>
                    <HugeiconsIcon
                      icon={CheckCircle}
                      className="size-4"
                      aria-label="Email is verified"
                    />
                    Verified
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
                    <TooltipContent>
                      <p>Verified Email</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>
            ) : (
              <span className="text-xs text-destructive font-semibold shrink-0">Unverified</span>
            )}
          </div>
        </div>

        <Separator className="my-3" />

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              My Library
            </h3>
            {favoriteCount > 0 && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {favoriteCount} saved
              </span>
            )}
          </div>

          <Button
            nativeButton={false}
            variant="ghost"
            className="w-full justify-between p-3 h-auto hover:bg-accent/50 transition-all group relative"
            onClick={handleNavigateToFavorites}
            disabled={isNavigating}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <HugeiconsIcon
                  icon={AllBookmarkIcon}
                  className="size-5 text-primary group-hover:scale-110 transition-transform"
                />
                {isNavigating && (
                  <div className="absolute -top-1 -right-1 size-2 bg-primary rounded-full animate-ping" />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">My Favorite Books</p>
                <p className="text-xs text-muted-foreground">
                  {favoriteCount > 0
                    ? `${favoriteCount} book${favoriteCount !== 1 ? 's' : ''} you've loved`
                    : 'Save books to read later'}
                </p>
              </div>
            </div>

            {isNavigating ? (
              <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <HugeiconsIcon
                  icon={ChevronRight}
                  className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform"
                />
                {!isMobile && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="absolute inset-0 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>View your saved favorites</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </>
            )}
          </Button>

          {favoriteCount > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-accent/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Saved</p>
                <p className="font-semibold text-sm">{favoriteCount}</p>
              </div>
              <Link
                href="/library"
                className="text-center p-2 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <p className="text-xs text-muted-foreground">Browse</p>
                <p className="font-semibold text-sm">More →</p>
              </Link>
            </div>
          )}
        </div>

        <Separator className="my-3" />

        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
