import { useStoreAuth } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/interfaces/product.interface";
import { formatPrice } from "@/lib/currency-formatter";
import { ShoppingBag, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "@/shop_front/store/favorites.store";
import { useCartStore } from "@/shop_front/store/cart.store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { user } = useStoreAuth();
  const navigate = useNavigate();
  const isLiked = useFavoritesStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  // Mapeo de categorías/géneros a español
  const categoryMap: Record<string, string> = {
    women: "Mujer",
    men: "Hombre",
    kid: "Niño",
    unisex: "Unisex",
    // Si vienen tipos de producto en español
    camisetas: "Camisetas",
    sudaderas: "Sudaderas",
    chaquetas: "Chaquetas",
    accesorios: "Accesorios",
  };

  const categoryFormatted =
    categoryMap[product.gender.toLowerCase()] || product.gender;

  return (
    <Card
      className="group border-0 product-card-hover cursor-pointer card-gradient rounded-xl sm:rounded-2xl overflow-hidden"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Like button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`cursor-pointer absolute top-3 sm:top-4 right-3 sm:right-4 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked
                ? "bg-primary text-white scale-110"
                : "bg-white/90 text-foreground hover:bg-primary hover:text-white"
            } shadow-lg`}
          >
            <Heart
              className={`h-4 sm:h-5 w-4 sm:w-5 ${isLiked ? "fill-current" : ""}`}
            />
          </button>

          {/* Category badge */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-500 text-black shadow-lg">
              {categoryFormatted} | {product.sizes.join(", ")}
            </span>
          </div>

          {/* Quick add button */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <Button
              disabled={!user}
              onClick={(e) => {
                e.stopPropagation();
                toggleCart(product); // 👈
              }}
              className={`cursor-pointer w-full rounded-full h-10 sm:h-12 text-xs sm:text-sm font-semibold gap-2 ${
                isInCart ? "bg-red-500 hover:bg-red-600" : "button-gradient" // rojo para quitar
              }`}
            >
              <ShoppingBag className="h-3 sm:h-4 w-3 sm:w-4" />
              <span className="hidden sm:inline">
                {!user
                  ? "Inicia sesión para comprar"
                  : isInCart
                    ? "Quitar del carrito"
                    : "Agregar al carrito"}
              </span>
              <span className="sm:hidden">
                {!user ? "Login" : isInCart ? "✗" : "Agregar"}
              </span>
            </Button>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2">
          <h3 className="font-semibold text-sm sm:text-base tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-2xl font-bold text-gradient">
              {formatPrice(product.price)}
            </p>
            <div className="flex gap-1">
              {["bg-foreground", "bg-muted-foreground", "bg-primary"].map(
                (color, i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full ${color} border-2 border-white shadow-sm cursor-pointer hover:scale-125 transition-transform`}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
