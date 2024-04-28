import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
export const getAdminReservations = async (restaurantID: string | number) => {
  return await axios
    .get(BASE_URL + `restaurants/${restaurantID}/reservations/`)
    .then((response) => response.data)
    .catch((error) => error);
};
