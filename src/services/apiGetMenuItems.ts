import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
// restaurants/<int:restaurant_id>/tables/
export const getMenuItems = async (categoryId: string | number) => {
  const headers = localStorage.getItem("token")
    ? {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    : {};
  return await axios
    .get(BASE_URL + `categories/${categoryId}/menu-items/`, headers)
    .then((response) => response.data)
    .catch((error) => error);
};
