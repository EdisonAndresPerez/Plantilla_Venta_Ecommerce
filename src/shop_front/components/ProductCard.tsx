import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card className="group border-0 product-card-hover cursor-pointer card-gradient rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Like button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked 
                ? 'bg-primary text-white scale-110' 
                : 'bg-white/90 text-foreground hover:bg-primary hover:text-white'
            } shadow-lg`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white shadow-lg">
              {category}
            </span>
          </div>
          
          {/* Quick add button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <Button 
              className="w-full button-gradient rounded-full h-12 text-sm font-semibold gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Agregar al carrito
            </Button>
          </div>
        </div>
        
        <div className="p-5 space-y-2">
          <h3 className="font-semibold text-base tracking-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gradient">${price}</p>
            <div className="flex gap-1">
              {["bg-foreground", "bg-muted-foreground", "bg-primary"].map((color, i) => (
                <div 
                  key={i} 
                  className={`h-4 w-4 rounded-full ${color} border-2 border-white shadow-sm cursor-pointer hover:scale-125 transition-transform`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;