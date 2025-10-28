// KITCHEN PAGE - src/Pages/Dashboard/Admin/Kitchen/KitchenPage.tsx
import { useState, useMemo, useEffect } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { mockOrders } from "@/data/mockOrders";
import type { Order, OrderStatus } from "@/types/order";
import { toast } from "sonner";
import { KitchenColumn } from "@/components/Kitchen/KitchenColumn";

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const groupedOrders = useMemo(() => {
    return {
      received: orders.filter((o) => o.status === "Receive"),
      preparing: orders.filter((o) => o.status === "Preparing"),
      ready: orders.filter((o) => o.status === "Ready"),
      served: orders.filter((o) => o.status === "Served"),
    };
  }, [orders]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success("Order status updated successfully");
  };

  return (
    <>
      <DashboardHeader title="KITCHEN DISPLAY" />

      <main className="p-3 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Received Orders Column */}
          <KitchenColumn
            title="Received Orders"
            orders={groupedOrders.received}
            status="Receive"
            bgColor="bg-[#2294C5]"
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
          />

          {/* Preparing Orders Column */}
          <KitchenColumn
            title="Preparing Orders"
            orders={groupedOrders.preparing}
            status="Preparing"
            bgColor="bg-[#B8860B]"
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
          />

          {/* Ready Column */}
          <KitchenColumn
            title="Ready"
            orders={groupedOrders.ready}
            status="Ready"
            bgColor="bg-[#22C55E]"
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
          />

          {/* Served Column */}
          <KitchenColumn
            title="Served"
            orders={groupedOrders.served}
            status="Served"
            bgColor="bg-[#00A789]"
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>
    </>
  );
}
