import { NavLink } from "react-router-dom";

// Check if user is logged in
const token = localStorage.getItem("token");
function handleLogout() {
localStorage.removeItem("token");
navigate("/"); // or /login
}

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <strong className="brand">Card App</strong>
      </div>
      {token ? (
      <button onClick={handleLogout}>Logout</button>
      ) : (
      <NavLink to="/login">Login</NavLink>
      )}

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/cards" className={({ isActive }) => isActive ? "active" : ""}>
          Cards
        </NavLink>

        <NavLink to="/cards/new" className={({ isActive }) => isActive ? "active" : ""}>
          Add Card
        </NavLink>
      </nav>
    </header>
  );
}
