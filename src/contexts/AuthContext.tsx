// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
} from "../redux/features/auth/authSlice";
import type { User, LoginCredentials } from "../redux/types/auth";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const login = async (credentials: LoginCredentials) => {
    await dispatch(loginUser(credentials));
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  const clearError = () => {
    dispatch({ type: "auth/clearError" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
