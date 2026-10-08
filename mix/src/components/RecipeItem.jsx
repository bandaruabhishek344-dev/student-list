import React from "react";
import "../styles/RecipeItem.css";

import {
  FaGripVertical,
  FaStar,
  FaClock,
} from "react-icons/fa";

function RecipeItem({
  recipe,
  isDragging,
}) {
  return (
    <div
      className={
        isDragging
          ? "recipe-item dragging"
          : "recipe-item"
      }
    >
      <div className="recipe-top">

        <div className="recipe-image">
          🍽️
        </div>

        <div className="recipe-details">

          <h3>{recipe.name}</h3>

          <div className="recipe-info">

            <span>
              <FaStar />
              4.8
            </span>

            <span>
              <FaClock />
              20 min
            </span>

          </div>

        </div>

        <div className="drag-icon">
          <FaGripVertical />
        </div>

      </div>

      <button className="recipe-btn">
        View Recipe
      </button>

    </div>
  );
}

export default React.memo(RecipeItem);