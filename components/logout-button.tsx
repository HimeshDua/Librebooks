'use client';

import {Button} from '@/components/ui/button';
import {logout} from '@/lib/auth/actions/logout';
import {LogOut} from '@hugeicons/core-free-icons';
import {HugeiconsIcon} from '@hugeicons/react';

export function LogoutButton() {
  return (
    <Button
      onClick={logout}
      variant="destructive"
      className="w-full flex items-center justify-center gap-2"
    >
      <HugeiconsIcon icon={LogOut} className="size-5" />
      {/* <LogOut className="w-4 h-4" /> */}
      Log Out
    </Button>
  );
}
