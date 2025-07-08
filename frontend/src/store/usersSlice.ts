import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import type { StandardUserWithProjects } from "models/User";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Status } from "models/Utils";

interface UsersState {
  users: StandardUserWithProjects[];
  status: Status;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "IDLE",
  error: null,
};

export const fetchUsers = createAsyncThunk<StandardUserWithProjects[], void, { rejectValue: string }>("users/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/user?direction=ASC`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data: StandardUserWithProjects[] = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

const usersSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<StandardUserWithProjects[]>) => {
        state.status = "SUCCESS";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
