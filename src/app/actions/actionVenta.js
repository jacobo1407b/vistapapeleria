export const updateVenta = (numero) => {
  return {
    type: "VENTA",
    payload: numero,
  };
};
