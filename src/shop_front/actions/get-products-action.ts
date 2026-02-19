import { tesloApi } from "@/api/tesloApi";
import type { Products } from "@/interfaces/products.response";



export const getProductsAction = async () => {
  const { data } = await tesloApi.get<Products>("/products");
  console.log(data)

  return data;
};
