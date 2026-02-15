import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const CustomPromotion = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-8 mt-8 sm:mt-12 md:mt-16">
      <div className="container mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
        >
          {/* Decorative circles - Hidden on mobile */}
          <div className="hidden sm:block absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
          <div className="hidden sm:block absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <Sparkles className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 text-white/80 mx-auto mb-4 sm:mb-6 animate-float" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              ¿No te pierdas nada?
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto px-2">
              Suscríbete y recibe ofertas exclusivas, nuevos lanzamientos y un
              10% de descuento en tu primera compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 h-14 px-6 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 border-2 border-white/30 focus:border-white focus:outline-none transition-all"
              />
              <Button className="h-14 px-8 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-all">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
