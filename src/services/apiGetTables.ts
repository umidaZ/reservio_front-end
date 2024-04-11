import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
// restaurants/<int:restaurant_id>/tables/
export const getTables = async (restaurantID: string | number) => {
  const headers = localStorage.getItem("token")
    ? {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    : {};
  return await axios
    .get(BASE_URL + `restaurants/${restaurantID}/tables/`, headers)
    .then((response) => response.data)
    .catch((error) => error);
};
