import { Sparkles } from "lucide-react";

export const CustomFooter = () => {
  return (
    <footer className="py-16 px-4 lg:px-8 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl button-gradient flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-xl">
                <span className="text-foreground">bunker</span>
                <span className="text-primary">|</span>
                <span className="text-gradient">Shop</span>
              </h3>
            </div>
            <p className="text-muted-foreground">
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
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3 text-muted-foreground">
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

        <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
          <p>
            &copy; 2026 bunker|Shop. Todos los derechos reservados. Hecho con 💙
          </p>
        </div>
      </div>
    </footer>
  );
};
