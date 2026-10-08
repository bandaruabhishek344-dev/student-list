import axios from "axios";

const BASE_URL = "https://dummyjson.com/recipes";

// Get Foods with Pagination
export const getFoods = async (page, limit) => {
  const skip = (page - 1) * limit;

  const response = await axios.get(
    `${BASE_URL}?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

// Search Foods
export const searchFoods = async (searchText) => {
  const response = await axios.get(
    `${BASE_URL}/search?q=${searchText}`
  );

  return response.data;
};

// Get Food by ID
export const getFoodById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};