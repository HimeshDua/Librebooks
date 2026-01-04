'use server';
import {homeContent} from '@/components/library/hero.data';
import Hero from '@/components/library/hero';
import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';

export default async function HomePage() {
  return (
    <div className="container min-h-[94vh] mx-auto">
      <Header />
      <main className="min-h-[84vh] px-2 mx-auto">
        <Hero {...homeContent} />
      </main>
      <Footer />
    </div>
  );
}
