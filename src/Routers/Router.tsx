// src\Routers\Router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/Layouts/MainLayout";
import SignIn from "@/Pages/Authentication/SignIn";
import ForgetPassword from "@/Pages/Authentication/ForgetPassword";
import ResetPassword from "@/Pages/Authentication/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Add your routes here
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
]);

export default router;
