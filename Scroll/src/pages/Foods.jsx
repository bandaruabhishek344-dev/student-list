import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import { getFoods } from "../services/foodService";

function Foods() {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchFoods = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getFoods(page);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setFoods((prevFoods) => [...prevFoods, ...data]);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isBottom && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div style={{ width: "700px", margin: "20px auto" }}>
      <h1>Infinite Scroll Foods</h1>

      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}

      {loading && <Loader />}

      {!hasMore && (
        <h2 style={{ textAlign: "center" }}>
          No More Foods
        </h2>
      )}
    </div>
  );
}

export default Foods;