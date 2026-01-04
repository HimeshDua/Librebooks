'use server';
import FavoritesBlock from '@/components/favoritism/favoritesBlock';
import Footer from '@/components/nav/footer';
import FooterLoading from '@/components/nav/footer-loading';
import Header from '@/components/nav/header';
import HeaderLoading from '@/components/nav/header-loading';
import {getUserByInfo} from '@/lib/getUserByInfo';
import {Suspense} from 'react';

async function FavoritesPage() {
  const {user} = await getUserByInfo();

  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Suspense fallback={<HeaderLoading />}>
        <Header />
      </Suspense>
      <FavoritesBlock user={user} />
      <Suspense fallback={<FooterLoading />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default FavoritesPage;
