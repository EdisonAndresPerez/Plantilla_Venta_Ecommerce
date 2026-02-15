import { Sparkles } from "lucide-react";

export const CustomFooter = () => {
  return (
    <footer className="py-12 sm:py-16 px-4 lg:px-8 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl button-gradient flex items-center justify-center">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl">
                <span className="text-foreground">bunker</span>
                <span className="text-primary">|</span>
                <span className="text-gradient">Shop</span>
              </h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Ropa que expresa tu personalidad. Colores vivos, diseños únicos y
              calidad premium.
            </p>
          </div>

          {[
            {
              title: "Productos",
              links: ["Camisetas", "Sudaderas", "Chaquetas", "Accesorios"],
            },
            {
              title: "Ayuda",
              links: ["Contacto", "Envíos", "Devoluciones", "Guía de Tallas"],
            },
            {
              title: "Empresa",
              links: [
                "Sobre Nosotros",
                "Sustentabilidad",
                "Carreras",
                "Prensa",
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base text-muted-foreground">
          <p>
            &copy; 2026 bunker|Shop. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
