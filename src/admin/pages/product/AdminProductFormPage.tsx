import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";
import { useProduct } from "@/admin/hooks/useProduct";
import { AdminProductForm } from "./ui/AdminProductForm";
import type { Product } from "@/interfaces/product.interface";

const emptyProduct: Product = {
  id: "",
  title: "",
  price: 0,
  description: "",
  slug: "",
  stock: 0,
  sizes: [],
  gender: "camisetas",
  tags: [],
  images: [],
  user: { id: "", email: "", fullName: "", isActive: true, roles: [] },
};

export const AdminProductFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isNewProduct = slug === "new";
  const { isLoading, isError, data: productData } = useProduct(slug || "");

  const productTitle = isNewProduct ? "Nuevo producto" : "Editar producto";
  const productSubtitle = isNewProduct
    ? "Aquí puedes crear un nuevo producto."
    : "Aquí puedes editar el producto.";

  const [product, setProduct] = useState<Product>(emptyProduct);
  const [newTag, setNewTag] = useState("");

  // Actualizar el producto cuando los datos se cargan
  useEffect(() => {
    if (productData && !isNewProduct) {
      queueMicrotask(() => setProduct(productData));
    }
  }, [productData, isNewProduct]);

  if (isError && !isNewProduct) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading && !isNewProduct) {
    return <Loading />;
  }

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof Product, value: string[]) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving product:", product);
    // TODO: Implement save logic
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <AdminProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
      newTag={newTag}
      setNewTag={setNewTag}
      onInputChange={handleInputChange}
      onArrayChange={handleArrayChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
