// src/components/Dashboard/DashboardHeader.tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);

  // Map role to display name
  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: "Admin",
      manager: "Manager",
      chef: "Chef",
      cashier: "Cashier",
    };
    return roleMap[role.toLowerCase()] || role;
  };

  // Extract name from email or use a default
  const getUserName = () => {
    if (user?.name) return user.name;
    if (user?.email) {
      const name = user.email.split("@")[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "User";
  };

  // Get initials for fallback avatar
  const getInitials = () => {
    const name = getUserName();
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  // Get profile image URL from user
  const getProfileImage = () => {
    if (user?.avatar) return user.avatar;
    if (user?.profileImage) return user.profileImage;
    return null;
  };

  const profileImage = getProfileImage();
  const showFallback = !profileImage || imageError;

  return (
    // <header
    //   className="h-20 bg-card border-b border-border flex items-center justify-between px-5 mt-5 md:mt-10 mx-2 md:mx-8 rounded-xl"
    //   style={{
    //     boxShadow: "0px 8px 32px 0px #00000026",
    //   }}
    // >
    <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Page Title */}
      <div className="">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <h3 className="text-base font-normal text-muted-foreground">
            {subtitle}
          </h3>
        )}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-md">
          {showFallback ? (
            // Fallback Avatar with Initials
            <div className="w-full h-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-semibold text-lg">
              {getInitials()}
            </div>
          ) : (
            // Profile Image
            <img
              src={profileImage}
              alt={getUserName()}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* User Details */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">
            {getUserName()}
          </p>
          <p className="text-xs text-muted-foreground">
            {user ? getRoleDisplayName(user.role) : "Guest"}
          </p>
        </div>
      </div>
    </header>
  );
}
