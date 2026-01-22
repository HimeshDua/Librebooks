'use client';
import {getFavoriteBooks} from '@/lib/library/books/favorites/actions/getFavorites';
import FavoritesBlockLoading from '@/components/favoritism/favorites-block-loading';
import FavoritesBlock from '@/components/favoritism/favoritesBlock';
import {Suspense, useEffect, useState} from 'react';
import type {Book} from '@/types/book';
import {useFavorite} from '@/store';

function FavoritesPage() {
  const [books, setbooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const favorites = useFavorite(f => f.favoritesArray);
  useEffect(() => {
    const init = async () => {
      const transformedSet = Array.from(favorites);
      const {books: data} = await getFavoriteBooks({favorites: transformedSet});
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
