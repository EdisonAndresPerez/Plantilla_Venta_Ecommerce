import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../../components/CustomJumbotron";
import { CustomjumAction } from "../../components/CustomjumAction";
import { CustomjumStats } from "../../components/CustomjumStats";
import { ProductsGrid } from "../../components/ProductsGrid";
import { products } from "@/mock/products.mock";
import { CustomPromotion } from "@/shop_front/components/CustomPromotion";

export const HomePage = () => {
  const handleClickExplore = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { value: "100+", label: "Productos" },
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
      <ProductsGrid products={products} />


      <CustomPagination totalPages={10} />
      <CustomPromotion/>
    </div>
  );
};

export default HomePage;
