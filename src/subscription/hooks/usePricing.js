export default function usePricing() {
  const calcularPrecio = (periodo, precioMensual) => {
    if (periodo === 'anual') {
      // 12 meses con 17% de descuento
      const anual = precioMensual * 12 * 0.83;
      return anual;
    }
    return precioMensual;
  };

  return { calcularPrecio };
}