export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText = "Save",
}) {
  return (
    <form className="card-form" onSubmit={onSubmit}>
      <label className="form-row">
        <span>Card Name</span>
        <input
          name="card_name"
          placeholder="Enter card name"
          value={values?.card_name ?? ""}
          onChange={onChange}
          required
        />
      </label>

      <label className="form-row">
        <span>Image URL</span>
        <input
          name="card_pic"
          placeholder="https://www.dreamworks.com/images/temp/explore/trolls/branch/troll-hero.png"
          value={values?.card_pic ?? ""}
          onChange={onChange}
        />
      </label>

      {error ? <div className="form-error">{error}</div> : null}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? `${submitText}…` : submitText}
        </button>
      </div>
    </form>
  );
}
