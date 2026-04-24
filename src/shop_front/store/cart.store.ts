import type { Product } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string, size?: string) => boolean;
  toggleCart: (product: Product, quantity?: number, size?: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product: Product, quantity: number = 1, size?: string) => {
        const itemSize = size || product.sizes[0];
        const { cartItems } = get();
        const existing = cartItems.find((i) => i.product.id === product.id && i.size === itemSize);

        if (existing) {
          set({
            cartItems: cartItems.map((i) =>
              i.product.id === product.id && i.size === itemSize
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
          return;
        }

        set({ cartItems: [...cartItems, { product, quantity, size: itemSize }] });
      },

      removeFromCart: (productId: string, size: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (i) => i.product.id !== productId || i.size !== size
          ),
        })),

      updateQuantity: (productId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.product.id === productId && i.size === size ? { ...i, quantity } : i,
          ),
        }));
      },

      isInCart: (productId: string, size?: string) => {
        return get().cartItems.some((i) => {
          if (size) return i.product.id === productId && i.size === size;
          return i.product.id === productId;
        });
      },

      toggleCart: (product: Product, quantity: number = 1, size?: string) => {
        const itemSize = size || product.sizes[0];
        const { isInCart, addToCart, removeFromCart } = get();
        if (isInCart(product.id, itemSize)) {
          removeFromCart(product.id, itemSize);
        } else {
          addToCart(product, quantity, itemSize);
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
