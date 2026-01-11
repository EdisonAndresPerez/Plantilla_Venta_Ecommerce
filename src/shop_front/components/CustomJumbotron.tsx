import { CustomjumAction } from "./CustomjumAction";
import { CustomjumStats } from "./CustomjumStats";

interface Props {
  //titulo de promocion
  badgeText?: string;
  title: string;
  subtitle: string;
}

export const CustomJumbotron = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 h-48 w-48 rounded-full bg-accent/20 blur-3xl animate-pulse" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-float">
            Nueva Colección 2026
          </div>

          <h1 className="text-5xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Estilo</span>{" "}
            <span className="text-gradient-secondary">Vibrante</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Descubre ropa que expresa tu personalidad.
            <span className="text-primary font-medium"> Colores vivos</span>,
            <span className="text-purple-500 font-semibold">
              {" "}
              diseños únicos
            </span>{" "}
            y
            <span className="text-pink-500 font-semibold">
              {" "}
              calidad premium
            </span>
            .
          </p>

          {/*  Section Button */}
          <CustomjumAction />
          {/* Stats */}
          <CustomjumStats />
        </div>
      </section>
    </>
  );
};
