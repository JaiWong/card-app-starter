import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  /* TODO: Complete the EditCard page
    - display a form for editing a card (use the CardForm component to display the form)
    - handle form submission to call updateCard API
    - handle loading, busy, and error states
    - style as a form UI */
    const [values, setValues] = useState(null); // null = loading
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
      async function loadCard() {
        try{
          const cards = await getCards
          const card = cards.find((card)=>String(card.id) === String(id));

          if (!card){
            setError("Card not found");
          } else {
            setValues(card);
          }
        }catch (err){
          setError("Failed to load card");
        }finally{
          setBusy(false);
        }
      }

       if (loading) {
        return <main className="page">Loading...</main>;
      }
      if (!values){
        return<main className="page"></main>
      }    })


  return(
     <main className="page page-form">
      <h2>Edit card</h2>


      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Update"
        />
        </main>
  );
}
