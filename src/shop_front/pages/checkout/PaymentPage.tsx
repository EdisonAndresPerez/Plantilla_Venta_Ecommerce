import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntentAction } from "@/shop_front/actions/create-payment-intent.action";
import { confirmPaymentAction } from "@/shop_front/actions/confirm-payment.action";
import { getOrderByIdAction } from "@/shop_front/actions/get-orders.action";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/currency-formatter";
import {
  CreditCard,
  ArrowLeft,
  Lock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import type { Order } from "@/interfaces/order.interface";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
);

const PaymentForm = ({ order }: { order: Order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [elementReady, setElementReady] = useState(false);
  const paidRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message ?? "Error al procesar el pago");
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded" && !paidRef.current) {
      paidRef.current = true;
      try {
        await confirmPaymentAction(paymentIntent.id);
        navigate(`/order/${order.id}?success=true`);
      } catch {
        navigate(`/order/${order.id}?success=true`);
      }
      return;
    }

    if (paymentIntent && paymentIntent.status === "requires_action") {
      setError("Se requiere autenticación adicional. Revisa tu banco.");
      setProcessing(false);
      return;
    }

    navigate(`/order/${order.id}?success=true`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
          <CreditCard className="h-4 w-4 text-primary" />
          Tarjeta de crédito/débito
        </h2>
        <div className={!elementReady ? "min-h-[200px] flex items-center justify-center" : ""}>
          {!elementReady && (
            <div className="text-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Cargando formulario de pago...</p>
            </div>
          )}
          <div className={elementReady ? "" : "hidden"}>
            <PaymentElement
              onReady={() => setElementReady(true)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border/50 bg-muted/20 p-4 flex items-center gap-3 text-xs text-muted-foreground">
        <Lock className="h-4 w-4 flex-shrink-0" />
        <span>
          Tus datos de pago están seguros con Stripe. No almacenamos información
          de tarjetas.
        </span>
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || !elementReady || processing}
        className="cursor-pointer w-full rounded-full h-12 bg-primary hover:bg-primary/90 font-semibold gap-2 text-base disabled:opacity-50"
      >
        {processing ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            Procesando pago...
          </>
        ) : (
          <>
            Pagar {formatPrice(order.total)}
            <ShieldCheck className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export const PaymentPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(
    location.state?.order ?? null,
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(!order);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const initCalled = useRef(false);

  useEffect(() => {
    if (!orderId || initCalled.current) return;
    initCalled.current = true;

    const initPayment = async (id: string) => {
      try {
        if (!order) {
          const fetchedOrder = await getOrderByIdAction(id);
          setOrder(fetchedOrder);
        }

        const { clientSecret } = await createPaymentIntentAction(id);
        setClientSecret(clientSecret);
      } catch (error: any) {
        const msg = error?.response?.data?.message || "Error al procesar el pago. Intenta de nuevo.";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    initPayment(orderId);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Preparando tu pago...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-4">Orden no encontrada</p>
          <Button
            className="rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Error de pago</h2>
          <p className="text-muted-foreground mb-2">
            {errorMsg || "No se pudo iniciar el pago. Intenta de nuevo."}
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Si el problema persiste, contacta al soporte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="rounded-full cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              Volver al carrito
            </Button>
            <Button
              variant="outline"
              className="rounded-full cursor-pointer"
              onClick={() => navigate("/orders")}
            >
              Mis órdenes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-3xl mx-auto px-4 py-6 sm:py-8">
        <button
          onClick={() => navigate("/checkout")}
          className="cursor-pointer flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al checkout
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">Pago seguro</h1>
            <p className="text-sm text-muted-foreground">
              Completa el pago para confirmar tu orden
            </p>
          </div>
        </div>
        <div className="w-full border-t border-border/50 mt-4 mb-6 sm:mb-8" />

        <div className="rounded-xl border border-border bg-card p-5 sm:p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Resumen de la orden</h2>
          <div className="space-y-2 text-sm">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-muted-foreground"
              >
                <span>
                  {item.productTitle} ({item.size}) x{item.quantity}
                </span>
                <span>{formatPrice(item.productPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>

        <Elements
          key={clientSecret}
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
        >
          <PaymentForm order={order} />
        </Elements>
      </main>
    </div>
  );
};
