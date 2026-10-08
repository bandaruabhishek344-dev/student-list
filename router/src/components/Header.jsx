import { Link } from "react-router-dom";
import "./Header.css";
function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="logo">
        <h2>🛍️ My Store</h2>
      </div>

      <nav className="nav-links">
        <Link to="/">🏠 Home</Link>

        <Link to="/products">📦 Products</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-badge">
            {cartCount}
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;