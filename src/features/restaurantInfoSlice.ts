import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Restaurant {
  id: number;
  name: string;
  slug: string;
  location: string;
  description: string;
  photos: string;
  contact_number: string;
  website: string;
  instagram: string;
  telegram: string;
  opening_time: string;
  closing_time: string;
  rating: number;
  num_reviews: number;
  is_halal: boolean;
  cuisines: number[];
}

const initialState: Restaurant = JSON.parse(
  !window.localStorage.getItem("restaurantInfo")
    ? window.localStorage.getItem("restaurantInfo")!
    : "{}"
) || {
  id: 22,
  name: "Alana Patterson",
  slug: "aaa1122",
  location: "Magnam et eu qui qui",
  description: "Est et enim inventor",
  photos:
    "https://bisp-reservation.onrender.com/media/restaurant_photos/12.webp",
  contact_number: "714",
  website: "https://www.ruf.me",
  instagram: "Rem dolores et nisi",
  telegram: "Nihil molestiae quis",
  opening_time: "22:12:00",
  closing_time: "03:17:00",
  rating: 0,
  num_reviews: 0,
  is_halal: true,
  cuisines: [11],
};

export const restaurantInfoSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    setRestaurantInfo: (state, action: PayloadAction<Restaurant>) => {
      console.log(state);
      window.localStorage.setItem(
        "restaurantInfo",
        JSON.stringify(action.payload)
      );
      return action.payload;
    },
    removeRestaurantInfo: () => {
      window.localStorage.removeItem("restaurantInfo");
      return initialState;
    },
  },
});

export const { setRestaurantInfo, removeRestaurantInfo } =
  restaurantInfoSlice.actions;
export default restaurantInfoSlice.reducer;
