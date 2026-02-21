import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

export const getProductById = async (id: string) => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${id}`);

    // Mapear las imágenes con la URL completa
    const productWithImagesUrl = {
      ...data,
      images: data.images.map(
        (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
      ),
    };

    return productWithImagesUrl;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw new Error("No se pudo cargar el producto");
  }
};
