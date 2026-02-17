import { Link } from "react-router";

export const AboutPage = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Sobre <span className="text-gradient">Nosotros</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            bunker|Shop es tu destino para moda urbana y exclusiva. Diseñamos
            piezas únicas con personalidad que definen tu estilo y hacen que
            todos volteen. Calidad premium, diseños originales.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Imagen */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
              alt="Moda urbana bunker|Shop"
              className="rounded-2xl shadow-xl object-cover w-full h-[300px] sm:h-[400px]"
            />
            <div className="absolute  bg-yellow-500 -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 card-gradient p-4 sm:p-6 rounded-xl shadow-lg">
              <h4 className="text-lg sm:text-xl font-semibold">Desde 2026</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Redefiniendo la moda
              </p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
              El estilo que hace que{" "}
              <span className="text-gradient">todos volteen</span>
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              En bunker|Shop creemos que la ropa es más que tela: es una forma
              de expresión, una declaración de personalidad. Por eso cada pieza
              que diseñamos busca capturar la esencia de lo urbano, lo exclusivo
              y lo diferente.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Trabajamos con los mejores materiales, colaboramos con diseñadores
              emergentes y seguimos las tendencias sin perder nuestra identidad.
              No vendemos ropa, creamos experiencias que se convierten en tu
              marca personal.
            </p>

            <Link
              to="/"
              className="button-gradient hover:opacity-90 transition-all duration-300 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium shadow-md text-sm sm:text-base  bg-yellow-500"
            >
              Explora nuestros productos
            </Link>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="card-gradient p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Diseño Exclusivo
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Cada prenda es única. Trabajamos con diseñadores para crear piezas
              que no encontrarás en ningún otro lugar.
            </p>
          </div>

          <div className="card-gradient p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Calidad Premium
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Seleccionamos los mejores materiales y procesos de fabricación
              para garantizar durabilidad y comodidad.
            </p>
          </div>

          <div className="card-gradient p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center sm:col-span-2 md:col-span-1">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Moda Urbana
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Capturamos la energía de la ciudad en cada colección. Ropa con
              actitud para quienes no pasan desapercibidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
