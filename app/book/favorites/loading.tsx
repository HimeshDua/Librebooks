import FavoritesBlockLoading from '@/components/favoritism/favorites-block-loading';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';

export default function FavoritesLoading() {
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <FavoritesBlockLoading />
      <Footer />
    </div>
  );
}
