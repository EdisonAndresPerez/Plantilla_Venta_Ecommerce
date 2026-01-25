import { useSearchParams } from "react-router";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getters - leer valores actuales
  const currentsizes =
    searchParams.get("sizes")?.split(",").filter(Boolean) || [];
  const currentPrice = searchParams.get("price") || "any";
  const currentSearch = searchParams.get("search") || "";

  // Setters - funciones para actualizar
  const setSizes = (newSizes: string[]) => {
    if (newSizes.length > 0) {
      searchParams.set("sizes", newSizes.join(","));
    } else {
      searchParams.delete("sizes");
    }
    setSearchParams(searchParams);
  };

  const setPrice = (newPrice: string) => {
    searchParams.set("price", newPrice);
    setSearchParams(searchParams);
  };

  const setSearch = (newSearch: string) => {
    if (newSearch) {
      searchParams.set("search", newSearch);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  // Helper para toggle de tallas
  const toggleSize = (sizeId: string) => {
    const newSizes = currentsizes.includes(sizeId)
      ? currentsizes.filter((s) => s !== sizeId)
      : [...currentsizes, sizeId];
    setSizes(newSizes);
  };

  return {
    currentsizes,
    currentPrice,
    currentSearch,
    setSizes,
    setPrice,
    setSearch,
    toggleSize,
  };
};
