import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  /* TODO: Complete the CardList page
    - display a list of cards (use the Card component to display each card)*/
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyCardIds, setBusyCardIds] = useState(new Set());

    /*- delete button calling handleDelete with the card object*/

  useEffect(() => {
    async function fetchCards() {
      try {
        const data = await getCards();
        setCards(data);
      } catch (err) {
        setError("Failed to fetch cards.");
      } finally {
        setLoading(false);
      }
  }}, []);

    /*- handle loading, busy, and error states*/
  async function handleDelete(cardId) {
    setBusyCardIds((prev) => new Set(prev).add(cardId));
    try {
      await deleteCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (err) {
      setError("Failed to delete card.");
    } finally {
      setBusyCardIds((prev) => {
        const newSet = new Set(prev);
        /*- style as a grid UI */
        newSet.delete(cardId);
        return newSet;
      });
    }
  }

  if (loading) {
    return <main>Loading...</main>;
  }

  if (error) {
    return <main>Error: {error}</main>;
  }

  return (
    <main>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onDelete={handleDelete} busy={busyCardIds.has(card.id)} />
        ))}
      </div>
    </main>
  );
}
