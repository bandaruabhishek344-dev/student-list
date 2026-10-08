import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  toast,
} from "react-toastify";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  ThemeContext,
} from "../context/ThemeContext";

import Sidebar from "../components/Sidebar";

import "../styles/AdminDashboard.css";

const API_URL =
  "https://dummyjson.com/recipes?limit=20";

function AdminDashboard() {
  const {
    user,
  } = useContext(AuthContext);

  const {
    darkMode,
  } = useContext(ThemeContext);

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    recipes,
    setRecipes,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const ITEMS_PER_PAGE = 6;

  /* ==========================
        FETCH API DATA
  ========================== */

  const fetchRecipes =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch recipes"
          );
        }

        const data =
          await response.json();

        setRecipes(
          data.recipes || []
        );
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load recipe data"
        );

        toast.error(
          "Failed to load recipes"
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  /* ==========================
        CATEGORIES
  ========================== */

  const categories =
    useMemo(() => {
      const values =
        recipes.flatMap(
          (recipe) =>
            recipe.tags || []
        );

      return [
        "All",
        ...new Set(values),
      ];
    }, [recipes]);

  /* ==========================
        FILTER DATA
  ========================== */

  const filteredRecipes =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return recipes.filter(
        (recipe) => {
          const matchesSearch =
            !query ||
            recipe.name
              ?.toLowerCase()
              .includes(query);

          const matchesCategory =
            selectedCategory ===
              "All" ||
            recipe.tags?.includes(
              selectedCategory
            );

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      recipes,
      search,
      selectedCategory,
    ]);

  /* ==========================
        PAGINATION
  ========================== */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredRecipes.length /
          ITEMS_PER_PAGE
      )
    );

  const paginatedRecipes =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      return filteredRecipes.slice(
        start,
        start + ITEMS_PER_PAGE
      );
    }, [
      filteredRecipes,
      currentPage,
    ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedCategory,
  ]);

  /* ==========================
        DASHBOARD STATS
  ========================== */

  const stats =
    useMemo(() => {
      const totalCalories =
        recipes.reduce(
          (total, recipe) =>
            total +
            Number(
              recipe.caloriesPerServing ||
                0
            ),
          0
        );

      const averageRating =
        recipes.length
          ? (
              recipes.reduce(
                (total, recipe) =>
                  total +
                  Number(
                    recipe.rating || 0
                  ),
                0
              ) /
              recipes.length
            ).toFixed(1)
          : "0.0";

      return {
        recipes:
          recipes.length,

        users: 2,

        averageRating,

        calories:
          totalCalories,
      };
    }, [recipes]);

  /* ==========================
        DELETE
  ========================== */

  const handleDelete =
    useCallback((id) => {
      setRecipes((prev) =>
        prev.filter(
          (recipe) =>
            recipe.id !== id
        )
      );

      toast.success(
        "Recipe removed from table"
      );
    }, []);

  /* ==========================
        RETRY
  ========================== */

  const handleRetry = () => {
    fetchRecipes();
  };

  return (
    <div
      className={
        darkMode
          ? "admin-layout dark"
          : "admin-layout"
      }
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <main className="admin-main">
        {/* ==========================
              TOP BAR
        ========================== */}

        <header className="admin-topbar">
          <button
            className="menu-button"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            ☰
          </button>

          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back,{" "}
              <strong>
                {user?.email}
              </strong>
            </p>
          </div>

          <div className="admin-status">
            <span className="status-dot" />
            Admin
          </div>
        </header>

        {/* ==========================
              STATS
        ========================== */}

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              🍽️
            </div>

            <div>
              <span>
                Total Recipes
              </span>

              <strong>
                {stats.recipes}
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              👥
            </div>

            <div>
              <span>
                Users
              </span>

              <strong>
                {stats.users}
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              ⭐
            </div>

            <div>
              <span>
                Average Rating
              </span>

              <strong>
                {stats.averageRating}
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              🔥
            </div>

            <div>
              <span>
                Total Calories
              </span>

              <strong>
                {stats.calories}
              </strong>
            </div>
          </div>
        </section>

        {/* ==========================
              CHARTS
        ========================== */}

        <section className="dashboard-panels">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>
                  Recipe Overview
                </h2>

                <p>
                  Current dashboard
                  statistics
                </p>
              </div>
            </div>

            <div className="bar-chart">
              {[
                {
                  label: "Recipes",
                  value:
                    stats.recipes,
                },
                {
                  label: "Users",
                  value:
                    stats.users,
                },
                {
                  label: "Rating",
                  value:
                    Number(
                      stats.averageRating
                    ) * 10,
                },
                {
                  label: "Calories",
                  value:
                    Math.min(
                      stats.calories /
                        10,
                      100
                    ),
                },
              ].map((item) => (
                <div
                  className="chart-item"
                  key={item.label}
                >
                  <div className="chart-label">
                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {item.label ===
                      "Rating"
                        ? stats.averageRating
                        : item.label ===
                          "Calories"
                        ? stats.calories
                        : item.value}
                    </strong>
                  </div>

                  <div className="chart-track">
                    <div
                      className="chart-bar"
                      style={{
                        width: `${Math.min(
                          item.value,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>
                  Quick Actions
                </h2>

                <p>
                  Manage your application
                </p>
              </div>
            </div>

            <div className="quick-actions">
              <button
                onClick={() =>
                  toast.info(
                    "Add Recipe feature"
                  )
                }
              >
                ➕ Add Recipe
              </button>

              <button
                onClick={() =>
                  toast.info(
                    "Reports opened"
                  )
                }
              >
                📊 Reports
              </button>

              <button
                onClick={fetchRecipes}
              >
                🔄 Refresh API
              </button>

              <button
                onClick={() =>
                  setSearch("")
                }
              >
                🧹 Clear Search
              </button>
            </div>
          </div>
        </section>

        {/* ==========================
              API TABLE
        ========================== */}

        <section className="table-panel">
          <div className="table-header">
            <div>
              <h2>
                Recipe API Data
              </h2>

              <p>
                Data loaded from
                DummyJSON API
              </p>
            </div>

            <div className="table-controls">
              <input
                type="search"
                value={search}
                placeholder="Search recipes..."
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

              <select
                value={
                  selectedCategory
                }
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="table-message">
              <div className="spinner" />
              Loading API data...
            </div>
          ) : error ? (
            <div className="table-message error">
              <p>{error}</p>

              <button
                onClick={handleRetry}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="table-wrapper">
                <table className="recipe-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Recipe</th>
                      <th>Cuisine</th>
                      <th>Rating</th>
                      <th>Difficulty</th>
                      <th>Calories</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedRecipes.map(
                      (recipe) => (
                        <tr
                          key={
                            recipe.id
                          }
                        >
                          <td>
                            #
                            {
                              recipe.id
                            }
                          </td>

                          <td>
                            <div className="recipe-name">
                              <img
                                src={
                                  recipe.image
                                }
                                alt={
                                  recipe.name
                                }
                              />

                              <span>
                                {
                                  recipe.name
                                }
                              </span>
                            </div>
                          </td>

                          <td>
                            {
                              recipe.cuisine
                            }
                          </td>

                          <td>
                            ⭐{" "}
                            {
                              recipe.rating
                            }
                          </td>

                          <td>
                            <span className="difficulty">
                              {
                                recipe.difficulty
                              }
                            </span>
                          </td>

                          <td>
                            {
                              recipe.caloriesPerServing
                            }
                          </td>

                          <td>
                            <button
                              className="delete-button"
                              onClick={() =>
                                handleDelete(
                                  recipe.id
                                )
                              }
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {paginatedRecipes.length ===
                0 && (
                <div className="empty-table">
                  No recipes found.
                </div>
              )}

              {/* ==========================
                    PAGINATION
              ========================== */}

              <div className="admin-pagination">
                <button
                  disabled={
                    currentPage ===
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        page - 1
                    )
                  }
                >
                  ← Previous
                </button>

                <span>
                  Page{" "}
                  {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        page + 1
                    )
                  }
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default React.memo(
  AdminDashboard
);