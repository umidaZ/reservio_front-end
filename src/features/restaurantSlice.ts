import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RestaurantState {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm: string;
  name: string;
  location: string;
  contact_number: string;
  website: string;
  instagram: string;
  telegram: string;
  opening_time: string | null;
  closing_time: string | null;
  is_halal: boolean;
  photos: string | null;
  cuisines: Cuisine[];
}

interface Cuisine {
  // Define the properties of the Cuisine model here
}

const initialState: RestaurantState = JSON.parse(
  localStorage.getItem("restaurant") ||
    JSON.stringify({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm: "",
      name: "",
      location: "",
      contact_number: "",
      website: "",
      instagram: "",
      telegram: "",
      opening_time: null,
      closing_time: null,
      is_halal: false,
      photos: null,
      cuisines: [],
    })
) || {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm: "",
  name: "",
  location: "",
  contact_number: "",
  website: "",
  instagram: "",
  telegram: "",
  opening_time: null,
  closing_time: null,
  is_halal: false,
  photos: null,
  cuisines: [],
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<RestaurantState>) => {
      localStorage.setItem("restaurant", JSON.stringify(action.payload));
      console.log(state);
      return action.payload;
    },
    logout: (state) => {
      console.log(state);
      localStorage.removeItem("restaurant");
      return initialState;
    },
  },
});

export const { login, logout } = restaurantSlice.actions;
export default restaurantSlice.reducer;
