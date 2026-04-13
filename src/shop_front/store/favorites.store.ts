import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (productId: string) => {
        const { favoriteIds } = get();
        const alreadyFavorite = favoriteIds.includes(productId);

        if (alreadyFavorite) {
          set({ favoriteIds: favoriteIds.filter((id) => id !== productId) });
          return;
        }

        set({ favoriteIds: [...favoriteIds, productId] });
      },
      isFavorite: (productId: string) => get().favoriteIds.includes(productId),
    }),
    {
      name: "favorites-store",
    },
  ),
);