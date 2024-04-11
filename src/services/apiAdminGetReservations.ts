import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
// restaurants/<int:restaurant_id>/tables/
export const getAdminReservations = async (restaurantID: string | number) => {
  //   const headers = localStorage.getItem("token")
  //     ? {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     : {};
  // restaurants/<int:restaurant_id>/reservations/

  return await axios
    .get(BASE_URL + `restaurants/${restaurantID}/reservations/`)
    .then((response) => response.data)
    .catch((error) => error);
};
