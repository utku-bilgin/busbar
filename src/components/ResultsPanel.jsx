import { fmt, fmtPct } from "../utils/format";

const CARDS = [
  { key: "aSoguk", label: "Soğuk hadde kesit alanı", digits: 2, suffix: "mm²" },
  { key: "aSicak", label: "Sıcak hadde kesit alanı", digits: 2, suffix: "mm²" },
  { key: "kBoy", label: "Boy kesim verimi (k)", format: (r) => fmtPct(r.kBoy) },
  { key: "kgMSoguk", label: "Soğuk hadde metre ağırlığı", digits: 3, suffix: "kg/m" },
  { key: "toplamSicakTonaj", label: "Sıcak hadde toplam ağırlık", digits: 2, suffix: "kg" },
  { key: "kgMSicak", label: "Sıcak hadde metre ağırlığı", digits: 3, suffix: "kg/m" },
];

export default function ResultsPanel({ result }) {
  if (!result) {
    return (
      <aside className="results" aria-live="polite">
        <h2>Hesaplama sonuçları</h2>
        <p className="results-empty">
          Ölçüleri girin. Sonuçlar otomatik güncellenir.
        </p>
      </aside>
    );
  }

  if (!result.ok) {
    return (
      <aside className="results results-error" role="alert">
        <h2>Eksik veya hatalı giriş</h2>
        <ul>
          {result.errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </aside>
    );
  }

  return (
    <aside className="results" aria-live="polite">
      <p className="results-kicker">Hedef metraj</p>
      <p className="results-hero">
        <span className="results-hero-value">{fmt(result.lSicak, 2)}</span>
        <span className="results-hero-unit">m</span>
      </p>
      <p className="results-hero-label">Çekilmesi gereken sıcak hadde boyu</p>

      <div className="result-grid">
        {CARDS.map((card) => (
          <div className="result-card" key={card.key}>
            <span className="result-label">{card.label}</span>
            <span className="result-value">
              {card.format
                ? card.format(result)
                : fmt(result[card.key], card.digits, card.suffix)}
            </span>
          </div>
        ))}
      </div>

      <dl className="result-meta">
        <div>
          <dt>Net soğuk metraj</dt>
          <dd>{fmt(result.netSogukMetre, 2, "m")}</dd>
        </div>
        <div>
          <dt>Brüt soğuk metraj</dt>
          <dd>{fmt(result.brutSogukMetre, 2, "m")}</dd>
        </div>
      </dl>
    </aside>
  );
}
