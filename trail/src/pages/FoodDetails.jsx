import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFoodById } from "../services/foodService";
import Loader from "../components/Loader";

function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFood();
  }, [id]);

  async function loadFood() {
    try {
      const data = await getFoodById(id);
      setFood(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="details">
      <img src={food.image} alt={food.name} />

      <h1>{food.name}</h1>

      <p>Cuisine : {food.cuisine}</p>

      <p>Difficulty : {food.difficulty}</p>

      <p>Rating : ⭐ {food.rating}</p>

      <p>Calories : {food.caloriesPerServing}</p>

      <h2>Ingredients</h2>

      <ul>
        {food.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>

      <ol>
        {food.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default FoodDetails;