export default function Section({ step, title, subtitle, children }) {
  return (
    <section className="section" aria-labelledby={`sec-${step}`}>
      <header className="section-head">
        <span className="section-step" aria-hidden="true">
          {String(step).padStart(2, "0")}
        </span>
        <div>
          <h2 id={`sec-${step}`}>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </header>
      <div className="section-body">{children}</div>
    </section>
  );
}
