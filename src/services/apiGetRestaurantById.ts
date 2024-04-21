import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const getRestaurantByID = async (id: number) => {
  return await axios
    .get(BASE_URL + `restaurants/${id}/`)
    .then((response) => response.data)
    .catch((error) => error);
};
