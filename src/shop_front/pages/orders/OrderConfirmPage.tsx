import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderByIdAction } from "@/shop_front/actions/get-orders.action";
import { formatPrice } from "@/lib/currency-formatter";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Package,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  Clock,
} from "lucide-react";
import type { Order } from "@/interfaces/order.interface";

export const OrderConfirmPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const checkOrder = async () => {
      try {
        const data = await getOrderByIdAction(orderId);
        setOrder(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    checkOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando tu orden...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
          <h2 className="text-xl font-bold mb-2">Orden no encontrada</h2>
          <Button
            className="rounded-full cursor-pointer mt-4"
            onClick={() => navigate("/orders")}
          >
            Mis órdenes
          </Button>
        </div>
      </div>
    );
  }

  const isPaid = order.paid;

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-3xl mx-auto px-4 py-6 sm:py-12">
        {/* Success header */}
        <div className="text-center mb-8">
          <div
            className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isPaid
                ? "bg-green-100 dark:bg-green-500/10"
                : "bg-yellow-100 dark:bg-yellow-500/10"
            }`}
          >
            {isPaid ? (
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            ) : (
              <Clock className="h-8 w-8 text-yellow-600" />
            )}
          </div>
          <h1 className="font-bold text-2xl sm:text-3xl mb-2">
            {isPaid
              ? "¡Pago confirmado!"
              : "Pago pendiente"}
          </h1>
          <p className="text-muted-foreground">
            {isPaid
              ? "Tu orden ha sido procesada exitosamente."
              : "Estamos esperando la confirmación del pago."}
          </p>
        </div>

        {/* Order details */}
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Detalles de la orden
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
              #{order.id.slice(0, 8)}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
              >
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.productTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Talla: {item.size} | Cantidad: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {formatPrice(item.productPrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Dirección de envío
            </h3>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress}, {order.shippingCity},{" "}
              {order.shippingState}, {order.shippingZip},{" "}
              {order.shippingCountry}
            </p>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(order.total)}
            </span>
          </div>

          {/* Status */}
          <div className="border-t border-border pt-4 flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Estado:</span>
            <span
              className={`font-medium ${
                isPaid ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {isPaid ? "Pagado" : "Pendiente de pago"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            className="flex-1 rounded-full cursor-pointer h-11 button-gradient font-semibold gap-2"
            onClick={() => navigate("/orders")}
          >
            Ver todas mis órdenes
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-full cursor-pointer h-11"
            onClick={() => navigate("/")}
          >
            Seguir comprando
          </Button>
        </div>
      </main>
    </div>
  );
};
