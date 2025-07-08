import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import type { Project } from "models/Project";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Status } from "models/Utils";

interface ProjectsState {
  projects: Project[];
  status: Status;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: "IDLE",
  error: null,
};

export const fetchProjects = createAsyncThunk<Project[], void, { rejectValue: string }>("projects/fetchProjects", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/project/my-projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data: Project[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch projects");
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = "SUCCESS";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {} = projectsSlice.actions;

export default projectsSlice.reducer;
