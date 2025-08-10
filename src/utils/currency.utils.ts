export const AEDFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number | undefined) => {
  if (!value) {
    return "-";
  }

  return AEDFormatter.format(value);
};
