import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import searchReducer from "../features/searchSlice";
import restaurantReducer from "../features/restaurantSlice";
import restaurantInfoSlice from "../features/restaurantInfoSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    restaurant: restaurantReducer,
    restaurantInfo: restaurantInfoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
