import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomJumbotron } from "../components/CustomJumbotron";

export const ShopLayout = () => {
  return (
    <div className="min-h-screen">
      <CustomHeader />
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
      <Outlet />
    </div>
  );
};
