import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop_front/components/CustomJumbotron";
import { CustomPromotion } from "@/shop_front/components/CustomPromotion";
import { ProductsGrid } from "@/shop_front/components/ProductsGrid";
import { useProducts } from "@/shop_front/hooks/useProducts";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
  const { data } = useProducts();

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
      <ProductsGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 0} />
      <CustomPromotion />
    </div>
  );
};
