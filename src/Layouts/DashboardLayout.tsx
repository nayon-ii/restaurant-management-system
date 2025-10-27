// src/Layouts/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="md:ml-[250px] min-h-screen bg-background md:scrollbar-thin">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 h-16 bg-sidebar border-b border-border flex items-center px-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}
