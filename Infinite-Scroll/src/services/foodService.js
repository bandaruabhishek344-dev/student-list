import axios from "axios";

const BASE_URL = "https://dummyjson.com/recipes";

// Get paginated recipes
export const getFoods = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const response = await axios.get(BASE_URL, {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
};

// Search recipes
export const searchFoods = async (search) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      q: search,
    },
  });

  return response.data;
};