// src/Layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function MainLayout() {
  return (
    <>
      {/* Add structured data once in main layout */}
      <OrganizationSchema />
      <WebSiteSchema />

      <header className="border-b bg-red-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Restaurant Management</h1>
          <ThemeToggle />
        </div>
      </header>

      <div>
        <Outlet />
      </div>
    </>
  );
}

// import { Outlet } from "react-router";
// export default function MainLayout() {
//   return (
//     <div>
//       <Outlet />
//     </div>
//   );
// }
