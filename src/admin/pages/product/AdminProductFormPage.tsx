import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useProduct } from "@/admin/hooks/useProduct";
import { Loading } from "@/components/Loading";
import { AdminProductForm } from "./ui/AdminProductForm";
import type { Product } from "@/interfaces/product.interface";

export const AdminProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: product, mutation } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle = id === "new"
    ? "Aquí puedes crear un nuevo producto."
    : "Aquí puedes editar el producto.";

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: () => {
        toast.success("Producto guardado correctamente", {
          position: "top-right",
        });
        navigate("/admin/products");
      },
      onError: (error) => {
        console.error("Error al guardar producto:", error);
        toast.error("Error al guardar el producto", {
          position: "top-right",
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <AdminProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};
