'use client';

import {HugeiconsIcon} from '@hugeicons/react';
import {Button} from '../ui/button';
import {useTheme} from 'next-themes';
import {usePathname, useRouter} from 'next/navigation';
import {Laptop, Moon, Sun} from '@hugeicons/core-free-icons';
import {toast} from 'sonner';

type Props = {
  updateRenderKey: () => void;
};

export function ThemeToggleButton({updateRenderKey}: Props) {
  const {theme, setTheme, systemTheme} = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    updateRenderKey();
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (pathname.startsWith('/read/')) {
      router.refresh();
      setTimeout(() => {
        toast.info('Theme changed successfully', {
          description:
            'We recommend refreshing the page to ensure the book displays correctly with the new theme.',
        });
      }, 300);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
      className="h-9 w-9 rounded-full hover:bg-muted transition"
    >
      {currentTheme === 'light' ? (
        <HugeiconsIcon icon={Moon} className="w-4 h-4" />
      ) : currentTheme === 'dark' ? (
        <HugeiconsIcon icon={Sun} className="w-4 h-4" />
      ) : (
        <HugeiconsIcon icon={Laptop} className="w-4 h-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
