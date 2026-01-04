'use server';
import Hero from '@/components/library/hero';
import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';
import {homeContent} from '@/components/library/hero.data';

export default async function HomePage() {
  return (
    <div className="container min-h-[94vh] mx-auto">
      <Header />
      <main className="min-h-screen px-2 mx-auto">
        <Hero {...homeContent} />
      </main>
      <Footer />
    </div>
  );
}
