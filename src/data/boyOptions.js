export const BOY_OPTIONS = [
  {
    value: "2500_8000",
    label: "2500 mm",
    detail: "8000 mm çekim · 3 boy · 500 mm fire",
    netBoy: 7500,
    cekimBoyu: 8000,
  },
  {
    value: "3035_7000",
    label: "3035 mm",
    detail: "7000 mm çekim · 2 boy · 930 mm fire",
    netBoy: 6070,
    cekimBoyu: 7000,
  },
  {
    value: "5000_10200",
    label: "5000 mm",
    detail: "10200 mm çekim · 2 boy · 200 mm fire",
    netBoy: 10000,
    cekimBoyu: 10200,
  },
  {
    value: "4000_8800",
    label: "4000 mm",
    detail: "8800 mm çekim · 2 boy · 800 mm fire",
    netBoy: 8000,
    cekimBoyu: 8800,
  },
  {
    value: "ozel",
    label: "Özel boy",
    detail: "Net ve çekim boyunu kendiniz girin",
  },
];

/** Bakır yoğunluğu: 8.96 g/cm³ → kg / (mm² · m) */
export const COPPER_DENSITY = 0.00896;
