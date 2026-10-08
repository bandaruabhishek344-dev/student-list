import React, {
  useContext,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  WishlistContext,
} from "../context/WishlistContext";

import "../styles/FoodCard.css";

function FoodCard({
  food,
  onAdd,
}) {

  const {
    wishlistDispatch,
  } = useContext(WishlistContext);

  const handleWishlist = () => {

    wishlistDispatch({

      type: "ADD_TO_WISHLIST",

      payload: food,

    });

  };

  return (

    <div className="food-card">

      <img
        src={food.image}
        alt={food.name}
      />

      <h3>
        {food.name}
      </h3>

      <p>
        🍴 {food.cuisine}
      </p>

      <p>
        ⭐ {food.rating}
      </p>

      <div className="card-buttons">

        <button
          className="cart-btn"
          onClick={() => onAdd(food)}
        >
          🛒 Add Cart
        </button>

        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          ❤️ Wishlist
        </button>

        <Link
          className="details-link"
          to={`/food/${food.id}`}
        >
          View Details
        </Link>

      </div>

    </div>

  );

}

export default React.memo(FoodCard);