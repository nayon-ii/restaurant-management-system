// src/Pages/Dashboard/Manager/InventoryPage.tsx
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function InventoryPage() {
  return (
    <>
      <DashboardHeader title="Inventory Management" />
      <main className="p-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Inventory Management
          </h2>
          <p className="text-muted-foreground">
            Inventory management content will be implemented here.
          </p>
        </div>
      </main>
    </>
  );
}
