// src/Routers/Router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/Layouts/MainLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SignIn from "@/Pages/Authentication/SignIn";
import ForgetPassword from "@/Pages/Authentication/ForgetPassword";
import ResetPassword from "@/Pages/Authentication/ResetPassword";

// Admin Pages
import AdminDashboardPage from "@/Pages/Dashboard/Admin/DashboardPage";

// Manager Pages
import ManagerDashboardPage from "@/Pages/Dashboard/Manager/DashboardPage";
import StaffPage from "@/Pages/Dashboard/Manager/StaffPage";
import InventoryPage from "@/Pages/Dashboard/Manager/InventoryPage";

// Chef Pages
import ChefOrdersPage from "@/Pages/Dashboard/Chef/OrdersPage";
import OrderDetailPage from "@/Pages/Dashboard/Chef/OrderDetailPage";

// Shared Pages
import MenuPage from "@/Pages/Dashboard/Manager/MenuPage";
import NotificationPage from "@/components/Shared/NotificationPage";
import SettingsPage from "@/components/Shared/SettingsPage";
import ProfilePage from "@/Pages/Settings/ProfilePage";
import ChangePasswordPage from "@/Pages/Settings/ChangePasswordPage";


// Role-based dashboard redirect component
// eslint-disable-next-line react-refresh/only-export-components
const DashboardRedirect = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    const role = user.role.toLowerCase();

    // Redirect to role-specific dashboard
    return <Navigate to={`/dashboard/${role}`} replace />;
  } catch (error) {
    console.error("Router page error", error);
    return <Navigate to="/signin" replace />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/signin" replace />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },
      // Admin Routes
      {
        path: "admin",
        element: <AdminDashboardPage />,
      },
      {
        path: "sale",
        element: <div>Sale Page</div>,
      },
      {
        path: "kitchen",
        element: <div>Kitchen Page</div>,
      },
      {
        path: "category",
        element: <div>Category Page</div>,
      },
      {
        path: "ingredients",
        element: <div>Ingredients Page</div>,
      },
      {
        path: "user",
        element: <div>User Page</div>,
      },
      {
        path: "user-roles",
        element: <div>User Roles Page</div>,
      },
      {
        path: "supplier",
        element: <div>Supplier Page</div>,
      },
      {
        path: "purchase-type",
        element: <div>Purchase Type Page</div>,
      },
      {
        path: "purchase",
        element: <div>Purchase Page</div>,
      },
      {
        path: "expense-type",
        element: <div>Expense Type Page</div>,
      },
      {
        path: "expenses",
        element: <div>Expenses Page</div>,
      },
      {
        path: "reports/overall-sales",
        element: <div>Overall Sales Report</div>,
      },
      {
        path: "reports/overall-expense",
        element: <div>Overall Expense Report</div>,
      },
      {
        path: "reports/most-sold-item",
        element: <div>Most Sold Item Report</div>,
      },
      {
        path: "reports/purchase-report",
        element: <div>Purchase Report</div>,
      },
      // Manager Routes
      {
        path: "manager",
        element: <ManagerDashboardPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      // Chef Routes
      {
        path: "chef",
        element: <ChefOrdersPage />,
      },
      {
        path: "orders",
        element: <ChefOrdersPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailPage />,
      },
      // Cashier Routes
      {
        path: "cashier",
        element: <ChefOrdersPage />,
      },
      // Shared Routes
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "notification",
        element: <NotificationPage />,
      },
      // Settings Routes (Common for all roles)
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/profile",
        element: <ProfilePage />,
      },
      {
        path: "settings/change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },
]);

export default router;
