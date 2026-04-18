import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomjumAction } from "@/shop_front/components/CustomjumAction";
import { CustomJumbotron } from "@/shop_front/components/CustomJumbotron";
import { CustomPromotion } from "@/shop_front/components/CustomPromotion";
import { ProductsGrid } from "@/shop_front/components/ProductsGrid";
import { useProducts } from "@/shop_front/hooks/useProducts";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
  const { data, isFetching } = useProducts();
  const stats = [
    {
      value: String(data?.count ?? 0),
      label: "Productos",
    },
  ];

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

  const handleClickExplore = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

     
      <CustomjumAction
        onClickExpolore={handleClickExplore}
        titleButtonExplore="Explorar Productos"
        stats={stats}
      />
   

      {/* Products Grid */}
      <ProductsGrid products={data?.products || []} isLoading={isFetching} />

      <CustomPagination totalPages={data?.pages || 0} />
      <CustomPromotion />
    </div>
  );
};
