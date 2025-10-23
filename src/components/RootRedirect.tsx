// src/components/RootRedirect.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RootRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated, redirect to role-specific dashboard
  if (isAuthenticated && user) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }

  // If not authenticated, redirect to signin
  return <Navigate to="/signin" replace />;
};

export default RootRedirect;
