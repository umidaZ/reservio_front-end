import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const getCuisines = async () => {
  return await axios
    .get(BASE_URL + "cuisines/")
    .then((response) => response.data)
    .catch((error) => error);
};


// GET /cuisines/