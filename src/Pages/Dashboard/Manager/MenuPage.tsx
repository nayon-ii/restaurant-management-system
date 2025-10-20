// src/Pages/Dashboard/Manager/MenuPage.tsx
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function MenuPage() {
  return (
    <>
      <DashboardHeader title="Menu Management" />
      <main className="p-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Menu Management
          </h2>
          <p className="text-muted-foreground">
            Menu management content will be implemented here.
          </p>
        </div>
      </main>
    </>
  );
}
