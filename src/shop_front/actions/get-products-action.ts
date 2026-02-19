import { tesloApi } from "@/api/tesloApi";
import type { Products } from "@/interfaces/products.response";

interface Options {
  limit?: number | string | undefined;
  offset?: number | string | undefined;
  sizes?: string | undefined;
  gender?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  search?: string;
}

export const getProductsAction = async (options: Options) => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, search } = options;

  const { data } = await tesloApi.get<Products>("/products", {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q: search,
    },
  });

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
