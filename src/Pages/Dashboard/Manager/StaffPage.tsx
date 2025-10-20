// src/Pages/Dashboard/Manager/StaffPage.tsx
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function StaffPage() {
  return (
    <>
      <DashboardHeader title="Staff Management" />
      <main className="p-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Staff Management
          </h2>
          <p className="text-muted-foreground">
            Staff management content will be implemented here.
          </p>
        </div>
      </main>
    </>
  );
}
