// src/Pages/Dashboard/Shared/SettingsPage.tsx
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  // Get user name from localStorage
  const getUserName = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.name || user.email?.split("@")[0] || "User";
    }
    return "User";
  };

  const userName = getUserName();

  return (
    <>
      <DashboardHeader
        title={`Welcome, ${userName}`}
        subtitle="Have a good day"
      />
      <main className="p-3 md:p-8 space-y-3 md:space-y-6">
        <div>
          {/* Personal Information */}
          <Link to="/dashboard/settings/profile">
            <div className="bg-card flex justify-between items-center rounded-md shadow-md p-3 hover:shadow-xl transition-all border border-border cursor-pointer">
              <span className="text-lg font-medium text-foreground">
                Personal Information
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
        </div>
        <div>
          {/* Change Password */}
          <Link to="/dashboard/settings/change-password">
            <div className="bg-card flex justify-between items-center rounded-md shadow-md p-3 hover:shadow-xl transition-all border border-border cursor-pointer">
              <span className="text-lg font-medium text-foreground">
                Change Password
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
