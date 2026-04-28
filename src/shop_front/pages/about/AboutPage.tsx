import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import heroImg from "@/assets/about-hero.jpg";
import studioImg from "@/assets/about-studio.jpg";
import productsImg from "@/assets/about-products.jpg";
import { Target, ShieldCheck, Users, Truck } from "lucide-react";

export const AboutPage = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50/80 via-background to-background">
        <div className="container mx-auto px-4 max-w-6xl relative grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-800 text-sm font-semibold border border-yellow-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Sobre nosotros
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
              Más que ropa.
              <br />
              <span className="relative inline-block">
                Una <span className="text-yellow-500">actitud</span>.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              En <strong className="text-foreground">Bunker|Shop</strong>{" "}
              creamos piezas exclusivas de moda urbana para quienes no pasan
              desapercibidos. Diseños que rompen el molde, calidad premium y un
              estilo que define generación.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 text-black cursor-pointer hover:bg-yellow-400 rounded-full font-bold px-8 h-14"
              >
                <Zap className="w-5 h-5 mr-2 fill-current" />
                Explorar productos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full cursor-pointer font-semibold px-8 h-14 border-2"
              >
                Nuestra historia
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-500 rounded-[2.5rem] rotate-3 shadow-xl" />
            <img
              src={heroImg}
              alt="Modelo con streetwear de Bunker Shop"
              width={1280}
              height={1280}
              className="relative rounded-3xl object-cover w-full aspect-square shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {[
            { n: "52+", l: "Productos exclusivos" },
            { n: "100+", l: "Clientes felices" },
            { n: "4.5★", l: "Rating promedio" },
            { n: "24h", l: "Envío express" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-5xl md:text-6xl font-black tracking-tight">
                {s.n}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 max-w-6xl py-24 grid lg:grid-cols-2 gap-16 items-center">
        <img
          src={studioImg}
          alt="Estudio de diseño Bunker Shop"
          width={1280}
          height={960}
          loading="lazy"
          className="rounded-3xl object-cover w-full aspect-[4/3] shadow-2xl"
        />
        <div className="space-y-6">
          <span className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Nuestra historia
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Nacimos del asfalto, crecimos con la cultura.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Bunker|Shop empezó como un proyecto entre amigos apasionados por el
            streetwear. Cansados de la ropa genérica, decidimos crear piezas con
            personalidad real: camisetas, sudaderas, chaquetas y accesorios
            pensados para quienes viven la ciudad con estilo propio.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Hoy seguimos fieles a esa visión:{" "}
            <strong className="text-foreground">moda urbana exclusiva</strong>,
            sin compromisos, con calidad que se siente desde el primer uso.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
              Lo que nos define
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-4">
              Tres pilares.
              <br />
              Una sola misión.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Diseños exclusivos",
                desc: "Cada pieza es pensada para destacar. Sin copias, sin clichés.",
              },
              {
                icon: ShieldCheck,
                title: "Calidad premium",
                desc: "Materiales seleccionados que aguantan el ritmo de la calle.",
              },
              {
                icon: Users,
                title: "Comunidad real",
                desc: "Más que clientes: una tribu que vive y respira el estilo urbano.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="group relative p-8 rounded-2xl border border-white/10 hover:border-yellow-500 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-500 text-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{v.title}</h3>
                <p className="text-white/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="container mx-auto px-4 max-w-6xl py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <span className="text-sm font-bold text-yellow-500 uppercase tracking-widest">
            Promesa Bunker
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Comprar con nosotros es fácil. Y se siente bien.
          </h2>
          <ul className="space-y-5">
            {[
              {
                icon: Truck,
                t: "Envío gratis",
                d: "En todos los pedidos, sin mínimos.",
              },
              {
                icon: ShieldCheck,
                t: "Devoluciones 30 días",
                d: "Si no te enamora, lo devuelves.",
              },
              {
                icon: Zap,
                t: "Pago 100% seguro",
                d: "Procesos cifrados y verificados.",
              },
            ].map((p) => (
              <li key={p.t} className="flex gap-4 items-start">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-yellow-500 flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="font-bold text-lg">{p.t}</div>
                  <div className="text-muted-foreground">{p.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative order-1 lg:order-2">
          <img
            src={productsImg}
            alt="Productos Bunker Shop"
            width={1280}
            height={960}
            loading="lazy"
            className="rounded-3xl object-cover w-full aspect-[4/3] shadow-2xl"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-6xl pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-yellow-500 text-black p-12 md:p-20 text-center">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-black/10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-black/10" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-[0.95]">
              ¿Listo para vestir lo que otros no se atreven?
            </h2>
            <p className="mt-6 text-lg md:text-xl font-medium max-w-xl mx-auto opacity-80">
              Descubre la colección que está redefiniendo la moda urbana.
            </p>
            <Button
              size="lg"
              className="mt-10 bg-black cursor-pointer text-white hover:bg-neutral-800 rounded-full font-bold px-10 h-14 text-base"
            >
              Ver productos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};
