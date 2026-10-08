import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { toast } from "react-toastify";

import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

import "../styles/Home.css";

import {
  getFoods,
  searchFoods,
} from "../services/foodService";

import {
  CartContext,
} from "../context/CartContext";

import {
  WishlistContext,
} from "../context/WishlistContext";

import {
  ErrorContext,
} from "../context/ErrorContext";

import {
  ThemeContext,
} from "../context/ThemeContext";

import useDebounce from "../hooks/useDebounce";

const LIMIT = 10;

function Home() {

  /* =====================================================
      CONTEXT
  ===================================================== */

  const cartContext =
    useContext(CartContext);

  const wishlistContext =
    useContext(WishlistContext);

  const errorContext =
    useContext(ErrorContext);

  const themeContext =
    useContext(ThemeContext);

  const dispatch =
    cartContext?.dispatch;

  const wishlistDispatch =
    wishlistContext?.dispatch;

  const {
    shouldCrash = false,
    setShouldCrash = () => {},
  } = errorContext || {};

  const {
    darkMode = false,
  } = themeContext || {};

  /* =====================================================
      STATES
  ===================================================== */

  const [
    foods,
    setFoods,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [
    sort,
    setSort,
  ] = useState("");

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    selectedFood,
    setSelectedFood,
  ] = useState(null);

  const debouncedSearch =
    useDebounce(
      search,
      500
    );

  /* =====================================================
      ERROR BOUNDARY TEST
  ===================================================== */

  /*
    IMPORTANT:

    This does NOT automatically crash the page.

    It only crashes when you click
    "Test Error Boundary".

    If you don't want the test feature,
    remove this button from JSX.
  */

  if (shouldCrash) {

    throw new Error(
      "Food API crashed intentionally!"
    );

  }

  /* =====================================================
      FETCH FOODS
  ===================================================== */

  const fetchFoods =
    useCallback(
      async () => {

        setLoading(true);

        try {

          const data =
            await getFoods(
              page,
              LIMIT
            );

          const recipes =
            data?.recipes || [];

          setFoods(recipes);

          const total =
            Number(data?.total) || 0;

          setTotalPages(
            Math.max(
              1,
              Math.ceil(
                total / LIMIT
              )
            )
          );

        } catch (error) {

          console.error(
            "Fetch foods error:",
            error
          );

          toast.error(
            "Failed to load recipes"
          );

          setFoods([]);

          setTotalPages(1);

        } finally {

          setLoading(false);

        }

      },
      [page]
    );

  /* =====================================================
      NORMAL FOOD LOAD
  ===================================================== */

  useEffect(() => {

    if (
      debouncedSearch.trim() !== ""
    ) {
      return;
    }

    fetchFoods();

  }, [
    debouncedSearch,
    fetchFoods,
  ]);

  /* =====================================================
      SEARCH FOODS
  ===================================================== */

  useEffect(() => {

    const query =
      debouncedSearch.trim();

    if (!query) {
      return;
    }

    let cancelled = false;

    const searchRecipe =
      async () => {

        setLoading(true);

        try {

          const data =
            await searchFoods(
              query
            );

          if (cancelled) {
            return;
          }

          const recipes =
            data?.recipes || [];

          setFoods(recipes);

          setTotalPages(1);

          setPage(1);

        } catch (error) {

          if (cancelled) {
            return;
          }

          console.error(
            "Search error:",
            error
          );

          toast.error(
            "Recipe not found"
          );

          setFoods([]);

          setTotalPages(1);

        } finally {

          if (!cancelled) {

            setLoading(false);

          }

        }

      };

    searchRecipe();

    return () => {

      cancelled = true;

    };

  }, [
    debouncedSearch,
  ]);

  /* =====================================================
      FILTER + SORT
  ===================================================== */

  const visibleFoods =
    useMemo(() => {

      let data =
        [...foods];

      /* CATEGORY */

      if (category) {

        data =
          data.filter(
            (food) =>
              (
                food.mealType?.[0] ||
                "Other"
              ) === category
          );

      }

      /* SORT */

      switch (sort) {

        case "A-Z":

          data.sort(
            (a, b) =>
              (a.name || "")
                .localeCompare(
                  b.name || ""
                )
          );

          break;

        case "Z-A":

          data.sort(
            (a, b) =>
              (b.name || "")
                .localeCompare(
                  a.name || ""
                )
          );

          break;

        case "Rating":

          data.sort(
            (a, b) =>
              (b.rating || 0) -
              (a.rating || 0)
          );

          break;

        default:

          break;

      }

      return data;

    }, [
      foods,
      category,
      sort,
    ]);

  /* =====================================================
      CATEGORY LIST
  ===================================================== */

  const categories =
    useMemo(() => {

      const categoryList =
        foods.map(
          (food) =>
            food.mealType?.[0] ||
            "Other"
        );

      return [
        ...new Set(
          categoryList
        ),
      ];

    }, [
      foods,
    ]);

  /* =====================================================
      ADD TO CART
  ===================================================== */

  const handleAddToCart =
    useCallback(
      (food) => {

        if (!food) {
          return;
        }

        if (!dispatch) {

          toast.error(
            "Cart is not available"
          );

          return;

        }

        dispatch({
          type: "ADD_TO_CART",
          payload: food,
        });

        toast.success(
          `${food.name} added to cart`
        );

      },
      [dispatch]
    );

  /* =====================================================
      ADD TO WISHLIST
  ===================================================== */

  const handleWishlist =
    useCallback(
      (food) => {

        if (!food) {
          return;
        }

        if (!wishlistDispatch) {

          toast.error(
            "Wishlist is not available"
          );

          return;

        }

        wishlistDispatch({
          type: "ADD",
          payload: food,
        });

        toast.success(
          `${food.name} added to wishlist`
        );

      },
      [wishlistDispatch]
    );

  /* =====================================================
      OPEN MODAL
  ===================================================== */

  const openModal =
    useCallback(
      (food) => {

        if (!food) {
          return;
        }

        setSelectedFood(food);

        setModalOpen(true);

      },
      []
    );

  /* =====================================================
      CLOSE MODAL
  ===================================================== */

  const closeModal =
    useCallback(
      () => {

        setModalOpen(false);

        setSelectedFood(null);

      },
      []
    );

  /* =====================================================
      MODAL CART
  ===================================================== */

  const handleModalCart =
    useCallback(
      () => {

        if (!selectedFood) {
          return;
        }

        handleAddToCart(
          selectedFood
        );

        closeModal();

      },
      [
        selectedFood,
        handleAddToCart,
        closeModal,
      ]
    );

  /* =====================================================
      MODAL WISHLIST
  ===================================================== */

  const handleModalWishlist =
    useCallback(
      () => {

        if (!selectedFood) {
          return;
        }

        handleWishlist(
          selectedFood
        );

        closeModal();

      },
      [
        selectedFood,
        handleWishlist,
        closeModal,
      ]
    );

  /* =====================================================
      DRAG & DROP
  ===================================================== */

  const onDragEnd =
    useCallback(
      (result) => {

        if (
          !result.destination
        ) {

          return;

        }

        const sourceIndex =
          result.source.index;

        const destinationIndex =
          result.destination.index;

        if (
          sourceIndex ===
          destinationIndex
        ) {

          return;

        }

        const items =
          Array.from(
            visibleFoods
          );

        const [
          movedItem,
        ] = items.splice(
          sourceIndex,
          1
        );

        items.splice(
          destinationIndex,
          0,
          movedItem
        );

        /*
          If filters/sorting are active,
          update only the visible ordering
          instead of accidentally replacing
          the complete API list.
        */

        setFoods(
          (previousFoods) => {

            const reordered =
              [...previousFoods];

            const visibleIds =
              visibleFoods.map(
                (food) =>
                  food.id
              );

            const reorderedIds =
              items.map(
                (food) =>
                  food.id
              );

            const indexMap =
              new Map();

            reorderedIds.forEach(
              (id, index) => {

                indexMap.set(
                  id,
                  index
                );

              }
            );

            const visibleItems =
              reordered.filter(
                (food) =>
                  visibleIds.includes(
                    food.id
                  )
              );

            visibleItems.sort(
              (a, b) =>
                indexMap.get(
                  a.id
                ) -
                indexMap.get(
                  b.id
                )
            );

            let visibleIndex = 0;

            return reordered.map(
              (food) => {

                if (
                  visibleIds.includes(
                    food.id
                  )
                ) {

                  const item =
                    visibleItems[
                      visibleIndex
                    ];

                  visibleIndex += 1;

                  return item;

                }

                return food;

              }
            );

          }
        );

        toast.success(
          "Recipe order updated"
        );

      },
      [
        visibleFoods,
      ]
    );

  /* =====================================================
      EXPLORE RECIPES
  ===================================================== */

  const handleExplore =
    useCallback(() => {

      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });

    }, []);

  /* =====================================================
      VIEW ALL
  ===================================================== */

  const handleViewAll =
    useCallback(() => {

      setSearch("");

      setCategory("");

      setSort("");

      setPage(1);

    }, []);

  /* =====================================================
      PAGE CHANGE
  ===================================================== */

  const handlePageChange =
    useCallback(
      (newPage) => {

        if (
          newPage < 1 ||
          newPage > totalPages
        ) {

          return;

        }

        setPage(newPage);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      },
      [totalPages]
    );

  /* =====================================================
      RENDER
  ===================================================== */

  return (

    <div
      className={
        darkMode
          ? "container dark"
          : "container"
      }
    >

      {/* =================================================
          ERROR TEST
      ================================================= */}

      <button
        type="button"
        className="error-btn"
        onClick={() =>
          setShouldCrash(true)
        }
      >
        💥 Test Error Boundary
      </button>

      {/* =================================================
          SEARCH
      ================================================= */}

      <SearchBar
        search={search}
        setSearch={setSearch}
        loading={loading}
        resultCount={
          visibleFoods.length
        }
      />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero-banner">

        <div className="hero-content">

          <span className="hero-tag">
            🍽 Food Explorer
          </span>

          <h1 className="page-title">

            Discover Delicious

            <br />

            Recipes Every Day

          </h1>

          <p className="page-subtitle">

            Browse hundreds of delicious
            recipes, search instantly,
            drag & drop, save favourites,
            and build your own collection.

          </p>

          <div className="hero-buttons">

            <button
              type="button"
              className="hero-btn primary"
              onClick={
                handleExplore
              }
            >
              🍕 Explore Recipes
            </button>

            <button
              type="button"
              className="hero-btn secondary"
              onClick={
                handleViewAll
              }
            >
              🔥 View All
            </button>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
            alt="Food Banner"
          />

        </div>

      </section>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="filter-container">

        <CategoryFilter
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        <select
          value={sort}
          onChange={(event) =>
            setSort(
              event.target.value
            )
          }
        >

          <option value="">
            Sort Recipes
          </option>

          <option value="A-Z">
            A → Z
          </option>

          <option value="Z-A">
            Z → A
          </option>

          <option value="Rating">
            ⭐ Highest Rating
          </option>

        </select>

      </div>

      {/* =================================================
          LOADER
      ================================================= */}

      {loading && (
        <Loader />
      )}

      {/* =================================================
          DRAG & DROP
      ================================================= */}

      {!loading && (
        <DragDropContext
          onDragEnd={
            onDragEnd
          }
        >

          <Droppable
            droppableId="foods"
          >

            {(provided) => (

              <div
                className="food-grid"
                ref={
                  provided.innerRef
                }
                {...provided.droppableProps}
              >

                {visibleFoods.map(
                  (
                    food,
                    index
                  ) => (

                    <Draggable
                      key={
                        String(
                          food.id
                        )
                      }
                      draggableId={
                        String(
                          food.id
                        )
                      }
                      index={index}
                    >

                      {(
                        provided
                      ) => (

                        <div
                          ref={
                            provided.innerRef
                          }
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >

                          <FoodCard
                            food={food}
                            onAdd={
                              handleAddToCart
                            }
                            onWishlist={
                              handleWishlist
                            }
                            onView={
                              openModal
                            }
                          />

                        </div>

                      )}

                    </Draggable>

                  )
                )}

                {
                  provided.placeholder
                }

              </div>

            )}

          </Droppable>

        </DragDropContext>
      )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {!loading &&
        search.trim() === "" && (

          <Pagination
            currentPage={page}
            totalPages={
              totalPages
            }
            onPageChange={
              handlePageChange
            }
          />

        )}

      {/* =================================================
          REUSABLE MODAL
      ================================================= */}

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          selectedFood?.name ||
          "Recipe Details"
        }
        footer={
          selectedFood && (
            <>
              <button
                type="button"
                onClick={
                  closeModal
                }
              >
                Close
              </button>

              <button
                type="button"
                onClick={
                  handleModalWishlist
                }
              >
                ❤️ Wishlist
              </button>

              <button
                type="button"
                onClick={
                  handleModalCart
                }
              >
                🛒 Add To Cart
              </button>
            </>
          )
        }
      >

        {selectedFood && (

          <div className="modal-content">

            <img
              src={
                selectedFood.image
              }
              alt={
                selectedFood.name
              }
              className="modal-image"
            />

            <h2>
              {
                selectedFood.name
              }
            </h2>

            <p>
              ⭐ Rating:{" "}
              {
                selectedFood.rating ??
                "N/A"
              }
            </p>

            <p>
              🍽 Cuisine:{" "}
              {
                selectedFood.cuisine ??
                "N/A"
              }
            </p>

            <p>
              ⏱ Prep Time:{" "}
              {
                selectedFood.prepTimeMinutes ??
                0
              } mins
            </p>

            <p>
              🔥 Difficulty:{" "}
              {
                selectedFood.difficulty ??
                "N/A"
              }
            </p>

            <p>
              🍴 Servings:{" "}
              {
                selectedFood.servings ??
                "N/A"
              }
            </p>

            <p>
              🔥 Calories:{" "}
              {
                selectedFood.caloriesPerServing ??
                "N/A"
              }
            </p>

            <p>
              🏷 Meal Type:{" "}
              {
                selectedFood.mealType?.join(
                  ", "
                ) ||
                "N/A"
              }
            </p>

          </div>

        )}

      </Modal>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {!loading &&
        visibleFoods.length === 0 && (

          <div className="no-results">

            <div className="empty-icon">
              🍽
            </div>

            <h2>
              No Recipes Found
            </h2>

            <p>
              Try another search keyword.
            </p>

          </div>

        )}

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="home-footer">

        <p>

          🍔 Food Explorer

          {" • "}

          React Project

          {" • "}

          Context API

          {" • "}

          Drag & Drop

          {" • "}

          Reusable Modal

          {" • "}

          Pagination

        </p>

      </footer>

    </div>

  );

}

export default React.memo(Home);