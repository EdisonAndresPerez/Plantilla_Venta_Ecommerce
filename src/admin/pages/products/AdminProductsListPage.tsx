import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/shop_front/hooks/useProducts";
import { Loading } from "@/components/Loading";
import { formatPrice } from "@/lib/currency-formatter";

// Mapeo de categorías
const categoryMap: Record<string, string> = {
  camisetas: "Camisetas",
  sudaderas: "Sudaderas",
  chaquetas: "Chaquetas",
  accesorios: "Accesorios",
};

// Función para calcular el estado basado en el stock
const getProductStatus = (stock: number) => {
  if (stock === 0) return "AGOTADO";
  if (stock < 10) return "STOCK BAJO";
  return "ACTIVO";
};

export const AdminProductsListPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useProducts();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    const query = inputRef.current?.value;

    if (!query) {
      navigate("/admin/products");
      return;
    }
    navigate(`/admin/products?search=${query}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  // Mapeo de productos de la API
  const apiProducts = data?.products || [];

  const filteredProducts = apiProducts
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((product) => ({
      id: product.id,
      name: product.title,
      slug: product.slug,
      category: categoryMap[product.gender] || product.gender,
      price: product.price,
      stock: product.stock,
      sizes:
        product.sizes.length > 3
          ? [...product.sizes.slice(0, 3), `+${product.sizes.length - 3}`]
          : product.sizes,
      status: getProductStatus(product.stock),
      image: product.images[0] || "",
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-foreground sm:text-3xl">
            PRODUCTOS
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {filteredProducts.length} productos en catálogo
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/products/new")}
          className="gap-2 bg-yellow-500 font-mono font-semibold uppercase tracking-wide text-black hover:bg-yellow-600"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nuevo Producto</span>
          <span className="sm:hidden">Nuevo</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          ref={inputRef}
          onKeyDown={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-border bg-card pl-10 font-mono text-sm"
        />

      </div>

      {/* Products Table */}
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="bg-muted/50">
                  <th className="hidden w-20 px-4 py-4 sm:table-cell sm:px-6">
                    <span className="sr-only">IMAGEN</span>
                  </th>
                  <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    PRODUCTO
                  </th>
                  <th className="hidden px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground md:table-cell">
                    CATEGORÍA
                  </th>
                  <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    PRECIO
                  </th>
                  <th className="hidden px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground lg:table-cell">
                    STOCK
                  </th>
                  <th className="hidden px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground xl:table-cell">
                    TALLAS
                  </th>
                  <th className="px-4 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
                    ESTADO
                  </th>
                  <th className="hidden px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:table-cell">
                    ACCIONES
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover border-2 border-border"
                      />
                    </td>
                    <td className="px-4 py-4 font-mono text-sm font-medium text-foreground sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover border-2 border-border sm:hidden"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate max-w-[150px] sm:max-w-[200px] lg:max-w-none underline">
                            <Link
                              to={`/admin/products/${product.id}`}
                              className="text-foreground transition-colors duration-200 hover:text-blue-500 cursor-pointer"
                            >
                              {product.name}
                            </Link>
                          </div>
                          <div className="flex flex-wrap gap-1 text-xs text-muted-foreground md:hidden mt-1">
                            <span>{product.category}</span>
                            <span className="lg:hidden">
                              • Stock: {product.stock}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 font-mono text-sm text-muted-foreground md:table-cell">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 font-mono text-sm font-semibold text-foreground sm:px-6">
                      {formatPrice(product.price)}
                    </td>
                    <td className="hidden px-6 py-4 font-mono text-sm text-foreground lg:table-cell">
                      {product.stock}
                    </td>
                    <td className="hidden px-6 py-4 xl:table-cell">
                      <div className="flex gap-1">
                        {product.sizes.map((size, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center justify-center rounded-sm bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span
                        className={`inline-flex items-center rounded-sm px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide ${
                          product.status === "ACTIVO"
                            ? "bg-green-500/10 text-green-500"
                            : product.status === "AGOTADO"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            navigate(`/admin/products/${product.slug}`)
                          }
                          className="h-8 w-8 hover:bg-muted hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <CustomPagination totalPages={data?.pages || 0} />
    </div>
  );
};
