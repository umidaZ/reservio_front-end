import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const getMyReservations = async (customerID: string | number) => {
  const headers = localStorage.getItem("token")
    ? {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    : {};
  console.log(headers);
  return await axios
    .get(BASE_URL + `my-reservations/?customer_id=${customerID}`, headers)
    .then((response) => response.data)
    .catch((error) => error);
};
