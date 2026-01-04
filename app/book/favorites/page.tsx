'use server';
import FavoritesBlock from '@/components/favoritism/favoritesBlock';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';
import {getUserByInfo} from '@/lib/getUserByInfo';

async function FavoritesPage() {
  const {user} = await getUserByInfo();

  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <FavoritesBlock user={user} />
      <Footer />
    </div>
  );
}

export default FavoritesPage;
