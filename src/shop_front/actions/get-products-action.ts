import { tesloApi } from "@/api/tesloApi";

export const getProductsAction = async () => {
  const { data } = await tesloApi.get("/products");

  return data;
};
