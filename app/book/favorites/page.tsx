import {getFavoriteBooks} from '@/lib/library/books/favorites/actions/getFavorites';
import Image from 'next/image';
import Link from 'next/link';
import {Heart, LibraryBig} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {getUserByInfo} from '@/lib/getUserByInfo';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';

export default async function FavoritesPage() {
  const {user} = await getUserByInfo();
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground">Please sign in to view favorites.</p>
      </div>
    );
  }

  const {books} = await getFavoriteBooks({userId: user.id});

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <Heart className="w-12 h-12 text-red-500 mb-3" />
        <h2 className="text-2xl font-bold">No Favorite Books Yet</h2>
        <p className="text-muted-foreground mt-2 mb-4">Start exploring and add some favorites.</p>
        <Link href="/library">
          <Button className="rounded-full px-6">Browse Library</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <main className="min-h-screen py-10 px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between mb-8">
            <h1 className="text-3xl font-bold flex gap-2">
              <LibraryBig /> Your Favorites
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map(book => (
              <Link key={book.slug} href={`/book/${book.slug}`}>
                <div className="rounded-2xl overflow-hidden border hover:shadow-md transition">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={book.cover_url || '/default-book-cover.jpg'}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold truncate">{book.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
