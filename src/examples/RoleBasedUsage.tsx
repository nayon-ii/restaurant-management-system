// src/examples/RoleBasedUsage.tsx
// This file shows examples of how to use role-based functionality
// You can delete this file after understanding the patterns
import {
  useUserRole,
  useHasRole,
  useHasAnyRole,
  useIsAdmin,
  useIsManager,
} from "@/hooks/useUserRole";
import {
  RoleGuard,
  AdminOnly,
  ManagerOnly,
  StaffOnly,
  AdminOrManager,
} from "@/components/RoleGuard";

// Example 1: Using hooks in components
export const UserProfile = () => {
  const userRole = useUserRole();
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();
  const hasStaffAccess = useHasAnyRole(["manager", "chef", "cashier"]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Current Role: {userRole}</p>
      <p>Is Admin: {isAdmin ? "Yes" : "No"}</p>
      <p>Is Manager: {isManager ? "Yes" : "No"}</p>
      <p>Has Staff Access: {hasStaffAccess ? "Yes" : "No"}</p>
    </div>
  );
};

// Example 2: Conditional rendering with hooks
export const DashboardContent = () => {
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();
  const isChef = useHasRole("chef");

  return (
    <div>
      <h1>Dashboard</h1>

      {isAdmin && (
        <div>
          <h3>Admin Panel</h3>
          <p>Only admins can see this</p>
        </div>
      )}

      {isManager && (
        <div>
          <h3>Manager Tools</h3>
          <p>Manager-specific content</p>
        </div>
      )}

      {isChef && (
        <div>
          <h3>Kitchen Orders</h3>
          <p>Chef-specific content</p>
        </div>
      )}
    </div>
  );
};

// Example 3: Using RoleGuard components
export const NavigationMenu = () => {
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>Profile</li>

        {/* Only show to admins */}
        <AdminOnly>
          <li>Admin Settings</li>
          <li>User Management</li>
        </AdminOnly>

        {/* Only show to managers */}
        <ManagerOnly>
          <li>Staff Management</li>
          <li>Inventory</li>
        </ManagerOnly>

        {/* Show to multiple roles */}
        <StaffOnly>
          <li>Orders</li>
          <li>Reports</li>
        </StaffOnly>

        {/* Show to admin or manager */}
        <AdminOrManager>
          <li>Analytics</li>
        </AdminOrManager>
      </ul>
    </nav>
  );
};

// Example 4: Advanced RoleGuard usage
export const AdvancedExample = () => {
  return (
    <div>
      {/* Single role check */}
      <RoleGuard allowedRole="admin">
        <div>Only admins see this</div>
      </RoleGuard>

      {/* Multiple roles (user needs ANY of these) */}
      <RoleGuard allowedRoles={["manager", "chef"]}>
        <div>Managers or chefs see this</div>
      </RoleGuard>

      {/* With fallback content */}
      <RoleGuard
        allowedRole="admin"
        fallback={<div>You need admin access to see this content</div>}
      >
        <div>Admin-only content</div>
      </RoleGuard>

      {/* Complex role logic */}
      <RoleGuard allowedRoles={["admin", "manager"]}>
        <div>
          <h3>Management Section</h3>
          <RoleGuard allowedRole="admin">
            <button>Delete All Data</button>
          </RoleGuard>
          <RoleGuard allowedRole="manager">
            <button>View Reports</button>
          </RoleGuard>
        </div>
      </RoleGuard>
    </div>
  );
};

// Example 5: Button with role-based visibility
export const ActionButtons = () => {
  const userRole = useUserRole();
  const isAdmin = useIsAdmin();

  return (
    <div>
      <button>View Orders</button>

      {isAdmin && <button>Delete User</button>}

      {userRole === "manager" && <button>Manage Staff</button>}

      {["chef", "cashier"].includes(userRole || "") && (
        <button>Process Order</button>
      )}
    </div>
  );
};

// Example 6: API calls based on role
export const DataFetcher = () => {
  const userRole = useUserRole();

  const fetchData = async () => {
    let endpoint = "/api/data";

    // Different endpoints based on role
    switch (userRole) {
      case "admin":
        endpoint = "/api/admin/all-data";
        break;
      case "manager":
        endpoint = "/api/manager/restaurant-data";
        break;
      case "chef":
        endpoint = "/api/chef/orders";
        break;
      case "cashier":
        endpoint = "/api/cashier/transactions";
        break;
      default:
        endpoint = "/api/public/data";
    }

    // Make API call
    console.log(`Fetching from: ${endpoint}`);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch {userRole} Data</button>
    </div>
  );
};
