import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {HugeiconsIcon} from '@hugeicons/react';
import {ArrowLeft, BookOpen, BookX} from '@hugeicons/core-free-icons';

export default function MinimalBookNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/5 p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-4 bg-linear-to-r from-primary/5 to-accent/5 rounded-3xl blur-xl opacity-50" />

        <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-lg" />
              <div className="relative bg-linear-to-br from-background to-muted/50 p-4 rounded-full border border-border/30">
                <HugeiconsIcon icon={BookX} className="size-12 text-destructive animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Book Unavailable</h1>
              <p className="text-muted-foreground">
                This book is currently not available for reading.
              </p>
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
                Need help finding a book?
                <Link href="/library?search=" className="text-primary hover:underline">
                  Search our collection
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
