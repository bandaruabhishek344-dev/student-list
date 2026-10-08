import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/photos";

export const getFoods = async (page) => {
  const response = await axios.get(API, {
    params: {
      _page: page,
      _limit: 10,
    },
  });

  return response.data;
};