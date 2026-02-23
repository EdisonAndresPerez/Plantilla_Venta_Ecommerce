import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop_front/components/CustomJumbotron";
import { CustomPromotion } from "@/shop_front/components/CustomPromotion";
import { ProductsGrid } from "@/shop_front/components/ProductsGrid";
import { useProducts } from "@/shop_front/hooks/useProducts";
import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";



export const GenderPage = () => {

const [isDelayedLoading, setIsDelayedLoading] = useState(false);
const fetchStartTimeRef = useRef<number | null>(null);

  const { gender } = useParams();
  const { data, isFetching } = useProducts();


  // Mantener el skeleton visible mínimo 1.8 segundos
useEffect(() => {
  if (isFetching) {
    // Inicia el fetch
    fetchStartTimeRef.current = Date.now();
    queueMicrotask(() => setIsDelayedLoading(true));
  } else if (fetchStartTimeRef.current) {
    // Terminó el fetch, calcular tiempo restante
    const elapsed = Date.now() - fetchStartTimeRef.current;
    const remaining = Math.max(0, 1800 - elapsed);
    
    const timer = setTimeout(() => {
      setIsDelayedLoading(false);
      fetchStartTimeRef.current = null;
    }, remaining);
    
    return () => clearTimeout(timer);
  }
}, [isFetching]);

 
  const genderLabelTitle =
    gender === "camisetas"
      ? "Camisetas"
      : gender === "sudaderas"
        ? "Sudaderas"
        : gender === "chaquetas"
          ? "Chaquetas"
          : gender === "accesorios"
            ? "Accesorios"
            : "Todo";

  return (
    <div className="min-h-screen">
      <CustomJumbotron
        title={{
          primary: `Mira nuestra colección de ${genderLabelTitle.toLowerCase()} `,
        }}
        subtitle={{
          highlights: {
            text1: "exclusivos",
            text2: "calidad premium",
            text3: "piezas que definen tu estilo",
          },
        }}
      />

      {/* Products Grid */}
      <ProductsGrid products={data?.products || []} isLoading={isDelayedLoading} />

      <CustomPagination totalPages={data?.pages || 0} />
      <CustomPromotion />
    </div>
  );
};
