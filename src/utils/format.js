const tr = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 6 });

export function fmt(value, digits = 2, suffix = "") {
  if (!Number.isFinite(value)) return "—";
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
  return suffix ? `${formatted} ${suffix}` : formatted;
}

export function fmtPct(ratio, digits = 2) {
  return `%${fmt(ratio * 100, digits)}`;
}

export { tr };
