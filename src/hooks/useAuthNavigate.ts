// src/hooks/useAuthNavigate.ts
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const useAuthNavigate = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  return {
    navigate,
    handleLogout,
  };
};
