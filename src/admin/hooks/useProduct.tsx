import { getProductById } from "@/shop_front/actions/get-product-by-id";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import type { Product } from "@/interfaces/product.interface";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      //invalidar cache del producto para que se vuelva a cargar con los datos actualizados
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", { id }] });

      //Actualiza la lista de productos: el nuevo primero
      queryClient.setQueryData(["products"], (old: Product[] = []) => [
        product,
        ...old.filter((p) => p.id !== product.id), // Evita duplicados si es edición
      ]);
      
      //actualizar cache de la lista de productos para que se actualice el producto editado o se añada el nuevo producto
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });

  return {
    ...query,
    mutation,
  };
};
