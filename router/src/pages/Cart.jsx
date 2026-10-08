import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  return (
    <div className="cart-container">
      <div className="cart-card">
        <h1>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;