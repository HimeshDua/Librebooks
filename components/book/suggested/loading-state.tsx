import {Skeleton} from '@/components/ui/skeleton';

function SuggestedBookSectionLoadingState() {
  return (
    <section className="mt-16">
      <Skeleton className="h-9 w-56 mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array.from({length: 5}).map((_, index) => (
          <div key={index} className="rounded-2xl overflow-hidden border">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SuggestedBookSectionLoadingState;
