// src/Routers/Router.tsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SignIn from "@/Pages/Authentication/SignIn";
import ForgetPassword from "@/Pages/Authentication/ForgetPassword";
import ResetPassword from "@/Pages/Authentication/ResetPassword";

// Admin Pages
import AdminDashboardPage from "@/Pages/Dashboard/Admin/DashboardPage";

// Manager Pages
import ManagerDashboardPage from "@/Pages/Dashboard/Manager/DashboardPage";
import StaffPage from "@/Pages/Dashboard/Manager/StaffPage";
import InventoryPage from "@/Pages/Dashboard/Inventory/InventoryPage";

// Chef Pages
import OrdersPage from "@/Pages/Dashboard/Order/OrdersPage";
import OrderDetailPage from "@/Pages/Dashboard/Order/OrderDetailPage";

// Shared Pages
import NotificationPage from "@/components/Shared/NotificationPage";
import SettingsPage from "@/components/Shared/SettingsPage";
import ProfilePage from "@/Pages/Settings/ProfilePage";
import ChangePasswordPage from "@/Pages/Settings/ChangePasswordPage";
import CreateOrderPage from "@/Pages/Dashboard/Order/CreateOrderPage";
import AuthLayout from "@/Layouts/AuthLayout";
import DashboardRedirect from "@/components/DashboardRedirect";
import RootRedirect from "@/components/RootRedirect";
import MenuPage from "@/Pages/Dashboard/Menu/MenuPage";
import AddMenuPage from "@/Pages/Dashboard/Menu/AddMenuPage";
import EditMenuPage from "@/Pages/Dashboard/Menu/EditMenuPage";
import SalesPage from "@/Pages/Dashboard/Admin/Sales/SalesPage";
import SalesDetailsPage from "@/Pages/Dashboard/Admin/Sales/SalesDetailsPage";
import KitchenPage from "@/Pages/Dashboard/Admin/Kitchen/KitchenPage";
import TablePage from "@/Pages/Dashboard/Admin/Table/TablePage";
import CategoryPage from "@/Pages/Dashboard/Admin/Category/CategoryPage";
import IngredientsPage from "@/Pages/Dashboard/Admin/Ingredients/IngredientsPage";
import UserPage from "@/Pages/Dashboard/Admin/User/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  // Public Routes (AuthLayout)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  // Protected Routes (DashboardLayout)
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
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "sales/:orderId",
        element: <SalesDetailsPage />,
      },
      {
        path: "kitchen",
        element: <KitchenPage />,
      },
      {
        path: "table",
        element: <TablePage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "ingredients",
        element: <IngredientsPage />,
      },
      {
        path: "user",
        element: <UserPage />,
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
        element: <OrdersPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailPage />,
      },
      {
        path: "order/create",
        element: <CreateOrderPage />,
      },
      // Cashier Routes
      {
        path: "cashier",
        element: <OrdersPage />,
      },
      // Shared Routes
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "menu/add",
        element: <AddMenuPage />,
      },
      {
        path: "menu/:id",
        element: <EditMenuPage />,
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
