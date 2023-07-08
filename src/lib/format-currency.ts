export function formatCurrency(value: number) {
  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  };

  return value.toLocaleString("pt-BR", options);
}
