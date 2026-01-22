'use client';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type FavoritesStore = {
  favorites: Set<number>;
  favoritesArray: number[];
  setAll: (ids: number[]) => void;
  toggle: (id: number) => void;
};

export const useFavorite = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: new Set<number>(),
      favoritesArray: [],

      setAll: ids => set({favorites: new Set(ids), favoritesArray: ids}),
      toggle: id => {
        const next = new Set(get().favorites);
        next.has(id) ? next.delete(id) : next.add(id);

        set({
          favorites: next,
          favoritesArray: Array.from(next),
        });
      },
    }),
    {
      name: 'favorites-list',
      partialize: state => ({favoritesArray: state.favoritesArray}),
      onRehydrateStorage: () => state => {
        if (!state) return;
        state.favorites = new Set(state.favoritesArray);
      },
    }
  )
);

export type ViewModes = 'GRID' | 'COMPACT';
type ViewModeStore = {
  mode: ViewModes;
  setMode: (mode: ViewModes) => void;
};

export const useViewMode = create<ViewModeStore>()(
  persist(
    set => ({
      mode: 'GRID',
      setMode: mode => set({mode}),
    }),
    {name: 'view-mode'}
  )
);
