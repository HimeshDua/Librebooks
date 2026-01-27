'use client';
import {Button} from '../../ui/button';
import Link from 'next/link';
import type {User} from '@supabase/supabase-js';
import {useEffect, useState} from 'react';
import {UserMenuSkeleton} from '../../skeletons/user-menu';
import {useFavorite} from '@/store';
import {useIsMobile} from '@/hooks/useIsMobile';
import {toast} from 'sonner';
import {UserMenuWithBadge} from './user-menu-badge';

export function UserBar({user}: {user: User | null}) {
  const [loading, setLoading] = useState(true);
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
    setLoading(false);

    if (isMob === null) {
      return;
    } else {
      setIsMobile(isMob);
    }

    return () => {};
  }, [user, isMob]);

  if (loading) {
    return <UserMenuSkeleton />;
  } else
    return !!user ? (
      <UserMenuWithBadge user={user} favoriteCount={favoriteCount} isMobile={isMobile} />
    ) : (
      <div className="flex items-center gap-2">
        <Button
          nativeButton={false}
          render={
            <Link prefetch href="/auth/login">
              Log In
            </Link>
          }
          variant="ghost"
          className="hidden sm:flex"
        />
        <Button
          nativeButton={false}
          render={
            <Link prefetch href="/auth/sign-up">
              Sign Up
            </Link>
          }
          className="rounded-full font-semibold"
        />
      </div>
    );
}
