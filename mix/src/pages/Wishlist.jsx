import React, {
  useContext,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import {
  WishlistContext,
} from "../context/WishlistContext";

import {
  CartContext,
} from "../context/CartContext";

import "../styles/Wishlist.css";

function Wishlist() {

  const {
    wishlist,
    wishlistDispatch,
  } = useContext(WishlistContext);

  const {
    dispatch,
  } = useContext(CartContext);

  /* ==========================
        ADD TO CART
  ========================== */

  const handleAddToCart = (item) => {

    dispatch({

      type: "ADD_TO_CART",

      payload: item,

    });

    toast.success(
      `${item.name} added to cart 🛒`
    );

  };

  /* ==========================
        REMOVE
  ========================== */

  const handleRemove = (id) => {

    wishlistDispatch({

      type: "REMOVE_FROM_WISHLIST",

      payload: id,

    });

    toast.success(
      "Removed from Wishlist ❤️"
    );

  };

  /* ==========================
        EMPTY PAGE
  ========================== */

  if (wishlist.length === 0) {

    return (

      <div className="empty-wishlist">

        <h1>
          ❤️ Wishlist Empty
        </h1>

        <p>
          Save your favourite recipes here.
        </p>

        <Link
          to="/"
          className="browse-btn"
        >
          Browse Recipes
        </Link>

      </div>

    );

  }

  return (

    <div className="wishlist-page">

      <div className="wishlist-header">

        <h2>
          ❤️ My Wishlist
        </h2>

        <span>
          {wishlist.length} Items
        </span>

      </div>

      <div className="wishlist-grid">

        {

          wishlist.map((item) => (

            <div
              key={item.id}
              className="wishlist-card"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="wishlist-content">

                <h3>
                  {item.name}
                </h3>

                <p>
                  🍴 {item.cuisine}
                </p>

                <p>
                  ⭐ {item.rating}
                </p>

                <div className="wishlist-buttons">

                  <button
                    className="cart-btn"
                    onClick={() =>
                      handleAddToCart(item)
                    }
                  >
                    🛒 Add Cart
                  </button>

                  <Link
                    to={`/food/${item.id}`}
                    className="details-btn"
                  >
                    View Details
                  </Link>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Wishlist;