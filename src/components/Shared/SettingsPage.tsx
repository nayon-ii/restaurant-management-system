// src/Pages/Dashboard/Shared/SettingsPage.tsx
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <main className="p-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Settings Page
          </h2>
          <p className="text-muted-foreground">
            Settings content will be implemented here.
          </p>
        </div>
      </main>
    </>
  );
}
