export default function Field({ id, label, hint, children }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
