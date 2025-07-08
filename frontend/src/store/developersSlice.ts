import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import type { StandardUserWithProjects } from "models/User";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Status } from "models/Utils";

interface DeveloperState {
  developers: StandardUserWithProjects[];
  status: Status;
  error: string | null;
}

const initialState: DeveloperState = {
  developers: [],
  status: "IDLE",
  error: null,
};

export const fetchDevelopers = createAsyncThunk<StandardUserWithProjects[], void, { rejectValue: string }>("developers/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/user?direction=ASC`);

    if (!response.ok) {
      throw new Error("Failed to fetch developers");
    }

    const data: StandardUserWithProjects[] = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch developers");
  }
});

const developerSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopers.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(fetchDevelopers.fulfilled, (state, action: PayloadAction<StandardUserWithProjects[]>) => {
        state.status = "SUCCESS";
        state.developers = action.payload;
        console.log("Fetched developers:", action.payload);
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {} = developerSlice.actions;

export default developerSlice.reducer;
