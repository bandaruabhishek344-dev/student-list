import React, { useMemo, useCallback } from "react";

function CategoryFilter({
  category,
  setCategory,
  categories,
}) {
  // Remove duplicate categories
  const uniqueCategories = useMemo(() => {
    return [...new Set(categories)];
  }, [categories]);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, [setCategory]);

  return (
    <select
      className="category"
      value={category}
      onChange={handleCategoryChange}
    >
      <option value="">All Categories</option>

      {uniqueCategories.map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>
  );
}

export default React.memo(CategoryFilter);