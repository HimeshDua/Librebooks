import type {SuggestedBook} from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';

function SuggestedBookSection({books}: {books: SuggestedBook[]}) {
  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-3xl font-medium md:text-4xl tracking-tight mb-2">You might also like</h2>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {books?.slice(0, 5).map(book => (
          <Link key={book.slug} href={`/book/${book.slug}`} className="group">
            <div className="relative aspect-[3/4] w-full rounded-2xl bg-muted shadow-black/90 dark:shadow-white/40 border border-primary/50 overflow-hidden shadow-sm transition">
              <Image
                src={book.cover_url || '/default-book-cover.jpg'}
                alt={book.title}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300  group-hover:scale-101"
              />
            </div>
            <p className="mt-3 text-sm font-medium leading-snug line-clamp-2">{book.title}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default SuggestedBookSection;
