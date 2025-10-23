// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routers/Router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { ReduxProvider } from "./redux/providers/ReduxProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="light"
          storageKey="restaurant-theme"
          // forcedTheme="light"
        >
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ReduxProvider>
  </StrictMode>
);
