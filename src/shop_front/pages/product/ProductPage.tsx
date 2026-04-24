import { getProductById } from "@/shop_front/actions/get-product-by-id";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { formatPrice } from "@/lib/currency-formatter";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFavoritesStore } from "@/shop_front/store/favorites.store";
import { useCartStore } from "@/shop_front/store/cart.store";
import { useStoreAuth } from "@/auth/store/auth.store";

export const ProductPage = () => {
  const { idSlug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", { id: idSlug }],
    queryFn: () => getProductById(idSlug || ""),
    retry: false,
  });

  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(product?.id ?? ""),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const { user } = useStoreAuth();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const isInCart = useCartStore((state) => state.isInCart(product?.id ?? ""));

  if (!idSlug) return <Navigate to="/" replace />;
  if (isLoading) return <Loading />;
  if (isError || !product) return <Navigate to="/" replace />;

  const activeImage = selectedImage || product.images[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>
          <h1 className="font-semibold text-lg tracking-tight">
            Detalles del producto
          </h1>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-border bg-muted/20 aspect-square">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-lg overflow-hidden border transition ${
                    activeImage === image
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-semibold tracking-wide">
                {product.gender} | {product.sizes.slice(0, 2).join(", ")}
              </span>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                {product.title}
              </h2>
              <p className="mt-3 text-3xl font-bold">
                {formatPrice(product.price)}
              </p>
            </div>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isFavorite
                  ? "bg-primary text-white"
                  : "border border-border bg-background hover:bg-muted"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div>
              <p className="text-sm font-semibold mb-3">Tallas disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center px-3 py-1 rounded-md border border-border text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Cantidad</p>
              <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-lg hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-5 py-2.5 text-sm font-semibold min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-lg hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              disabled={!user}
              onClick={() => {
                toggleCart(product);
              }}
              className={`h-12 rounded-xl text-sm font-semibold gap-2 ${
                isInCart ? "bg-red-500 hover:bg-red-600" : ""
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {!user
                ? "Inicia sesión para comprar"
                : isInCart
                  ? "Quitar del carrito"
                  : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
