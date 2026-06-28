import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/shop_front/store/cart.store";
import { formatPrice } from "@/lib/currency-formatter";
import { createOrderAction } from "@/shop_front/actions/create-order.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingBag,
  MapPin,
  Truck,
  CreditCard,
  ArrowLeft,
  Package,
} from "lucide-react";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((s) => s.cartItems);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const clearCart = useCartStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
          <h2 className="text-xl font-bold mb-2">Tu carrito está vacío</h2>
          <Button
            className="rounded-full cursor-pointer mt-4"
            onClick={() => navigate("/")}
          >
            Explorar productos
          </Button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await createOrderAction({
        items: cartItems.map((item) => ({
          productId: item.product.id,
          productTitle: item.product.title,
          productPrice: item.product.price,
          productImage: item.product.images[0],
          size: item.size,
          quantity: item.quantity,
        })),
        total: getTotalPrice(),
        totalItems: getTotalItems(),
        ...form,
      });

      clearCart();
      navigate(`/payment/${order.id}`, { state: { order } });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <button
          onClick={() => navigate("/cart")}
          className="cursor-pointer flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">Checkout</h1>
            <p className="text-sm text-muted-foreground">
              Completa tus datos de envío para continuar
            </p>
          </div>
        </div>
        <div className="w-full border-t border-border/50 mt-4 mb-6 sm:mb-8" />

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Shipping Form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  Dirección de envío
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shippingAddress">Dirección</Label>
                    <Input
                      id="shippingAddress"
                      name="shippingAddress"
                      placeholder="Calle y número"
                      value={form.shippingAddress}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">Ciudad</Label>
                      <Input
                        id="shippingCity"
                        name="shippingCity"
                        placeholder="Ciudad"
                        value={form.shippingCity}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingState">Estado/Provincia</Label>
                      <Input
                        id="shippingState"
                        name="shippingState"
                        placeholder="Estado"
                        value={form.shippingState}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingZip">Código Postal</Label>
                      <Input
                        id="shippingZip"
                        name="shippingZip"
                        placeholder="C.P."
                        value={form.shippingZip}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingCountry">País</Label>
                      <Input
                        id="shippingCountry"
                        name="shippingCountry"
                        placeholder="País"
                        value={form.shippingCountry}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary for mobile */}
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 lg:hidden">
                <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <Package className="h-4 w-4 text-primary" />
                  Resumen del pedido
                </h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Talla: {item.size} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Resumen
                  </h2>

                  <div className="space-y-2.5 text-sm">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span className="truncate max-w-[180px]">
                          {item.product.title} ({item.size}) x{item.quantity}
                        </span>
                        <span>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal ({getTotalItems()} productos)</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Envío</span>
                      <span className="text-green-600 font-medium">Gratis</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-1">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full rounded-full h-11 bg-primary hover:bg-primary/90 font-semibold gap-2 text-sm"
                  >
                    {loading ? (
                      "Procesando..."
                    ) : (
                      <>
                        Ir a pagar
                        <CreditCard className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

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
                    Pago 100% seguro con Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
