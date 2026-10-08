import { useCart } from "../context/CartContext";
import "../styles/cart.css";


function Cart() {
  const { cart, dispatch, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />

          <div className="cart-info">
            <h3>{item.title}</h3>

            <p>₹ {item.price}</p>

            <div className="quantity">
              <button
                onClick={() =>
                  dispatch({
                    type: "DECREASE_QUANTITY",
                    payload: item.id,
                  })
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch({
                    type: "INCREASE_QUANTITY",
                    payload: item.id,
                  })
                }
              >
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: item.id,
                })
              }
            >
              Remove
            </button>
          </div>

        </div>
      ))}

      <div className="total">
        <h2>Total : ₹ {totalPrice}</h2>

        <button
          onClick={() =>
            dispatch({
              type: "CLEAR_CART",
            })
          }
        >
          Clear Cart
        </button>
      </div>
    </div>

    
  );
}

export default Cart;