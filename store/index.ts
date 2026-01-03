import {create} from 'zustand';

type FavoritesStore = {
  favorites: Set<number>;
  setAll: (ids: number[]) => void;
  toggle: (id: number) => void;
};

export const useFavorite = create<FavoritesStore>(sets => ({
  favorites: new Set(),
  setAll: ids => sets({favorites: new Set(ids)}),
  toggle: id =>
    sets(state => {
      const next = new Set(state.favorites);
      next.has(id) ? next.delete(id) : next.add(id);
      return {favorites: next};
    }),
}));
