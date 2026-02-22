import { Button } from "@/components/ui/button";
import type { Product, Size } from "@/interfaces/product.interface";
import { X, SaveAll, Tag, Plus, Upload, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  title: string;
  subTitle: string;
  product: Product;
  newTag: string;
  setNewTag: (tag: string) => void;
  onInputChange: (field: keyof Product, value: string | number) => void;
  onArrayChange: (field: keyof Product, value: string[]) => void;
  onSave: () => void;
  onCancel: () => void;
}

const availableSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormData {
  title: string;
  price: number;
  stock: number;
  slug: string;
  gender: string;
  description: string;
}

export const AdminProductForm = ({
  title,
  subTitle,
  product,
  newTag,
  setNewTag,
  onInputChange,
  onArrayChange,
  onSave,
  onCancel,
}: Props) => {
  const [dragActive, setDragActive] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      title: product.title,
      price: product.price,
      stock: product.stock,
      slug: product.slug,
      gender: product.gender,
      description: product.description,
    },
  });

  // Observar cambios en el stock para actualizar el DOM en tiempo real
  const currentStock = watch('stock');

  // Sincronizar valores del formulario cuando el producto cambia
  useEffect(() => {
    reset({
      title: product.title,
      price: product.price,
      stock: product.stock,
      slug: product.slug,
      gender: product.gender,
      description: product.description,
    });
  }, [product, reset]);

  const onSubmit = (data: FormData) => {
    // Actualizar todos los campos antes de guardar
    Object.entries(data).forEach(([key, value]) => {
      onInputChange(key as keyof Product, value);
    });
    // Pequeño delay para asegurar que el estado se actualice
    setTimeout(() => {
      onSave();
    }, 100);
  };


  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      onArrayChange("tags", [...product.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onArrayChange(
      "tags",
      product.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  const addSize = (size: Size) => {
    if (!product.sizes.includes(size)) {
      onArrayChange("sizes", [...product.sizes, size]);
    }
  };

  const removeSize = (sizeToRemove: Size) => {
    onArrayChange(
      "sizes",
      product.sizes.filter((size) => size !== sizeToRemove),
    );
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {subTitle}
          </p>
        </div>
        <div className="flex justify-end mb-10 gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            <SaveAll className="w-4 h-4 mr-2" />
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>

      {/* Banner de errores de validación */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Hay {Object.keys(errors).length} error(es) en el formulario
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Por favor corrige los campos marcados antes de guardar.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Información del producto
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Título del producto *
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: "El título es obligatorio",
                      minLength: {
                        value: 3,
                        message: "El título debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message: "El título no puede exceder 100 caracteres",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.title ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="Ej: Sudadera Premium con Capucha"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Precio ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        required: "El precio es obligatorio",
                        min: {
                          value: 0.01,
                          message: "El precio debe ser mayor a 0",
                        },
                        max: {
                          value: 999999,
                          message: "El precio no puede exceder 999,999",
                        },
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.price ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Ej: 45.99"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock del producto *
                    </label>
                    <input
                      type="number"
                      {...register("stock", {
                        required: "El stock es obligatorio",
                        min: {
                          value: 0,
                          message: "El stock no puede ser negativo",
                        },
                        max: {
                          value: 99999,
                          message: "El stock no puede exceder 99,999",
                        },
                        valueAsNumber: true,
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.stock ? "border-red-500" : "border-slate-300"
                      }`}
                      placeholder="Ej: 100"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug del producto *
                  </label>
                  <input
                    type="text"
                    {...register("slug", {
                      required: "El slug es obligatorio",
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: "El slug solo puede contener letras minúsculas, números y guiones",
                      },
                      minLength: {
                        value: 3,
                        message: "El slug debe tener al menos 3 caracteres",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.slug ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="Ej: sudadera-premium-capucha"
                  />
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.slug.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">
                    URL amigable para el producto (solo minúsculas y guiones)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Categoría del producto *
                  </label>
                  <select
                    {...register("gender", {
                      required: "La categoría es obligatoria",
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.gender ? "border-red-500" : "border-slate-300"
                    }`}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="camisetas">Camisetas</option>
                    <option value="sudaderas">Sudaderas</option>
                    <option value="chaquetas">Chaquetas</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descripción del producto *
                  </label>
                  <textarea
                    {...register("description", {
                      required: "La descripción es obligatoria",
                      minLength: {
                        value: 10,
                        message: "La descripción debe tener al menos 10 caracteres",
                      },
                      maxLength: {
                        value: 500,
                        message: "La descripción no puede exceder 500 caracteres",
                      },
                    })}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.description ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="Describe las características principales del producto..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Tallas disponibles
              </h2>

              <div className="space-y-4">
                {product.sizes.length === 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg mb-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                      <p className="text-sm text-yellow-700">
                        Recomendado: Agrega al menos una talla para el producto
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {product.sizes.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No hay tallas seleccionadas
                    </p>
                  ) : (
                    product.sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className=" cursor-pointer ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600 mr-2">
                    Añadir tallas:
                  </span>
                  {availableSizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => addSize(size)}
                      disabled={product.sizes.includes(size)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        product.sizes.includes(size)
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Etiquetas
              </h2>

              <div className="space-y-4">
                {product.tags.length === 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg mb-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                      <p className="text-sm text-yellow-700">
                        Recomendado: Agrega etiquetas para mejorar la búsqueda del producto
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {product.tags.length === 0 ? (
                    <p className="text-sm text-slate-500">No hay etiquetas</p>
                  ) : (
                    product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 cursor-pointer text-green-600 hover:text-green-800 transition-colors duration-200"
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Añadir nueva etiqueta..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <Button type="button" onClick={addTag} className="px-4 py-2 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Imágenes del producto
              </h2>

              {/* Drag & Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-300 hover:border-slate-400'
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
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div>
                    <p className="text-lg font-medium text-slate-700">
                      Arrastra las imágenes aquí
                    </p>
                    <p className="text-sm text-slate-500">
                      o haz clic para buscar
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    PNG, JPG, WebP hasta 10MB cada una
                  </p>
                </div>
              </div>

              {/* Current Images */}
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-medium text-slate-700">
                  Imágenes actuales
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                        <img
                          src={image}
                          alt="Product"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <button 
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="mt-1 text-xs text-slate-600 truncate">
                        {image}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Status */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Estado del producto
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Estado
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Activo
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Inventario
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      currentStock > 5
                        ? 'bg-green-100 text-green-800'
                        : currentStock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {currentStock > 5
                      ? 'En stock'
                      : currentStock > 0
                      ? 'Bajo stock'
                      : 'Sin stock'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Imágenes
                  </span>
                  <span className="text-sm text-slate-600">
                    {product.images.length} imágenes
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Tallas disponibles
                  </span>
                  <span className="text-sm text-slate-600">
                    {product.sizes.length} tallas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};