import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../../components/CustomJumbotron";
import { CustomjumAction } from "../../components/CustomjumAction";
import { CustomjumStats } from "../../components/CustomjumStats";

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
        badgeText="Nueva Colección 2024"
        title={{
          primary: "Estilo",
          secondary: "Vibrante",
        }}
        subtitle={{
          intro: "Descubre ropa que expresa tu personalidad.",
          highlights: {
            text1: "Colores vivos",
            text2: "diseños únicos",
            text3: "calidad premium",
          },
        }}
      />

      {/*  Section Button */}
      <CustomjumAction
        onClickExpolore={handleClickExplore}
        onClickTrends={handleClickTrends}
        titleButtonExplore="Explorar Colección"
        titleButtonTrends="Ver Tendencias"
      />
      {/* Stats */}
      <CustomjumStats stats={stats} />

      <CustomPagination totalPages={10} />
    </div>
  );
};

export default HomePage;
