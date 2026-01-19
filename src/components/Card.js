import { Link } from "react-router-dom";

function getId(card) {
  return card?.id ?? card?.card_id ?? card?._id ?? "";
}

export default function Card({ card, onDelete, busy }) {
  const id = getId(card);
  const name = card?.card_name ?? card?.name ?? "Untitled";
  const pic = card?.card_pic ?? card?.pic ?? "";

  return (
    <article className="card">
      <div className="card-media">
        {pic ? (
          <img src={pic} alt={name} className="card-image" />
        ) : (
          <div className="card-image placeholder">No image</div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-id">ID: <code>{id}</code></p>

        <div className="card-actions">
          <Link to={`/cards/${id}/edit`} className="btn btn-edit">
            Edit
          </Link>

          <button
            className="btn btn-delete"
            onClick={() => onDelete && onDelete(card)}
            disabled={busy}
            title="Delete card"
          >
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
