import ProductCard from "@/shop_front/components/ProductCard";
import { useProducts } from "@/shop_front/hooks/useProducts";
import { useFavoritesStore } from "@/shop_front/store/favorites.store";
import { useCartStore } from "@/shop_front/store/cart.store";

export const CartPage = () => {
  const { data } = useProducts();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const cartItem = useCartStore((state) => state.cartItems);

  const favoriteProducts =
    data?.products.filter((product) => favoriteIds.includes(product.id)) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-bold text-4xl">Carrito de Compras</h1>
        <div className="w-92 border-t border-border/50 mt-4 sm:mt-5 mb-6 sm:mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <section className="space-y-4">
            <h2 className="font-bold text-2xl">Comprados</h2>

            {cartItem.length > 0 ? (
              <div className="grid gap-4">
                {cartItem.map(({ product }) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <ProductCard product={product} />
                  
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
                Aún no agregaste productos al carrito.
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="font-bold text-2xl">Agregados a favoritos</h2>

            {favoriteProducts.length > 0 ? (
              <div className="grid gap-4">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
                Aún no agregas productos a favoritos. Marca el corazón en un
                producto para que aparezca aquí.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
