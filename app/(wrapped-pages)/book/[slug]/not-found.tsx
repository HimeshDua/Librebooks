import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {BookX, ArrowLeft, BookOpen} from '@hugeicons/core-free-icons';
import {HugeiconsIcon} from '@hugeicons/react';

export default function MinimalBookNotFound() {
  return (
    <div className="flex flex-col min-h-[85vh] max-w-xl mx-auto mt-18">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-lg" />
          <div className="relative bg-linear-to-br from-background to-muted/50 p-4 rounded-full border border-border/30">
            <HugeiconsIcon icon={BookX} className="h-12 w-12 text-destructive animate-pulse" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Book Unavailable</h1>
          <p className="text-muted-foreground">This book is currently not available for reading.</p>
        </div>
        <div className="space-y-3 pt-4">
          <Button
            className="w-full rounded-lg bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            render={
              <Link href="/library" className="flex items-center justify-center gap-2">
                <HugeiconsIcon icon={BookOpen} className="size-4" />
                Explore Library
              </Link>
            }
          />

          <Button
            variant="outline"
            className="w-full rounded-lg border-2"
            render={
              <Link href="/" className="flex items-center justify-center gap-2">
                <HugeiconsIcon icon={ArrowLeft} className="size-4" />
                Return Home
              </Link>
            }
          />
        </div>
        <div className="pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Need help finding a book?{' '}
            <Link href="/library?search=" className="text-primary hover:underline">
              Search our collection
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
