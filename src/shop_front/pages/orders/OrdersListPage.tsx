import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOrdersAction } from "@/shop_front/actions/get-orders.action";
import { deleteOrderAction } from "@/shop_front/actions/delete-order.action";
import { formatPrice } from "@/lib/currency-formatter";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
} from "lucide-react";

const statusIcon: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  pending: <Clock className="h-4 w-4 text-yellow-600" />,
  cancelled: <XCircle className="h-4 w-4 text-red-600" />,
};

const statusColor: Record<string, string> = {
  confirmed: "text-green-600 bg-green-100 dark:bg-green-500/10",
  pending: "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/10",
  cancelled: "text-red-600 bg-red-100 dark:bg-red-500/10",
};

export const OrdersListPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersAction,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-xl button-gradient flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">Mis órdenes</h1>
            <p className="text-sm text-muted-foreground">
              Historial de tus compras realizadas
            </p>
          </div>
        </div>
        <div className="w-full border-t border-border/50 mt-4 mb-6 sm:mb-8" />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando órdenes...</p>
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/20 p-12 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-lg font-bold mb-2">
              No tienes órdenes aún
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Cuando realices tu primera compra, aparecerá aquí.
            </p>
            <Button
              className="rounded-full cursor-pointer"
              onClick={() => navigate("/")}
            >
              Explorar productos
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("¿Eliminar esta orden?")) {
                      deleteMutation.mutate(order.id);
                    }
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-muted-foreground hover:text-red-600"
                  title="Eliminar orden"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {statusIcon[order.status] ?? <Clock className="h-4 w-4" />}
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        statusColor[order.status] ?? ""
                      }`}
                    >
                      {order.status === "confirmed"
                        ? "Confirmada"
                        : order.status === "cancelled"
                          ? "Cancelada"
                          : "Pendiente"}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.productImage}
                        alt={item.productTitle}
                        className="h-10 w-10 rounded-lg border-2 border-background object-cover"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="h-10 w-10 rounded-lg border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {order.items.length === 1
                        ? order.items[0].productTitle
                        : `${order.items[0].productTitle} y ${
                            order.items.length - 1
                          } más`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.totalItems}{" "}
                      {order.totalItems === 1 ? "producto" : "productos"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.paid ? "Pagado" : "No pagado"}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
