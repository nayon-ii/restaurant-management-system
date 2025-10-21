// src/Pages/Dashboard/Shared/SettingsPage.tsx
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Welcome, Nayon" subtitle="Have a good day" />
      <main className="p-8 space-y-6">
        <div className="bg-card flex justify-between items-center rounded-md shadow-md p-4 hover:shadow-xl">
          <Link to="/" className="text-xl font-medium">
            Personal Information
          </Link>
          <ChevronRight className="w-4 h-4" />
        </div>

        <div className="bg-card flex justify-between items-center rounded-md shadow-md p-4 hover:shadow-xl">
          <Link to="/" className="text-xl font-medium">
            Change Password
          </Link>
          <ChevronRight className="w-4 h-4" />
        </div>
      </main>
    </>
  );
}
