import { Link } from "react-router-dom";

export default function Home() {
  /* TODO: Design and complete the Home page
    - display instructions*/

    /*- link to Cards page*/
  <>
    <p>Welcome to the Card App! This is a simple application for managing cards.</p>
    
    <p>Click here to add new cards to the cards list:</p>
    <Link to="/cards/new">Add New Card</Link>

    <p>Click here to view your cards:</p>
    <Link to="/cards">View Cards</Link>
  </>
    /*- style as a landing page */
  

  return <main></main>;
}
