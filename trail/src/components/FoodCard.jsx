import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/card.css";

function FoodCard({ food }) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: food.id,
        title: food.name,
        price: food.caloriesPerServing,
        image: food.image,
      },
    });
  };

  return (
    <div className="food-card">
      <img
        src={food.image}
        alt={food.name}
      />

      <h3>{food.name}</h3>

      <p>🍽️ {food.cuisine}</p>

      <p>⭐ {food.rating}</p>

      <h2>₹{food.caloriesPerServing}</h2>

      <div className="buttons">
        <Link to={`/food/${food.id}`}>
          <button>View</button>
        </Link>

        <button onClick={addToCart}>
          Add Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;