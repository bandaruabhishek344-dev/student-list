import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import useDebounce from "../hooks/useDebounce";
import { getFoods, searchFoods } from "../services/foodService";

const LIMIT = 10;

function Foods() {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  //------------------------------------------------
  // Reset when search changes
  //------------------------------------------------

  useEffect(() => {
    setFoods([]);
    setPage(1);

    if (debouncedSearch.trim()) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [debouncedSearch]);

  //------------------------------------------------
  // Fetch Recipes
  //------------------------------------------------

  const fetchFoods = useCallback(async () => {
    if (loading) return;

    if (!debouncedSearch && !hasMore) return;

    setLoading(true);
    setError("");

    try {
      let data;

      if (debouncedSearch.trim()) {
        data = await searchFoods(debouncedSearch);

        setFoods(data.recipes || []);
      } else {
        data = await getFoods(page, LIMIT);

        const newFoods = data.recipes || [];

        setFoods((prev) =>
          page === 1
            ? newFoods
            : [...prev, ...newFoods]
        );

        if (newFoods.length < LIMIT) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, loading, hasMore]);

  //------------------------------------------------
  // Fetch whenever page/search changes
  //------------------------------------------------

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  //------------------------------------------------
  // Infinite Scroll
  //------------------------------------------------

  const handleScroll = useCallback(() => {
    if (loading) return;

    if (!hasMore) return;

    if (debouncedSearch) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const pageHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= pageHeight - 100) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore, debouncedSearch]);

  //------------------------------------------------
  // Add Scroll Event
  //------------------------------------------------

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  //------------------------------------------------
  // Retry
  //------------------------------------------------

  const retry = () => {
    fetchFoods();
  };

  //------------------------------------------------
  // Memoized Data
  //------------------------------------------------

  const displayFoods = useMemo(() => foods, [foods]);

  //------------------------------------------------

  return (
    <>
      <Header />

      <div className="container">
        <h1 className="title">
          Explore Delicious Recipes
        </h1>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {error && (
          <div className="error">
            <p>{error}</p>

            <button onClick={retry}>
              Retry
            </button>
          </div>
        )}

        <div className="grid">
          {displayFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
            />
          ))}
        </div>

        {loading && <Loader />}

        {!loading &&
          !debouncedSearch &&
          !hasMore && (
            <div className="loader">
              No More Recipes
            </div>
          )}

        {!loading &&
          debouncedSearch &&
          displayFoods.length === 0 && (
            <div className="loader">
              No Recipes Found
            </div>
          )}
      </div>
    </>
  );
}

export default Foods;