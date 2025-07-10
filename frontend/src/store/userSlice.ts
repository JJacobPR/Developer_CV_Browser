import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import type { StandardUserRequest, StandardUserWithProjects } from "models/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Status } from "models/utils";
import type { ProjectRequest } from "models/project";

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
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

export const addUser = createAsyncThunk<string, StandardUserRequest, { rejectValue: string }>("users/addUser", async (userRequest, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    return "User added successfully";
  } catch {
    return thunkAPI.rejectWithValue("Failed to add user");
  }
});

export const deleteUser = createAsyncThunk<string, number, { rejectValue: string }>("users/deleteUser", async (userId, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return "User deleted successfully";
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete user");
  }
});

type ModifyUserPayload = {
  id: number;
  userRequest: StandardUserRequest;
};

export const modifyUser = createAsyncThunk<string, ModifyUserPayload, { rejectValue: string }>("users/modifyUser", async ({ id, userRequest }, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to modify user");
    }

    return "User modified successfully";
  } catch {
    return thunkAPI.rejectWithValue("Failed to modify user");
  }
});

export const addProjectToUser = createAsyncThunk<string, ProjectRequest, { rejectValue: string }>("users/addProject", async (projectRequest, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(projectRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    return "Project added successfully";
  } catch {
    return thunkAPI.rejectWithValue("Failed to add project");
  }
});

type ModifyProjectPayload = {
  id: number;
  projectRequest: ProjectRequest;
};

export const modifyUserProject = createAsyncThunk<string, ModifyProjectPayload, { rejectValue: string }>("users/modifyProject", async ({ id, projectRequest }, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/project/${id}/${projectRequest.projectRole}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(projectRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to modify project");
    }

    return "Project modified successfully";
  } catch {
    return thunkAPI.rejectWithValue("Failed to modify project");
  }
});

export const deleteUserProject = createAsyncThunk<string, number, { rejectValue: string }>("users/deleteProject", async (projectId, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return "Project deleted successfully";
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete project");
  }
});

const userSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetching users
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
      })
      //Adding user
      .addCase(addUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = "IDLE";
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      })
      //Deleting user
      .addCase(deleteUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "IDLE";
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      })
      // Modifying user
      .addCase(modifyUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(modifyUser.fulfilled, (state) => {
        state.status = "IDLE";
        state.error = null;
      })
      .addCase(modifyUser.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      })
      //Adding project to user
      .addCase(addProjectToUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(addProjectToUser.fulfilled, (state) => {
        state.status = "IDLE";
        state.error = null;
      })
      .addCase(addProjectToUser.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      })
      //Modifying user project
      .addCase(modifyUserProject.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(modifyUserProject.fulfilled, (state) => {
        state.status = "IDLE";
        state.error = null;
      })
      .addCase(modifyUserProject.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      })
      //Deleting user project
      .addCase(deleteUserProject.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(deleteUserProject.fulfilled, (state) => {
        state.status = "IDLE";
        state.error = null;
      })
      .addCase(deleteUserProject.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      });
  },
});

export default userSlice.reducer;
