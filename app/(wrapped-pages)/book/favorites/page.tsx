'use client';
import {getFavoriteBooks} from '@/lib/library/books/favorites/actions/getFavBooks';
import FavoritesBlockLoading from '@/components/favoritism/favorites-block-loading';
import FavoritesBlock from '@/components/favoritism/favoritesBlock';
import {Suspense, useEffect, useState} from 'react';
import type {Book} from '@/types/book';
import {useFavorite} from '@/store';
import {getUserByInfo} from '@/lib/getUserByInfo';

function FavoritesPage() {
  const [books, setbooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const favorites = useFavorite(f => f.favoritesArray);
  useEffect(() => {
    const init = async () => {
      const userId = (await getUserByInfo()).user?.id ?? null;
      const transformedSet = Array.from(favorites);
      const {books: data} = await getFavoriteBooks({favorites: transformedSet, userId});
      setbooks(data);
      setLoading(false);
    };
    init();
  }, [favorites]);

  return (
    <Suspense fallback={<FavoritesBlockLoading />}>
      <FavoritesBlock isLoading={loading} books={books} />;
    </Suspense>
  );
}

export default FavoritesPage;
