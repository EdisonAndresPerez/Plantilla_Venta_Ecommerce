import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, Plus, Upload, Tag, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[];
}

const emptyProduct: Product = {
  id: "",
  title: "",
  price: 0,
  description: "",
  slug: "",
  stock: 0,
  sizes: [],
  gender: "men",
  tags: [],
  images: [],
};

const mockProduct: Product = {
  id: "376e23ed-df37-4f88-8f84-4561da5c5d46",
  title: "Men's Raven Lightweight Hoodie",
  price: 115,
  description:
    "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
  slug: "men-raven-lightweight-hoodie",
  stock: 10,
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  gender: "men",
  tags: ["hoodie", "raven", "sustainable"],
  images: [
    "https://placehold.co/250x250?text=Image+1",
    "https://placehold.co/250x250?text=Image+2",
    "https://placehold.co/250x250?text=Image+3",
    "https://placehold.co/250x250?text=Image+4",
  ],
};

export const AdminProductFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isNewProduct = slug === "new";
  const productTitle = isNewProduct ? "Nuevo producto" : "Editar producto";
  const productSubtitle = isNewProduct
    ? "Aquí puedes crear un nuevo producto."
    : "Aquí puedes editar el producto.";

  // Initialize product: empty for new, mock data for editing
  const [product, setProduct] = useState<Product>(
    isNewProduct ? emptyProduct : mockProduct
  );

  const [newTag, setNewTag] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const availableSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setProduct((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addSize = (size: string) => {
    if (!product.sizes.includes(size)) {
      setProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);
    // TODO: Handle file upload
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    // TODO: Handle file upload
  };

  const handleSave = () => {
    console.log("Saving product:", product);
    // TODO: Implement save logic
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-foreground sm:text-3xl">
            {productTitle}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {productSubtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCancel} className="gap-2">
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cancelar</span>
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <SaveAll className="w-4 h-4" />
            <span className="hidden sm:inline">Guardar</span>
            <span className="sm:hidden">Guardar</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Información del producto
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Título del producto
                </label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                  placeholder="Título del producto"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange("price", parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stock del producto
                  </label>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                      handleInputChange("stock", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Slug del producto
                </label>
                <input
                  type="text"
                  value={product.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                  placeholder="producto-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Género del producto
                </label>
                <select
                  value={product.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                >
                  <option value="men">Hombre</option>
                  <option value="women">Mujer</option>
                  <option value="unisex">Unisex</option>
                  <option value="kids">Niño</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción del producto
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none bg-background"
                  placeholder="Descripción del producto..."
                />
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Tallas disponibles
            </h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.sizes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No hay tallas seleccionadas
                  </p>
                ) : (
                  product.sizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {size}
                      <button
                        onClick={() => removeSize(size)}
                        className="ml-2 hover:text-primary/80 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground mr-2 self-center">
                  Añadir:
                </span>
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => addSize(size)}
                    disabled={product.sizes.includes(size)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      product.sizes.includes(size)
                        ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Etiquetas
            </h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.tags.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No hay etiquetas
                  </p>
                ) : (
                  product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/50 text-foreground border border-border"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  placeholder="Nueva etiqueta..."
                  className="flex-1 px-3 sm:px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                />
                <Button onClick={addTag} size="icon" className="shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Images */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Imágenes del producto
            </h2>

            {/* Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-all ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-border/80"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="space-y-3">
                <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                <div>
                  <p className="text-sm sm:text-base font-medium">
                    Arrastra las imágenes aquí
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    o haz clic para buscar
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP hasta 10MB
                </p>
              </div>
            </div>

            {/* Current Images */}
            {product.images.length > 0 && (
              <div className="mt-4 sm:mt-6 space-y-3">
                <h3 className="text-sm font-medium">Imágenes actuales</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-lg border border-border flex items-center justify-center overflow-hidden">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Status */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Estado del producto
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Estado</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded-full">
                  {isNewProduct ? "Nuevo" : "Activo"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Inventario</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.stock > 5
                      ? "bg-green-500/10 text-green-500"
                      : product.stock > 0
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {product.stock > 5
                    ? "En stock"
                    : product.stock > 0
                    ? "Bajo stock"
                    : "Sin stock"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Imágenes</span>
                <span className="text-sm text-muted-foreground">
                  {product.images.length} imágenes
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Tallas</span>
                <span className="text-sm text-muted-foreground">
                  {product.sizes.length} tallas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
