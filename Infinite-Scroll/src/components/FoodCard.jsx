import React from "react";

function FoodCard({ food }) {
  return (
    <div className="card">
      <img
        src={food.image}
        alt={food.name}
      />

      <div className="card-body">
        <h3>{food.name}</h3>

        <p>
          ⭐ <strong>Rating:</strong> {food.rating}
        </p>

        <p>
          🍽 <strong>Cuisine:</strong> {food.cuisine}
        </p>

        <p>
          ⏱ <strong>Prep Time:</strong> {food.prepTimeMinutes} mins
        </p>

        <p>
          🔥 <strong>Calories:</strong> {food.caloriesPerServing}
        </p>
      </div>
    </div>
  );
}

export default React.memo(FoodCard);