import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  date: string;
  time: string;
  numberOfGuests: number;
  others: string;
}

const initialState: SearchState = {
  date: "",
  time: "",
  numberOfGuests: 0,
  others: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action: PayloadAction<SearchState>) => {
      console.log(action.payload);
      window.localStorage.setItem("search", JSON.stringify(action.payload));
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.numberOfGuests = action.payload.numberOfGuests;
      state.others = action.payload.others;
    },
    reset: (state) => {
      state.date = "";
      state.time = "";
      state.numberOfGuests = 0;
      state.others = "";
      window.localStorage.removeItem("search");
    },
  },
});

export const { search, reset } = searchSlice.actions;
export default searchSlice.reducer;
