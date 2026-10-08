import axios from "axios";

const BASE_URL = "https://dummyjson.com/recipes";

/* ============================
   GET ALL RECIPES (Pagination)
============================= */

export const getFoods = async (
  page = 1,
  limit = 10
) => {
  try {
    const skip = (page - 1) * limit;

    const response = await axios.get(
      `${BASE_URL}?limit=${limit}&skip=${skip}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

/* ============================
   SEARCH RECIPES
============================= */

export const searchFoods = async (
  searchText
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search?q=${encodeURIComponent(
        searchText
      )}`
    );

    return response.data;
  } catch (error) {
    console.error("Error searching foods:", error);
    throw error;
  }
};

/* ============================
   SINGLE RECIPE
============================= */

export const getFoodById = async (
  id
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

/* ============================
   GET TOTAL PAGES
============================= */

export const getTotalPages = async (
  limit = 10
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?limit=1`
    );

    return Math.ceil(
      response.data.total / limit
    );
  } catch (error) {
    console.error("Error getting total pages:", error);
    throw error;
  }
};