import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const getRestaurantReviews = async (restaurantID: string | number) => {
  // const token = `Bearer ${localStorage.getItem("token")}` || "";
  return await axios
    .get(BASE_URL + `reviews/?restaurant=${restaurantID}`)
    .then((response) => response.data)
    .catch((error) => error);
};
