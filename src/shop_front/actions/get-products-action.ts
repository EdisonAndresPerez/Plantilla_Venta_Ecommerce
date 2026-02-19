import { tesloApi } from "@/api/tesloApi";
import type { Products } from "@/interfaces/products.response";

export const getProductsAction = async () => {
  const { data } = await tesloApi.get<Products>("/products");
  console.log(data);

  const productsWithImagesUrl = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return {
    ...data,
    products: productsWithImagesUrl,
  }
};
