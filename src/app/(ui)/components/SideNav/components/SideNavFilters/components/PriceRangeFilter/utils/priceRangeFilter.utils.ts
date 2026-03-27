export const getLabel = (
  min: number | null,
  max: number | null,
  placeholder: string,
  currency: string
): string => {
  if (min !== null && max !== null)
    return `${min.toLocaleString()} - ${max.toLocaleString()}${currency}`;
  if (min !== null) return `from ${min.toLocaleString()}${currency}`;
  if (max !== null) return `up to ${max.toLocaleString()}${currency}`;
  return placeholder;
};

export const toDisplay = (val: number | null): string =>
  val !== null ? val.toLocaleString() : '';

export const parseInput = (raw: string): { display: string; value: number | null } => {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return { display: '', value: null };
  if (digits[0] === '0') return { display: '0', value: null };
  const num = Number(digits);
  return { display: num.toLocaleString(), value: num };
};
