import { useSearchParams } from "react-router";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Getters - leer valores actuales
  const currentsizes = searchParams.get("sizes")?.split(",").filter(Boolean) || [];
  const currentPrice = searchParams.get("price") || "any";
  const currentSearch = searchParams.get("search") || "";

  // Toggle de tallas
  const toggleSize = (sizeId: string) => {
    const newSizes = currentsizes.includes(sizeId)
      ? currentsizes.filter((s) => s !== sizeId)
      : [...currentsizes, sizeId];
    
    // Purgar búsqueda
    searchParams.delete("search");
    
    if (newSizes.length > 0) {
      searchParams.set("sizes", newSizes.join(","));
    } else {
      searchParams.delete("sizes");
    }
    setSearchParams(searchParams);
  };

  // Setear precio
  const setPrice = (newPrice: string) => {
    // Purgar búsqueda
    searchParams.delete("search");
    searchParams.set("price", newPrice);
    setSearchParams(searchParams);
  };

  // Setear búsqueda y PURGAR otros filtros
  const setSearch = (newSearch: string) => {
    // Crear nuevos searchParams limpios
    const newParams = new URLSearchParams();
    
    if (newSearch.trim()) {
      newParams.set("search", newSearch.trim());
    }
    
    // Setear los nuevos params (esto elimina sizes y price)
    setSearchParams(newParams);
  };

  // Limpiar búsqueda (volver a filtros)
  const clearSearch = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return {
    currentsizes,
    currentPrice,
    currentSearch,
    toggleSize,
    setPrice,
    setSearch,
    clearSearch,
  };
};
