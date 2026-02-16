import { Button } from "@/components/ui/button";
import type { Product } from "@/mock/products.mock";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import { useSearchParams } from "react-router";
import { useState } from "react";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {


    const [showFilters, setShowFilters] =  useState(false);


    const [searchParams, setSearchParams] = useSearchParams();

    //cambiar el estado de la vista
    const viewMode = searchParams.get("view") || "grid";



    const handleViewModeChange = (mode: string) => {
      searchParams.set("view", mode)
      setSearchParams(searchParams);
    }


  return (
    <>
      <section id="products-section" className="py-8 sm:py-10 md:py-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-2 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                <span className="text-gradient">Productos</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary flex-1 sm:flex-none"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              <div className="hidden md:flex rounded-full border-2 overflow-hidden flex-1 sm:flex-none justify-end">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewModeChange("grid")}
                  className={`rounded-none ${
                    viewMode === "grid" ? "button-gradient" : ""
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewModeChange("list")}
                  className={`rounded-none ${
                    viewMode === "list" ? "button-gradient" : ""
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block">
              <ProductFilter />
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-4 lg:hidden overflow-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gradient">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewModeChange("grid")}
                    className="rounded-full hover:bg-primary/10"
                  >
                    Cerrar
                  </Button>
                </div>
                <ProductFilter />
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
