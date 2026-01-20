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

    const { id } = useParams();
    const navigate = useNavigate();
    
    const [values, setValues] = useState(null); // null = loading
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
      async function loadCard() {
        try{
          const cards = await getCards();
          const card = cards.find((c)=>String(c.id) === String(id));

          if (!card){
            setError("Card not found");
          } else {
            setValues(card);
          }
        }catch (err){
          setError("Failed to load card");
        }finally{
          setLoading(false);
        }
      }

      loadCard();
    },[id]);
//input
    function handleChange(e){
      const { name, value } = e.target;
      setValues((prev) => ({...prev,
        [name]:value,
      }));
    }
//form submit
    async function handleSubmit(e){
      e.preventDefault();
      setBusy(true);
      setError("")

    try{
      await updateCard(id, values);
      navigate("/cards");
    } catch (err) { 
      setError(err.message || "Failed to update card");
    } finally{
      setBusy(false);
    }}

    if (loading) { 
      return <p>Loading ur card</p>
    }

    //error
    if (!values){
      return <p className="form-error">{error}</p>
    }

    return(
      <div>
        <h1>Edit Card</h1>
        <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Update"
      />
    </div>
    );
  }