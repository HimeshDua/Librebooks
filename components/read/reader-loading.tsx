import {Skeleton} from '@/components/ui/skeleton';
import {BookMarked, BookOpen, BookText} from '@hugeicons/core-free-icons';
import {HugeiconsIcon} from '@hugeicons/react';

export default function ReaderSkeleton() {
  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden">
      <header className="relative z-50 border-b border-border/50 bg-linear-to-r from-background via-background/95 to-background/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HugeiconsIcon icon={BookOpen} className="size-4 text-muted-foreground/50" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24 rounded-full" />
              </div>

              <div className="h-4 w-px bg-linear-to-b from-transparent via-border/50 to-transparent" />

              <div className="hidden sm:block">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 pr-2 border-r border-border/50">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-10 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>

              <Skeleton className="h-8 w-8 rounded-md" />

              <Skeleton className="h-8 w-8 rounded-md" />

              <Skeleton className="h-8 w-8 rounded-md ml-2" />
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-border/30 to-transparent">
          <Skeleton className="h-full w-1/4 rounded-full" />
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden bg-linear-to-br from-[#FFFACC]/20 to-[#FEF3C7]/20 dark:from-[#1C1D21]/20 dark:to-[#0F172A]/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-border/20 bg-linear-to-r from-transparent via-background/5 to-transparent hidden lg:block" />
          <div className="absolute right-0 top-0 bottom-0 w-16 border-l border-border/20 bg-linear-to-l from-transparent via-background/5 to-transparent hidden lg:block" />
        </div>

        <div className="h-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-8 md:py-12">
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-border/30 to-border/30" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-border/30 to-border/30" />
            </div>

            <div className="text-center mb-8">
              <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 p-6 md:p-8 shadow-lg">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

              <div className="absolute top-3 right-3">
                <Skeleton className="h-4 w-8" />
              </div>

              <div className="space-y-4">
                {Array.from({length: 8}).map((_, index) => {
                  const widths = ['w-full', 'w-11/12', 'w-10/12', 'w-9/12'];
                  const widthClass = widths[index % widths.length];

                  return (
                    <div key={index} className="space-y-1.5">
                      <Skeleton className={`h-3.5 ${widthClass} rounded-full`} />
                      <Skeleton className="h-3.5 w-full rounded-full" />
                      {index % 2 === 0 && <Skeleton className="h-3.5 w-10/12 rounded-full" />}
                    </div>
                  );
                })}

                <div className="flex gap-4 mt-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-full rounded-full" />
                    <Skeleton className="h-3.5 w-11/12 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <Skeleton className="h-2 w-6 rounded-full" />
              <Skeleton className="h-2 w-8 rounded-full" />
              <Skeleton className="h-3 w-12 rounded-full" />
              <Skeleton className="h-2 w-8 rounded-full" />
              <Skeleton className="h-2 w-6 rounded-full" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-8">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={BookText} className="size-3.5" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="h-3 w-px bg-border/50" />
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={BookMarked} className="size-3.5" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Skeleton className="absolute left-0 h-12 w-12 rounded-full" />
          <Skeleton className="absolute right-0 h-12 w-12 rounded-full" />
        </div>
      </div>

      <div className="border-t border-border/50 bg-linear-to-t from-background via-background/95 to-background/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:hidden">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <div className="text-xs text-muted-foreground">/</div>
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="h-6 w-px bg-border/50" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="mt-3">
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
        </div>
      </div>

      {/* Subtle Overlay */}
      <div className="fixed inset-0 z-40 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
    </div>
  );
}
