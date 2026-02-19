import { tesloApi } from "@/api/tesloApi";
import type { Products } from "@/interfaces/products.response";

interface Options {
  limit?: number | string | undefined;
  offset?: number | string | undefined;
}

export const getProductsAction = async (options: Options) => {
  const { limit, offset } = options;

  const { data } = await tesloApi.get<Products>("/products", {
    params: {
      limit,
      offset,
    },
  });
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
  };
};
