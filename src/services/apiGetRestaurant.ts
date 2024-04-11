import axios from "axios"
import { BASE_URL } from "../constants/BASE_URL"

export const getRestaurants = async () => {
    return await axios.get(BASE_URL + "restaurants/").then((response) => response.data).catch((error) => error)
}