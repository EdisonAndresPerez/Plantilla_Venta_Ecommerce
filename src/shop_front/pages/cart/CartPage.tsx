import { useProducts } from "@/shop_front/hooks/useProducts";
import { useFavoritesStore } from "@/shop_front/store/favorites.store";
import { useCartStore } from "@/shop_front/store/cart.store";
import { formatPrice } from "@/lib/currency-formatter";
import { Heart, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/interfaces/product.interface";

/* ─── Compact Cart Item Card ─── */
const CartItemCard = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => {
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const navigate = useNavigate();

  return (
    <div className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
      {/* Thumbnail */}
      <div
        className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-semibold text-sm sm:text-base leading-tight truncate cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Tallas: {product.sizes.join(", ")}
        </p>
        <p className="text-sm sm:text-base font-bold text-gradient mt-1">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="cursor-pointer h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="cursor-pointer h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Subtotal + Delete */}
      <div className="flex flex-col items-end gap-1 ml-1 sm:ml-2">
        <span className="text-sm sm:text-base font-bold whitespace-nowrap">
          {formatPrice(product.price * quantity)}
        </span>
        <button
          onClick={() => removeFromCart(product.id)}
          className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors p-1"
          title="Eliminar"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

/* ─── Compact Favorite Item ─── */
const FavoriteItemCard = ({ product }: { product: Product }) => {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const isInCart = useCartStore((s) => s.isInCart(product.id));
  const navigate = useNavigate();

  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
      {/* Thumbnail */}
      <div
        className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-semibold text-sm leading-tight truncate cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.title}
        </h3>
        <p className="text-sm font-bold text-gradient mt-0.5">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => toggleCart(product)}
          className={`cursor-pointer h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isInCart
              ? "bg-primary text-white"
              : "border border-border hover:bg-primary hover:text-white hover:border-primary"
          }`}
          title={isInCart ? "Quitar del carrito" : "Agregar al carrito"}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="cursor-pointer h-8 w-8 rounded-full flex items-center justify-center text-red-500 border border-border hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
          title="Quitar de favoritos"
        >
          <Heart className="h-3.5 w-3.5 fill-current" />
        </button>
      </div>
    </div>
  );
};

/* ─── Main Cart Page ─── */
export const CartPage = () => {
  const { data } = useProducts();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const favoriteProducts =
    data?.products.filter((product) => favoriteIds.includes(product.id)) ?? [];

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl button-gradient flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">Carrito de Compras</h1>
            <p className="text-sm text-muted-foreground">
              {totalItems > 0
                ? `${totalItems} ${totalItems === 1 ? "producto" : "productos"} en tu carrito`
                : "Tu carrito está vacío"}
            </p>
          </div>
        </div>
        <div className="w-full border-t border-border/50 mt-4 mb-6 sm:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ─── Left Column: Cart Items + Favorites ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Productos en el carrito
                </h2>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="cursor-pointer text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Vaciar carrito
                  </button>
                )}
              </div>

              {cartItems.length > 0 ? (
                <div className="space-y-2">
                  {cartItems.map(({ product, quantity }) => (
                    <CartItemCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
                  <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Aún no agregaste productos al carrito.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 rounded-full text-xs cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Explorar productos
                  </Button>
                </div>
              )}
            </section>

            {/* Favorites */}
            <section>
              <h2 className="font-bold text-lg flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Favoritos
                {favoriteProducts.length > 0 && (
                  <span className="text-xs font-normal text-muted-foreground">
                    ({favoriteProducts.length})
                  </span>
                )}
              </h2>

              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {favoriteProducts.map((product) => (
                    <FavoriteItemCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center">
                  <Heart className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Marca el corazón en un producto para que aparezca aquí.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* ─── Right Column: Order Summary ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
                <h2 className="font-bold text-lg">Resumen del pedido</h2>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} productos)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="border-t border-border pt-2.5">
                    <div className="flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span className="text-gradient">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  disabled={cartItems.length === 0}
                  className="cursor-pointer w-full rounded-full h-11 button-gradient font-semibold gap-2 text-sm"
                >
                  Proceder al pago
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="cursor-pointer w-full rounded-full h-10 text-sm font-medium"
                  onClick={() => navigate("/")}
                >
                  Seguir comprando
                </Button>
              </div>

              {/* Trust badges */}
              <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-green-500">✓</span>
                  Envío gratis en todos los pedidos
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-green-500">✓</span>
                  Devoluciones gratuitas en 30 días
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-green-500">✓</span>
                  Pago 100% seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
