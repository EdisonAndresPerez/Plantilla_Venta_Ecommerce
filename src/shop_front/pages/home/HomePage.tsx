import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../../components/CustomJumbotron";
import { CustomjumAction } from "../../components/CustomjumAction";
import { CustomjumStats } from "../../components/CustomjumStats";
import { ProductsGrid } from "../../components/ProductsGrid";
import { products } from "@/mock/products.mock";
import { CustomPromotion } from "@/shop_front/components/CustomPromotion";

export const HomePage = () => {
  const handleClickExplore = () => {
    console.log("hola");
  };

  const handleClickTrends = () => {
    console.log("hola2");
  };

  const stats = [
    { value: "100+", label: "Productos" },
    { value: "100+", label: "Clientes" },
    { value: "4.5★", label: "Rating" },
  ];

  return (
    <div className="min-h-screen">
      <CustomJumbotron
        badgeText="Productores y distribuidores oficiales"
        title={{
          primary: "El sabor que hace",
          secondary: "que todos vuelvan.",
        }}
        subtitle={{
          intro: "Granizados con personalidad y combinaciones",
          highlights: {
            text1: "creativas",
            text2: "opciones con y sin licor",
            text3: "hacen que todos vuelvan por más",
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
      <ProductsGrid products={products} />


      <CustomPagination totalPages={10} />
      <CustomPromotion/>
    </div>
  );
};

export default HomePage;
