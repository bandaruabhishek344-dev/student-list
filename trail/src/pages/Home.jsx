import { useEffect, useState } from "react";

import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

import useInfiniteScroll from "../hooks/useInfiniteScroll";

import { getFoods, searchFoods } from "../services/foodService";

import "../styles/home.css";
import "../styles/errorButton.css";

const LIMIT = 10;

function Home() {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");

  // Error Boundary Test State
  const [crash, setCrash] = useState(false);

  // Throw Error to Test Error Boundary
  if (crash) {
    throw new Error("Testing Error Boundary");
  }

  // Infinite Scroll
  useInfiniteScroll(hasMore, loading, setPage);

  // Reset when search changes
  useEffect(() => {
    setFoods([]);
    setPage(1);

    if (search.trim()) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [search]);

  // Load Data
  useEffect(() => {
    loadFoods();
  }, [page, search]);

  async function loadFoods() {
    try {
      setLoading(true);
      setError("");

      if (search.trim()) {
        const data = await searchFoods(search);

        setFoods(data.recipes);
      } else {
        const data = await getFoods(page, LIMIT);

        setFoods((prev) =>
          page === 1
            ? data.recipes
            : [...prev, ...data.recipes]
        );

        if (data.recipes.length < LIMIT) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">

      {/* Error Boundary Test Button */}
      <div className="error-test">
        <button onClick={() => setCrash(true)}>
          Test Error Boundary
        </button>
      </div>

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Error Message */}
      {error && <h2>{error}</h2>}

      {/* Food Cards */}
      <div className="food-grid">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
          />
        ))}
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* No Data */}
      {!loading && foods.length === 0 && (
        <h2>No Food Found.</h2>
      )}
    </div>
  );
}

export default Home;