export const formatPrice = (price: string, currency: string) =>
  `${Number(price).toLocaleString('el-GR')} ${currency}`;

export const formatAddress = (
  street: string | null,
  streetNumber: string | null,
  city: string | null
) => {
  if (!street && !city) return null;
  return [street, streetNumber, city].filter(Boolean).join(' ');
};
