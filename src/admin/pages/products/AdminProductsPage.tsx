import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "TACTICAL CARGO PANTS",
    category: "Pantalones",
    price: "$89.99",
    stock: 24,
    sizes: ["S", "M", "L", "+1"],
    status: "ACTIVO",
  },
  {
    id: 2,
    name: "URBAN BOMBER JACKET",
    category: "Chaquetas",
    price: "$159.99",
    stock: 12,
    sizes: ["M", "L", "XL"],
    status: "ACTIVO",
  },
  {
    id: 3,
    name: "STEALTH HOODIE",
    category: "Hoodies",
    price: "$74.99",
    stock: 0,
    sizes: ["S", "M", "L"],
    status: "AGOTADO",
  },
  {
    id: 4,
    name: "MIDNIGHT TEE",
    category: "Camisetas",
    price: "$34.99",
    stock: 56,
    sizes: ["XS", "S", "M", "+3"],
    status: "ACTIVO",
  },
  {
    id: 5,
    name: "COMBAT BOOTS",
    category: "Calzado",
    price: "$199.99",
    stock: 8,
    sizes: ["40", "41", "42", "+2"],
    status: "ACTIVO",
  },
  {
    id: 6,
    name: "RESISTANCE VEST",
    category: "Chaquetas",
    price: "$129.99",
    stock: 3,
    sizes: ["M", "L"],
    status: "STOCK BAJO",
  },
];

export const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button className="gap-2 bg-yellow-500 font-mono font-semibold uppercase tracking-wide text-black hover:bg-yellow-600">
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
                    <td className="px-4 py-4 font-mono text-sm font-medium text-foreground sm:px-6">
                      <div className="truncate max-w-[150px] sm:max-w-[200px] lg:max-w-none">{product.name}</div>
                      <div className="flex flex-wrap gap-1 text-xs text-muted-foreground md:hidden mt-1">
                        <span>{product.category}</span>
                        <span className="lg:hidden">• Stock: {product.stock}</span>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 font-mono text-sm text-muted-foreground md:table-cell">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 font-mono text-sm font-semibold text-foreground sm:px-6">
                      {product.price}
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
    </div>
  );
};
