import { useMemo, useState } from "react";
import Field from "./components/Field";
import ResultsPanel from "./components/ResultsPanel";
import Section from "./components/Section";
import { BOY_OPTIONS } from "./data/boyOptions";
import { calculateMetraj } from "./utils/calculations";
import "./App.css";

const INITIAL = {
  tonaj: "",
  boySecim: "2500_8000",
  faydaliBoy: "",
  cekimBoyu: "",
  sogukW: "",
  sogukT: "",
  sogukR: "",
  sicakW: "",
  sicakT: "",
  sicakR: "",
  prosesFire: "",
};

const NUMERIC_KEYS = [
  "tonaj",
  "faydaliBoy",
  "cekimBoyu",
  "sogukW",
  "sogukT",
  "sogukR",
  "sicakW",
  "sicakT",
  "sicakR",
  "prosesFire",
];

function num(value) {
  const n = parseFloat(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export default function App() {
  const [form, setForm] = useState(INITIAL);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const result = useMemo(
    () =>
      calculateMetraj({
        tonaj: num(form.tonaj),
        boySecim: form.boySecim,
        faydaliBoy: num(form.faydaliBoy),
        cekimBoyu: num(form.cekimBoyu),
        sogukW: num(form.sogukW),
        sogukT: num(form.sogukT),
        sogukR: num(form.sogukR),
        sicakW: num(form.sicakW),
        sicakT: num(form.sicakT),
        sicakR: num(form.sicakR),
        prosesFire: num(form.prosesFire),
      }),
    [form],
  );

  const selectedBoy = BOY_OPTIONS.find((o) => o.value === form.boySecim);
  const hasInput = NUMERIC_KEYS.some((key) => form[key] !== "");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <a className="brand-logo" href="/" aria-label="IMG ana sayfa">
            <img src="/img-logo.png" alt="IMG" className="brand-logo-img" />
          </a>
          <span className="brand-divider" aria-hidden="true" />
          <div className="brand-copy">
            <p className="brand-kicker">Busbar · Sıcak hadde</p>
            <h1>Bakır lama metraj hesaplayıcı</h1>
            <p className="topbar-note">
              Sipariş tonajından çekilmesi gereken sıcak hadde boyunu hesaplar.
            </p>
          </div>
        </div>
      </header>

      <div className="layout">
        <form
          className="panel"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <Section
            step={1}
            title="Sipariş bilgileri"
            subtitle="Nihai soğuk hadde sipariş miktarı ve boy kesim tipi."
          >
            <div className="grid grid-2">
              <Field id="tonaj" label="Sipariş miktarı (kg)" hint="Net soğuk hadde siparişi">
                <input
                  id="tonaj"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 1500"
                  value={form.tonaj}
                  onChange={(e) => update("tonaj", e.target.value)}
                />
              </Field>
              <Field id="boySecim" label="Boy kesim tipi" hint={selectedBoy?.detail}>
                <select
                  id="boySecim"
                  value={form.boySecim}
                  title={selectedBoy?.detail}
                  onChange={(e) => update("boySecim", e.target.value)}
                >
                  {BOY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            {form.boySecim === "ozel" ? (
              <div className="grid grid-2 custom-boy">
                <Field id="faydaliBoy" label="Toplam net boy (mm)">
                  <input
                    id="faydaliBoy"
                    type="text"
                    inputMode="decimal"
                    placeholder="Örn. 7500"
                    value={form.faydaliBoy}
                    onChange={(e) => update("faydaliBoy", e.target.value)}
                  />
                </Field>
                <Field id="cekimBoyu" label="Toplam çekim boyu (mm)">
                  <input
                    id="cekimBoyu"
                    type="text"
                    inputMode="decimal"
                    placeholder="Örn. 8000"
                    value={form.cekimBoyu}
                    onChange={(e) => update("cekimBoyu", e.target.value)}
                  />
                </Field>
              </div>
            ) : null}
          </Section>

          <Section
            step={2}
            title="Soğuk hadde ölçüleri"
            subtitle="Nihai ürün kesiti (w × t, köşe radyüsü r)."
          >
            <div className="grid grid-3">
              <Field id="sogukW" label="Genişlik w (mm)">
                <input
                  id="sogukW"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 100"
                  value={form.sogukW}
                  onChange={(e) => update("sogukW", e.target.value)}
                />
              </Field>
              <Field id="sogukT" label="Kalınlık t (mm)">
                <input
                  id="sogukT"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 10"
                  value={form.sogukT}
                  onChange={(e) => update("sogukT", e.target.value)}
                />
              </Field>
              <Field id="sogukR" label="Köşe radyüsü r (mm)">
                <input
                  id="sogukR"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 2"
                  value={form.sogukR}
                  onChange={(e) => update("sogukR", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section
            step={3}
            title="Sıcak hadde ölçüleri"
            subtitle="Çıkış taslağı kesiti."
          >
            <div className="grid grid-3">
              <Field id="sicakW" label="Genişlik w (mm)">
                <input
                  id="sicakW"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 120"
                  value={form.sicakW}
                  onChange={(e) => update("sicakW", e.target.value)}
                />
              </Field>
              <Field id="sicakT" label="Kalınlık t (mm)">
                <input
                  id="sicakT"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 12"
                  value={form.sicakT}
                  onChange={(e) => update("sicakT", e.target.value)}
                />
              </Field>
              <Field id="sicakR" label="Köşe radyüsü r (mm)">
                <input
                  id="sicakR"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 3"
                  value={form.sicakR}
                  onChange={(e) => update("sicakR", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section
            step={4}
            title="Hat / talaş firesi"
            subtitle="Soğuk haddeleme ve pahlama kaybı."
          >
            <div className="grid grid-2">
              <Field
                id="prosesFire"
                label="Proses firesi (%)"
                hint="0 ise proses kaybı yok kabul edilir"
              >
                <input
                  id="prosesFire"
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn. 5"
                  value={form.prosesFire}
                  onChange={(e) => update("prosesFire", e.target.value)}
                />
              </Field>
            </div>
          </Section>
        </form>

        <ResultsPanel result={hasInput ? result : null} />
      </div>

      <footer className="footer">
        <img className="footer-logo" src="/img-logo.png" alt="IMG" />
        <p>
          Yoğunluk 8,96 g/cm³. Kesit: A = w·t − (4 − π)·r². Metraj, boy verimi
          ve proses firesi ile brüt sıcak hadde boyuna çevrilir.
        </p>
      </footer>
    </div>
  );
}
