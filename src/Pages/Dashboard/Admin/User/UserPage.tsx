import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import UserManagementPage from "@/components/Shared/UserManagementPage";

export default function UserPage() {
  return (
    <div>
      <DashboardHeader
        title="User Management"
        subtitle="Manage Your Restaurant Users"
      />
      <UserManagementPage title="User" />
    </div>
  );
}
