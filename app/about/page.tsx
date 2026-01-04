'use server';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';

export default async function page() {
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />

      <main className="flex flex-col items-center justify-center px-6 py-20 mx-auto">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-primary">Libre Books</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            A clean, modern space for readers who value simplicity and depth. BookVerse is built to
            help you <strong>discover</strong>, <strong>read</strong>, and
            <strong> cherish</strong> the books that matter — without distractions.
          </p>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
            <Image
              fill
              preload
              loading="eager"
              src="/lib-image.png"
              alt="Modern digital library"
              className="object-cover aspect-[16/9] scale-[1.006] "
            />
          </div>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Designed with confidence, crafted for clarity — BookVerse isn’t just a library, it’s
            your digital reading companion.
          </p>

          <Button asChild size="lg" className="font-semibold mt-4">
            <Link prefetch href="/library">
              Explore Library <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
