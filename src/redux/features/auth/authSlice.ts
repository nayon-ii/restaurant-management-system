// src/redux/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  AuthState,
  LoginCredentials,
  LoginResponse,
} from "../../types/auth";
import { cookieUtils } from "../../utils/cookies";

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call with dummy data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy user data based on role (you can modify this logic)
      const dummyUsers: Record<string, LoginResponse> = {
        "admin@example.com": {
          user: {
            id: "1",
            role: "admin",
            email: "admin@example.com",
            name: "Admin User",
            loginTime: new Date().toISOString(),
          },
          accessToken: "dummy-access-token-admin",
          refreshToken: "dummy-refresh-token-admin",
        },
        "manager@example.com": {
          user: {
            id: "2",
            role: "manager",
            email: "manager@example.com",
            name: "Manager User",
            loginTime: new Date().toISOString(),
          },
          accessToken: "dummy-access-token-manager",
          refreshToken: "dummy-refresh-token-manager",
        },
        "chef@example.com": {
          user: {
            id: "3",
            role: "chef",
            email: "chef@example.com",
            name: "Chef User",
            loginTime: new Date().toISOString(),
          },
          accessToken: "dummy-access-token-chef",
          refreshToken: "dummy-refresh-token-chef",
        },
        "cashier@example.com": {
          user: {
            id: "4",
            role: "cashier",
            email: "cashier@example.com",
            name: "Cashier User",
            loginTime: new Date().toISOString(),
          },
          accessToken: "dummy-access-token-cashier",
          refreshToken: "dummy-refresh-token-cashier",
        },
        // Additional test emails
        "manger@gmail.com": {
          user: {
            id: "2",
            role: "manager",
            email: "manger@gmail.com",
            name: "Manager User",
            loginTime: new Date().toISOString(),
          },
          accessToken: "dummy-access-token-manager",
          refreshToken: "dummy-refresh-token-manager",
        },
      };

      console.log("Login attempt with email:", credentials.email);
      const userData = dummyUsers[credentials.email];
      if (!userData) {
        console.log("Available emails:", Object.keys(dummyUsers));
        throw new Error("Invalid credentials");
      }

      // Set cookies
      console.log("Setting cookies for user:", userData.user);
      cookieUtils.setAccessToken(userData.accessToken, credentials.rememberMe);
      cookieUtils.setRefreshToken(
        userData.refreshToken,
        credentials.rememberMe
      );
      cookieUtils.setUserData(
        userData.user as unknown as Record<string, unknown>,
        credentials.rememberMe
      );
      cookieUtils.setUserRole(userData.user.role, credentials.rememberMe);
      console.log("All cookies set successfully");

      return userData;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear cookies
      cookieUtils.clearAll();
      return true;
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = cookieUtils.getAccessToken();
      const userData = cookieUtils.getUserData();
      const refreshToken = cookieUtils.getRefreshToken();

      if (accessToken && userData && refreshToken) {
        return {
          user: userData,
          accessToken,
          refreshToken,
        };
      }

      throw new Error("No valid authentication found");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Auth check failed"
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user as unknown as User;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
