import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "react-router";

const ProductFilter = () => {
  //searchParams para leer la URL
  //setSearchParams para ESCRIBIR / MODIFICAR la URL
  const [searchParams, setSearchParams] = useSearchParams();

  //talla actuales
  const currentsizes = searchParams.get("sizes")?.split(",") || [];

  //funcion para manejar el cambio de talla
  const handleSizeChange = (sizeId: string) => {
   const newSizes = currentsizes.includes(sizeId)
      ? currentsizes.filter((size) => size !== sizeId) //eliminar talla
      : [...currentsizes, sizeId]; //agregar talla

      searchParams.set('sizes', newSizes.join(','));
      setSearchParams(searchParams);
  };

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  const colors = [
    { id: "black", color: "bg-foreground" },
    { id: "white", color: "bg-white border-2 border-border" },
    { id: "coral", color: "bg-primary" },
    { id: "purple", color: "bg-secondary" },
    { id: "teal", color: "bg-accent" },
  ];

  return (
    <div className="w-64 space-y-6 p-6 rounded-2xl glass-effect">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg button-gradient flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-bold text-lg">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Tallas
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size.id}
              onClick={() => handleSizeChange(size.id)}
              variant={currentsizes.includes(size.id) ? "default" : "outline"}
              size="sm"
              className="h-10 rounded-xl font-medium hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Colors */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Colores
        </h4>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`h-8 w-8 rounded-full ${color.color} hover:scale-125 transition-transform duration-300 shadow-md hover:shadow-lg`}
            />
          ))}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Precio
        </h4>
        <RadioGroup defaultValue="" className="space-y-3">
          {[
            { value: "any", label: "Cualquier precio" },
            { value: "0-50", label: "$0 - $50" },
            { value: "50-100", label: "$50 - $100" },
            { value: "100-200", label: "$100 - $200" },
            { value: "200+", label: "$200+" },
          ].map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <RadioGroupItem
                value={option.value}
                id={`price-${option.value}`}
                className="border-2 border-muted-foreground/30 text-primary"
              />
              <Label
                htmlFor={`price-${option.value}`}
                className="text-sm cursor-pointer group-hover:text-primary transition-colors"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button className="w-full button-gradient rounded-xl h-12 font-semibold">
        Aplicar Filtros
      </Button>
    </div>
  );
};

export default ProductFilter;
