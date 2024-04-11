import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number | string;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  role?: number | null;
  contact_number?: string;
  location?: string;
  name?: string;
  birth_date?: string | undefined;
  phone_number?: string;
  customer?: string | number;
}

const initialState: UserState = JSON.parse(
  localStorage.getItem("user") ||
    JSON.stringify({
      username: "",
      email: "",
      password: "",
      confirm: "",
      birth_date: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      customer: "",
    })
) || {
  username: "",
  email: "",
  password: "",
  confirm: "",
  birth_date: "",
  phone_number: "",
  first_name: "",
  last_name: "",
  customer: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirm = action.payload.confirm;
      state.role = action.payload.role;
      state.contact_number = action.payload.contact_number;
      state.location = action.payload.location;
      state.name = action.payload.name;
      state.birth_date = action.payload.birth_date;
      state.phone_number = action.payload.phone_number;
      state.customer = action.payload.customer;
    },
    logout: (state) => {
      state.id = "";
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.password = "";
      state.role = null;
      state.customer = "";
      state.confirm = "";
      window.localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
