import { AdminTitle } from "@/admin/components/AdminTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Box, DollarSign, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "@/shop_front/actions/get-products-action";
import { formatPrice } from "@/lib/currency-formatter";
import { Loading } from "@/components/Loading";

export const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-products-dashboard", { limit: 100 }],
    queryFn: () => getProductsAction({ limit: 100 }),
  });

  if (isLoading) return <Loading />;

  const products = data?.products || [];
  const totalProducts = data?.count || products.length;

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  const stats = [
    {
      title: "PRODUCTOS",
      value: totalProducts.toString(),
      subtitle: "Total De productos",
      icon: Package,
      color: "text-yellow-500",
    },
    {
      title: "STOCK TOTAL",
      value: totalStock.toString(),
      subtitle: `${totalStock} unidades`,
      icon: Box,
      color: "text-yellow-500",
    },
  ];

  // Últimos 5 productos del array
  const recentProducts = products.slice(0, 5).map(p => ({
    id: p.id,
    name: p.title,
    category: p.gender,
    price: formatPrice(p.price),
    status: p.stock > 0 ? "ACTIVO" : "AGOTADO",
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminTitle name="Andres" subTitle="Vista general"/>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-border bg-card hover:bg-accent/5 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="font-mono text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-green-500">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`rounded-lg bg-secondary/10 p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products Table */}
      <div className="space-y-4">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          PRODUCTOS RECIENTES
        </h2>
        <Card className="border-border bg-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="bg-muted/50">
                    <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                      PRODUCTO
                    </th>
                    <th className="hidden px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:table-cell">
                      CATEGORÍA
                    </th>
                    <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                      PRECIO
                    </th>
                    <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                      ESTADO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-4 font-mono text-sm font-medium text-foreground sm:px-6">
                        <div className="truncate max-w-[200px] sm:max-w-none">{product.name}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">{product.category}</div>
                      </td>
                      <td className="hidden px-6 py-4 font-mono text-sm text-muted-foreground sm:table-cell">
                        {product.category}
                      </td>
                      <td className="px-4 py-4 font-mono text-sm font-semibold text-foreground sm:px-6">
                        {product.price}
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <span
                          className={`inline-flex items-center rounded-sm px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide ${
                            product.status === "ACTIVO"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
