'use client';

import {Button} from '@/components/ui/button';
import {logout} from '@/lib/auth/actions/logout';
import {LogOut} from 'lucide-react';

export function LogoutButton() {
  return (
    <Button
      onClick={logout}
      variant="destructive"
      className="w-full flex items-center justify-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Log Out
    </Button>
  );
}
