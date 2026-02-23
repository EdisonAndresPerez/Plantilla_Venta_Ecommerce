import { getProductById } from "@/shop_front/actions/get-product-by-slug";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import type { Product } from "@/interfaces/product.interface";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      console.log("Producto creado/actualizado exitosamente", product);
    },
  });

  return {
    ...query,
    mutation,
  };
};
