// KITCHEN ORDER CARD - src/components/Kitchen/KitchenOrderCard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import { RoleGuard } from "../RoleGuard";

interface KitchenOrderCardProps {
  order: Order;
  currentStatus: OrderStatus;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function KitchenOrderCard({
  order,
  currentStatus,
  onStatusChange,
}: KitchenOrderCardProps) {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Receive":
        return "bg-[#2294C5]";
      case "Preparing":
        return "bg-[#B8860B]";
      case "Ready":
        return "bg-[#22C55E]";
      case "Served":
        return "bg-[#00A789]";
      default:
        return "bg-primary";
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      Receive: "Preparing",
      Preparing: "Ready",
      Ready: "Served",
      Served: null,
    };
    return statusFlow[currentStatus];
  };

  const handleStatusUpdate = async () => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onStatusChange(order.id, nextStatus);
    setIsUpdating(false);
  };

  const handleViewDetails = () => {
    navigate(`/dashboard/orders/${order.id}`);
  };

  const nextStatus = getNextStatus(currentStatus);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Card Header */}
      <div
        className={`${getStatusColor(
          currentStatus
        )} text-white py-2 px-4 flex items-center justify-between`}
      >
        <span className="font-semibold">Order No: {order.id}</span>
        <span className="text-sm font-medium">{currentStatus}</span>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Table Number */}
        <div className="text-sm">
          <span className="font-semibold text-foreground">Table No: </span>
          <span className="text-foreground">{order.tableNo}</span>
        </div>

        {/* Order Items */}
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="text-sm text-foreground"
            >
              <span className="font-medium">{item.quantity}</span> * {item.name}
            </div>
          ))}
        </div>

        {/* Time Left */}
        <div className="text-right">
          <span className="text-sm text-muted-foreground">
            {order.timeLeft}
          </span>
        </div>

        <RoleGuard allowedRoles={[""]} canTrigger={[""]}>
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {nextStatus && (
              <Button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className={`flex-1 ${getStatusColor(
                  nextStatus
                )} hover:opacity-90 text-white h-9 text-sm`}
              >
                {isUpdating ? "Updating..." : `Mark as ${nextStatus}`}
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={handleViewDetails}
              className="hover:bg-accent h-9 w-9"
            >
              <Eye className="h-4 w-4 text-foreground" />
            </Button>
          </div>
        </RoleGuard>
      </div>
    </div>
  );
}
