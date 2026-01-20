import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

function getId(card) {
  return card?.id ?? card?.card_id ?? card?._id ?? "";
}

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const data = await getCards();
      // assume data is array
      setCards(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err?.message ?? "Failed to load cards");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(card) {
    const id = getId(card);
    if (!id) return;
    if (!window.confirm("Delete this card?")) return;

    setBusyId(id);
    try {
      await deleteCard(id);
      // remove from local list
      setCards((prev) => prev.filter((c) => getId(c) !== id));
    } catch (err) {
      console.error(err);
      setError(err?.message ?? "Failed to delete card");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="page page-list">
      <h2>All Cards</h2>

      {loading ? (
        <p>Loading cards…</p>
      ) : error ? (
        <div className="error">{error}</div>
      ) : cards.length === 0 ? (
        <p>No cards yet. Try adding one.</p>
      ) : (
        <section className="cards-grid">
          {cards.map((card) => (
            <Card
              key={getId(card) || JSON.stringify(card)}
              card={card}
              onDelete={handleDelete}
              busy={busyId === getId(card)}
            />
          ))}
        </section>
      )}
    </main>
  );
}
