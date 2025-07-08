import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { StandardUser, User } from "models/User";
import { API_URL } from "../config";
import type { LoginRequest, LoginResponse, StandardUserLoginResponse } from "models/Auth";
import type { Status } from "models/Utils";

type UserState = {
  user: StandardUser | User | null;
  token: string | null;
  status: Status;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: "IDLE",
  error: null,
};

export const loginUser = createAsyncThunk<LoginResponse | StandardUserLoginResponse, LoginRequest, { rejectValue: string }>("auth/loginUser", async (credentials, thunkAPI) => {
  credentials = {
    email: "alice@example.com",
    password: "defaultUserPass",
  };

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: any = await response.json();
    console.log("Login response data:", data);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Login failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse | StandardUserLoginResponse>) => {
        state.status = "SUCCESS";
        state.token = action.payload.token;

        if (isStandardUserLoginResponse(action.payload))
          state.user = {
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
            surname: action.payload.surname,
            phoneNumber: action.payload.phoneNumber,
            workRole: action.payload.workRole,
            bio: action.payload.bio,
            role: action.payload.role,
          };
        else
          state.user = {
            id: action.payload.id,
            email: action.payload.email,
            role: action.payload.role,
          };

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

const isStandardUserLoginResponse = (payload: LoginResponse | StandardUserLoginResponse): payload is StandardUserLoginResponse => {
  return payload.role === "USER";
};
