import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import type { Project } from "models/Project";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
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
  reducers: {
    clearProjects(state) {
      state.projects = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { clearProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
