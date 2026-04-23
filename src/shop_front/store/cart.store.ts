import type { Product } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
  toggleCart: (product: Product) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product: Product) => {
        const { cartItems } = get();
        const existing = cartItems.find((i) => i.product.id === product.id);

        if (existing) {
          // Si ya existe, solo incrementa la cantidad
          set({
            cartItems: cartItems.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
          return;
        }

        set({ cartItems: [...cartItems, { product, quantity: 1 }] });
      },

      removeFromCart: (productId: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        }));
      },

      isInCart: (productId: string) =>
        get().cartItems.some((i) => i.product.id === productId),

      toggleCart: (product: Product) => {
        const { isInCart, addToCart, removeFromCart } = get();
        if (isInCart(product.id)) {
          removeFromCart(product.id);
        } else {
          addToCart(product);
        }
      },

      clearCart: () => set({ cartItems: [] }),

      getTotalItems: () =>
        get().cartItems.reduce((acc, i) => acc + i.quantity, 0),

      getTotalPrice: () =>
        get().cartItems.reduce(
          (acc, i) => acc + i.product.price * i.quantity,
          0,
        ),
    }),
    {
      name: "cart-store",
    },
  ),
);
