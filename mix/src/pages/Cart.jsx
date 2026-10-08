import React, {
  useContext,
  useMemo,
  useCallback,
} from "react";

import { Link } from "react-router-dom";
import "../styles/Cart.css";
import { toast } from "react-toastify";

import { CartContext } from "../context/CartContext";

function Cart() {

  const {
    cart,
    dispatch,
  } = useContext(CartContext);

  // ==========================
  // TOTAL ITEMS
  // ==========================

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  // ==========================
  // TOTAL CALORIES
  // ==========================

  const totalCalories = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        item.caloriesPerServing *
        item.quantity,
      0
    );
  }, [cart]);

  // ==========================
  // INCREASE QUANTITY
  // ==========================

  const increaseQuantity = useCallback(
    (id) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: cart.find(
          (item) => item.id === id
        ),
      });
    },
    [dispatch, cart]
  );

  // ==========================
  // DECREASE QUANTITY
  // ==========================

  const decreaseQuantity = useCallback(
    (id) => {
      dispatch({
        type: "DECREASE",
        payload: id,
      });
    },
    [dispatch]
  );

  // ==========================
  // REMOVE ITEM
  // ==========================

  const removeItem = useCallback(
    (id, name) => {
      dispatch({
        type: "REMOVE",
        payload: id,
      });

      toast.error(
        `❌ ${name} removed from cart`
      );
    },
    [dispatch]
  );

  // ==========================
  // CLEAR CART
  // ==========================

  const clearCart = useCallback(() => {
    dispatch({
      type: "CLEAR_CART",
    });

    toast.success(
      "🗑️ Cart Cleared Successfully!"
    );
  }, [dispatch]);

  // ==========================
  // EMPTY CART
  // ==========================

  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <h1>
          🛒 Your Cart is Empty 😔
        </h1>

        <p>
          🍕 Add some delicious recipes to your cart.
        </p>

        <Link to="/">
          <button className="shop-btn">
            🛍️ Go Shopping
          </button>
        </Link>

      </div>
    );
  }

  return (

    <div className="cart-container">

      <h1>
        🛒 Shopping Cart 🛍️
      </h1>

      <h3>
        📦 Total Items : {totalItems}
      </h3>

      <button
        className="remove-btn"
        onClick={clearCart}
      >
        🗑️ Clear Cart
      </button>

      {cart.map((food, index) => (

        <div
          className="cart-card"
          key={`${food.id}-${index}`}
        >

          <img
            src={food.image}
            alt={food.name}
          />

          <div className="cart-info">

            <h2>
              🍽️ {food.name}
            </h2>

            <p>
              🍴 Cuisine :
              <strong>
                {" "}
                {food.cuisine}
              </strong>
            </p>

            <p>
              🔥 Calories :
              <strong>
                {" "}
                {food.caloriesPerServing}
              </strong>
            </p>

               </div>

          <div className="quantity">

            <button
              onClick={() =>
                decreaseQuantity(food.id)
              }
            >
              ➖
            </button>

            <span>
              🛒 {food.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(food.id)
              }
            >
              ➕
            </button>

          </div>

          <div className="item-total">

            <h3>
              🔥{" "}
              {food.caloriesPerServing *
                food.quantity}{" "}
              cal
            </h3>

          </div>

          <button
            className="remove-btn"
            onClick={() =>
              removeItem(
                food.id,
                food.name
              )
            }
          >
            ❌ Remove
          </button>

        </div>

      ))}

      <div className="cart-total">

        <h2>
          🔥 Total Calories :{" "}
          {totalCalories} cal
        </h2>

        <Link to="/checkout">

          <button className="checkout-btn">
            💳 Proceed To Checkout 🛒
          </button>

        </Link>

      </div>

    </div>

  );
}

export default React.memo(Cart);       