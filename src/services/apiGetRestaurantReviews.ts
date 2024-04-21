import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const getRestaurantReviews = async (restaurantID: string | number) => {
  // const token = `Bearer ${localStorage.getItem("token")}` || "";
  console.log(restaurantID);
  return await axios
    .get(BASE_URL + `restaurants/${restaurantID}/reviews/`)
    .then((response) => response.data)
    .catch((error) => error);
};
