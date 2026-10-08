import React, { useState, useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import RecipeList from "../components/RecipeList";
import "../styles/DragDropBoard.css";

const initialData = {
  available: {
    id: "available",
    title: "🍔 Available Recipes",
    items: [
      { id: "1", name: "🍕 Pizza" },
      { id: "2", name: "🍔 Burger" },
      { id: "3", name: "🍜 Noodles" },
      { id: "4", name: "🍗 Biryani" },
      { id: "5", name: "🥗 Salad" },
      { id: "6", name: "🍰 Cake" },
      { id: "7", name: "🌮 Taco" },
      { id: "8", name: "🍩 Donut" },
      { id: "9", name: "🍣 Sushi" },
      { id: "10", name: "🥟 Momos" },
    ],
  },

  wishlist: {
    id: "wishlist",
    title: "❤️ Wishlist",
    items: [],
  },
};

function DragDropBoard() {
  const [lists, setLists] = useState(initialData);
  const [search, setSearch] = useState("");

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = lists[source.droppableId];
    const destinationList = lists[destination.droppableId];

    const sourceItems = [...sourceList.items];
    const destinationItems =
      source.droppableId === destination.droppableId
        ? sourceItems
        : [...destinationList.items];

    const [removed] = sourceItems.splice(source.index, 1);

    destinationItems.splice(destination.index, 0, removed);

    setLists({
      ...lists,
      [source.droppableId]: {
        ...sourceList,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationList,
        items: destinationItems,
      },
    });
  };

  const filteredAvailable = useMemo(() => {
    return lists.available.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [lists.available.items, search]);

  const clearWishlist = () => {
    setLists({
      available: {
        ...lists.available,
        items: [...lists.available.items, ...lists.wishlist.items],
      },
      wishlist: {
        ...lists.wishlist,
        items: [],
      },
    });
  };

  return (
    <div className="board">

      <h1>🍽️ Food Recipe Planner</h1>

      <p className="subtitle">
        Drag recipes into your wishlist.
      </p>

      <div className="stats">

        <div className="card">
          <h3>{lists.available.items.length}</h3>
          <span>Available</span>
        </div>

        <div className="card">
          <h3>{lists.wishlist.items.length}</h3>
          <span>Wishlist</span>
        </div>

      </div>

      <input
        className="search-box"
        placeholder="🔍 Search Recipe..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="clear-btn"
        onClick={clearWishlist}
      >
        Clear Wishlist
      </button>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="lists">

          <RecipeList
            list={{
              ...lists.available,
              items: filteredAvailable,
            }}
          />

          <RecipeList
            list={lists.wishlist}
          />

        </div>

      </DragDropContext>

    </div>
  );
}

export default DragDropBoard;