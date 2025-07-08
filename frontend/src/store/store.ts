import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import projectSlice from "./projectsSlice";
import developerSlice from "./developersSlice";

export const store = configureStore({
  reducer: { userSlice, projectSlice, developerSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
