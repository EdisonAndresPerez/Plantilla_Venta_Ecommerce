import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../../components/CustomJumbotron";
import { CustomjumAction } from "../../components/CustomjumAction";
import { CustomjumStats } from "../../components/CustomjumStats";
import { ProductsGrid } from "../../components/ProductsGrid";
import { CustomPromotion } from "@/shop_front/components/CustomPromotion";
import { useProducts } from "@/shop_front/hooks/useProducts";
import { useState, useEffect, useRef } from "react";

export const HomePage = () => {
  const { data, isFetching } = useProducts();
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);
  const fetchStartTimeRef = useRef<number | null>(null);

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



  const handleClickExplore = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { value: `${data?.count || 0}`, label: "Productos" },
    { value: "100+", label: "Clientes" },
    { value: "4.5★", label: "Rating" },
  ];

  return (
    <div className="min-h-screen">
      <CustomJumbotron
        badgeText="Moda urbana y exclusiva"
        title={{
          primary: "El estilo que hace",
          secondary: "que todos volteen.",
        }}
        subtitle={{
          intro: "Ropa con personalidad y diseños",
          highlights: {
            text1: "exclusivos",
            text2: "calidad premium",
            text3: "piezas que definen tu estilo",
          },
        }}
      />

      {/*  Section Button */}
      <CustomjumAction
        onClickExpolore={handleClickExplore}
        titleButtonExplore="Explorar Productos"
      />

      {/* Stats */}
      <CustomjumStats stats={stats} />

      {/* Products Grid */}
      <ProductsGrid products={data?.products || []} isLoading={isDelayedLoading} />

      <CustomPagination totalPages={data?.pages || 0} />
      <CustomPromotion />
    </div>
  );
};

export default HomePage;
