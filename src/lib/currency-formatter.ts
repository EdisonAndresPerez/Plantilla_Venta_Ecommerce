export const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Función auxiliar para formatear precios (multiplica por 1000 si necesario)
export const formatPrice = (price: number) => {
  // Si el precio es menor a 1000, asumimos que está en formato simplificado
  // y lo multiplicamos por 1000 para pesos colombianos
  const adjustedPrice = price < 1000 ? price * 1000 : price;
  return currencyFormatter.format(adjustedPrice);
};