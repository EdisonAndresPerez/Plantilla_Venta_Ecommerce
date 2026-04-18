
export const FilterError = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-black-800">Error al filtrar</h1>
        <p className="text-xl text-gray-600 mt-4">No se encontraron productos que coincidan con los criterios de filtrado</p>
      </div>
    </>
  );
};
