import axios from "axios";

const BASE_URL =
  "https://jsonplaceholder.typicode.com/users";

export const getEmployees = () =>
  axios.get(BASE_URL);

export const getEmployeeById = (id) =>
  axios.get(`${BASE_URL}/${id}`);