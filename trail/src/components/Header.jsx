import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/header.css";

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🍔 FoodHub</Link>
      </div>

      <nav>
        <Link to="/">Home</Link>

        <Link to="/cart">
          🛒 Cart ({totalItems})
        </Link>
      </nav>
    </header>
  );
}

export default Header;