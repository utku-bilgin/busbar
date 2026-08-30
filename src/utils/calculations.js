import { BOY_OPTIONS, COPPER_DENSITY } from "../data/boyOptions";

export function calculateArea(width, thickness, radius) {
  if (width <= 0 || thickness <= 0) return 0;
  const area = width * thickness - (4 - Math.PI) * radius ** 2;
  return area > 0 ? area : 0;
}

export function boyYield(boySecim, faydaliBoy, cekimBoyu) {
  const preset = BOY_OPTIONS.find((o) => o.value === boySecim);
  if (preset && boySecim !== "ozel") {
    return preset.netBoy / preset.cekimBoyu;
  }
  if (cekimBoyu > 0) return faydaliBoy / cekimBoyu;
  return 1;
}

export function validateInputs(input) {
  const errors = [];
  if (input.tonaj <= 0) errors.push("Sipariş miktarı sıfırdan büyük olmalıdır.");
  if (input.sogukW <= 0 || input.sogukT <= 0) {
    errors.push("Soğuk hadde genişlik ve kalınlığı girilmelidir.");
  }
  if (input.sicakW <= 0 || input.sicakT <= 0) {
    errors.push("Sıcak hadde genişlik ve kalınlığı girilmelidir.");
  }
  if (input.boySecim === "ozel" && input.cekimBoyu <= 0) {
    errors.push("Özel boy için çekim boyu girilmelidir.");
  }
  if (input.prosesFire < 0 || input.prosesFire >= 100) {
    errors.push("Proses firesi 0–100 aralığında olmalıdır.");
  }
  return errors;
}

export function calculateMetraj(input) {
  const errors = validateInputs(input);
  if (errors.length) return { ok: false, errors };

  const aSoguk = calculateArea(input.sogukW, input.sogukT, input.sogukR);
  const aSicak = calculateArea(input.sicakW, input.sicakT, input.sicakR);

  if (aSoguk <= 0 || aSicak <= 0) {
    return { ok: false, errors: ["Kesit alanı hesaplanamadı. Ölçüleri kontrol edin."] };
  }

  const kBoy = boyYield(input.boySecim, input.faydaliBoy, input.cekimBoyu);
  if (kBoy <= 0) {
    return { ok: false, errors: ["Boy kesim verimi geçersiz."] };
  }

  const fProses = input.prosesFire / 100;
  const kgMSoguk = aSoguk * COPPER_DENSITY;
  const kgMSicak = aSicak * COPPER_DENSITY;
  const netSogukMetre = input.tonaj / kgMSoguk;
  const brutSogukMetre = netSogukMetre / kBoy;
  const lSicak = (brutSogukMetre * aSoguk) / (aSicak * (1 - fProses));
  const toplamSicakTonaj = lSicak * kgMSicak;

  return {
    ok: true,
    errors: [],
    aSoguk,
    aSicak,
    kBoy,
    kgMSoguk,
    kgMSicak,
    netSogukMetre,
    brutSogukMetre,
    lSicak,
    toplamSicakTonaj,
  };
}
