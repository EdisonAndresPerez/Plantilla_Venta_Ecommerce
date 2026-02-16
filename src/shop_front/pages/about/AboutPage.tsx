
export const AboutPage = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Sobre <span className="text-blue-600">Nosotros</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Somos una empresa comprometida con la innovación, el desarrollo tecnológico
            y la creación de soluciones digitales que transforman negocios.
            Creemos en la excelencia, la transparencia y el trabajo bien hecho.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Imagen */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Equipo de trabajo"
              className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg hidden md:block">
              <h4 className="text-xl font-semibold">+5 años</h4>
              <p className="text-sm">Impulsando empresas</p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Construimos experiencias digitales que generan resultados
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nuestra misión es ayudar a empresas a crecer mediante soluciones
              web modernas, optimizadas y escalables. Combinamos diseño,
              estrategia y tecnología para ofrecer productos digitales que
              realmente impactan.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Trabajamos con metodologías ágiles, enfoque en el cliente y una
              mentalidad orientada a la mejora continua. No solo desarrollamos
              software, construimos relaciones duraderas.
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-3 rounded-lg font-medium shadow-md">
              Conoce más sobre nuestros servicios
            </button>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-24 grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Innovación
            </h4>
            <p className="text-gray-600">
              Adoptamos nuevas tecnologías y tendencias para ofrecer siempre
              soluciones modernas y eficientes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Compromiso
            </h4>
            <p className="text-gray-600">
              Nos involucramos en cada proyecto como si fuera propio,
              garantizando calidad y cumplimiento.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Excelencia
            </h4>
            <p className="text-gray-600">
              Buscamos la mejora constante en cada detalle, desde el diseño
              hasta el rendimiento técnico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
