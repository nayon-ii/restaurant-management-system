// src/Pages/Dashboard/Chef/OrderDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import ItemDetailModal from "@/components/Modals/ItemDetailModal";

// Mock data structure
interface OrderItem {
  id: string;
  name: string;
  category: string;
  image: string;
  status: string;
  timeLeft: string;
  size?: string;
  extraIngredients?: string;
  note?: string;
}

interface OrderDetail {
  id: string;
  date: string;
  tableNo: string;
  orderType: string;
  totalAmount: string;
  timeLeft: string;
  status: string;
  items: OrderItem[];
}

const mockOrdersData: Record<string, OrderDetail> = {
  "001": {
    id: "001",
    date: "20 Aug 2025",
    tableNo: "6A",
    orderType: "Dine In",
    totalAmount: "$65",
    timeLeft: "10m",
    status: "Ready",
    items: [
      {
        id: "item-1",
        name: "Spicy Shawarma",
        category: "Hot Cool Spot",
        image: "/order1.png",
        status: "Ready",
        timeLeft: "0 min",
        size: "Medium",
        extraIngredients: "Cheese, Chicken",
        note: "Medium Rare, No salt",
      },
    ],
  },
  "002": {
    id: "002",
    date: "20 Aug 2025",
    tableNo: "6B",
    orderType: "Dine In",
    totalAmount: "$11",
    timeLeft: "00:05:10",
    status: "Ready",
    items: [
      {
        id: "item-1",
        name: "Spicy Shawarma",
        category: "Hot Cool Spot",
        image: "/order1.png",
        status: "Ready",
        timeLeft: "10 min",
        size: "Medium (12 inch)",
        extraIngredients: "Cheese, Chicken",
        note: "ABC",
      },
      {
        id: "item-2",
        name: "Spicy Shawarma",
        category: "Hot Cool Spot",
        image: "/order1.png",
        status: "Ready",
        timeLeft: "10 min",
        size: "Large",
        extraIngredients: "Extra Cheese",
        note: "Well done",
      },
    ],
  },
  "003": {
    id: "003",
    date: "20 Aug 2025",
    tableNo: "6C",
    orderType: "Dine In",
    totalAmount: "$45",
    timeLeft: "00:15:10",
    status: "Preparing",
    items: [
      {
        id: "item-1",
        name: "Cheese Pizza",
        category: "Italian",
        image: "/order1.png",
        status: "Preparing",
        timeLeft: "15 min",
        size: "Large",
        extraIngredients: "Extra Cheese",
        note: "Well done",
      },
    ],
  },
  "004": {
    id: "004",
    date: "20 Aug 2025",
    tableNo: "6D",
    orderType: "Dine In",
    totalAmount: "$32",
    timeLeft: "00:25:10",
    status: "Receive",
    items: [
      {
        id: "item-1",
        name: "Cheese Pizza",
        category: "Italian",
        image: "/order1.png",
        status: "Receive",
        timeLeft: "25 min",
        size: "Medium",
        extraIngredients: "Mushroom",
        note: "",
      },
    ],
  },
  "005": {
    id: "005",
    date: "20 Aug 2025",
    tableNo: "6E",
    orderType: "Dine In",
    totalAmount: "$28",
    timeLeft: "00:25:10",
    status: "Receive",
    items: [
      {
        id: "item-1",
        name: "Cheese Pizza",
        category: "Italian",
        image: "/order1.png",
        status: "Receive",
        timeLeft: "25 min",
        size: "Small",
        extraIngredients: "Olives, Peppers",
        note: "Extra spicy",
      },
    ],
  },
};

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemStatuses, setItemStatuses] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchOrder = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (orderId && mockOrdersData[orderId]) {
        const orderData = mockOrdersData[orderId];
        setOrder(orderData);

        // Initialize item statuses
        const statuses: Record<string, string> = {};
        orderData.items.forEach((item) => {
          statuses[item.id] = item.status;
        });
        setItemStatuses(statuses);
      } else {
        toast.error("Order not found");
        navigate("/dashboard/orders");
      }

      setIsLoading(false);
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handleStatusChange = (itemId: string, newStatus: string) => {
    setItemStatuses((prev) => ({
      ...prev,
      [itemId]: newStatus,
    }));
    toast.success("Item status updated");
  };

  const handleItemClick = (item: OrderItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "receive":
        return "text-foreground";
      case "ready":
        return "text-foreground";
      case "preparing":
        return "text-foreground";
      case "served":
        return "text-foreground";
      default:
        return "bg-muted hover:bg-muted/90";
    }
  };

  if (isLoading) {
    return (
      <>
        <DashboardHeader title="Order Details" />
        <main className="p-3 md:p-8 flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <LoadingSpinner size="lg" />
        </main>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <DashboardHeader title="Order Details" />
        <main className="p-3 md:p-8">
          <div className="text-center">
            <p className="text-muted-foreground">Order not found</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardHeader title="Order Details" />

      <main className="p-3 md:p-8">
        <div className="w-full mx-auto">
          {/* Back Button & Title */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/orders")}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-foreground">
              Order ID: {order.id}
            </h2>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-2xl border border-border shadow-[0px_8px_32px_0px_#00000026] p-7 space-y-3">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date
              </label>
              <Input
                value={order.date}
                readOnly
                className="bg-card border-input"
              />
            </div>

            {/* Order ID */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Order ID
              </label>
              <Input
                value={order.id}
                readOnly
                className="bg-card border-input"
              />
            </div>

            {/* Ordered Items */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ordered Items
              </label>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="flex items-center gap-4 p-3 bg-card rounded-xl border border-input hover:border-primary cursor-pointer transition-all"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-orange-600">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center text-foreground">
                        <Select
                          value={itemStatuses[item.id] || item.status}
                          onValueChange={(value) =>
                            handleStatusChange(item.id, value)
                          }
                        >
                          <SelectTrigger
                            onClick={(e) => e.stopPropagation()}
                            className={`border-0 rounded-full shadow-none ${getStatusColor(
                              itemStatuses[item.id] || item.status
                            )}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Preparing">Preparing</SelectItem>
                            <SelectItem value="Ready">Ready</SelectItem>
                            <SelectItem value="Served">Served</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.timeLeft}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table No */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Table No
              </label>
              <Input
                value={order.tableNo}
                readOnly
                className="bg-card border-input"
              />
            </div>

            {/* Total Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Amount
              </label>
              <Input
                value={order.totalAmount}
                readOnly
                className="bg-card border-input"
              />
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Order Type
              </label>
              <Input
                value={order.orderType}
                readOnly
                className="bg-card border-input"
              />
            </div>

            {/* Time Left */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Time Left
              </label>
              <Input
                value={order.timeLeft}
                readOnly
                className="bg-card border-input"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <Input
                value={order.status}
                readOnly
                className="bg-card border-input"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Item Detail Modal */}
      <ItemDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        currentStatus={
          selectedItem
            ? itemStatuses[selectedItem.id] || selectedItem.status
            : ""
        }
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
