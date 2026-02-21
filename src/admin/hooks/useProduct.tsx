import { getProductById } from "@/shop_front/actions/get-product-by-slug";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id && id !== "new", // Solo cargar si hay un ID válido y no es "new"
  });

  return {
    ...query,
  };
};
