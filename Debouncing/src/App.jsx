import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Fetch Food Data
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFoods([]);
      return;
    }

    const fetchFoods = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearch}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch food data");
        }

        const data = await response.json();

        setFoods(data.meals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [debouncedSearch]);

  return (
    <div className="container">
      <h1>🍔 Food Search App</h1>

      <input
        type="text"
        placeholder="Search Food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      {!loading &&
        foods.map((food) => (
          <div className="card" key={food.idMeal}>
            <img src={food.strMealThumb} alt={food.strMeal} />

            <div className="details">
              <h2>{food.strMeal}</h2>

              <p>
                <strong>Category:</strong> {food.strCategory}
              </p>

              <p>
                <strong>Area:</strong> {food.strArea}
              </p>

              <p>
                <strong>Tags:</strong>{" "}
                {food.strTags ? food.strTags : "No Tags"}
              </p>

              <p>
                <strong>Instructions:</strong>
              </p>

              <p>{food.strInstructions.slice(0, 150)}...</p>
            </div>
          </div>
        ))}

      {!loading &&
        debouncedSearch &&
        foods.length === 0 &&
        !error && <h2>No Food Found 🍕</h2>}
    </div>
  );
}

export default App;