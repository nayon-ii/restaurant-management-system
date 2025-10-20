// src/Pages/Dashboard/Chef/OrdersPage.tsx
import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatCard from "@/components/Shared/StatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Eye } from "lucide-react";

import orderIcon from "@/assets/icons/order.svg";
import processIcon from "@/assets/icons/process.svg";
import deliverIcon from "@/assets/icons/deliver.svg";

const mockOrders = [
  {
    id: "001",
    date: "20 Aug 2025",
    tableNo: "6A",
    items: "Cheese Pizza",
    timeLeft: "0",
    status: "Receive",
  },
  {
    id: "002",
    date: "20 Aug 2025",
    tableNo: "6B",
    items: "Cheese Pizza",
    timeLeft: "00:05:10",
    status: "Ready",
  },
  {
    id: "003",
    date: "20 Aug 2025",
    tableNo: "6C",
    items: "Cheese Pizza",
    timeLeft: "00:15:10",
    status: "Preparing",
  },
  {
    id: "004",
    date: "20 Aug 2025",
    tableNo: "6D",
    items: "Cheese Pizza",
    timeLeft: "00:25:10",
    status: "Receive",
  },
  {
    id: "005",
    date: "20 Aug 2025",
    tableNo: "6E",
    items: "Cheese Pizza",
    timeLeft: "00:25:10",
    status: "Receive",
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {}
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "receive":
        return "bg-[#28a5dd] hover:bg-[#28a5dd]/90 text-white";
      case "ready":
        return "bg-[#22c55e] hover:bg-[#22c55e]/90 text-white";
      case "preparing":
        return "bg-[#d4a12e] hover:bg-[#d4a12e]/90 text-white";
      default:
        return "bg-muted hover:bg-muted/90";
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  return (
    <>
      <DashboardHeader title="Order Management" />

      <main className="p-8 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Order" value="26" image={orderIcon} />
          <StatCard title="Order In Progress" value="26" image={processIcon} />
          <StatCard title="Total Delivered" value="26" image={deliverIcon} />
        </div>

        {/* Orders Table Section */}
        <div className="bg-card rounded-2xl border border-border shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Orders</h2>
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b border-border flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Order"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-input"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left py-4 px-6 font-semibold">Date</th>
                  <th className="text-left py-4 px-6 font-semibold">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 font-semibold">
                    Table No
                  </th>
                  <th className="text-left py-4 px-6 font-semibold">Items</th>
                  <th className="text-left py-4 px-6 font-semibold">
                    Time Left
                  </th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-border ${
                      index % 2 === 0 ? "bg-background" : "bg-card"
                    } hover:bg-accent/50 transition-colors`}
                  >
                    <td className="py-4 px-6 text-sm text-foreground">
                      {order.date}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="py-4 px-6 text-sm text-foreground">
                      {order.tableNo}
                    </td>
                    <td className="py-4 px-6 text-sm text-foreground">
                      {order.items}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-foreground">
                      {order.timeLeft}
                    </td>
                    <td className="py-4 px-6">
                      <Select
                        value={selectedStatus[order.id] || order.status}
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger
                          className={`w-36 border-0 ${getStatusColor(
                            selectedStatus[order.id] || order.status
                          )}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Receive">Receive</SelectItem>
                          <SelectItem value="Preparing">Preparing</SelectItem>
                          <SelectItem value="Ready">Ready</SelectItem>
                          <SelectItem value="Served">Served</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent"
                      >
                        <Eye className="h-5 w-5 text-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 flex items-center justify-between">
            <Button variant="outline" className="border-input">
              ← Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button className="w-10 h-10 bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="ghost" className="w-10 h-10">
                2
              </Button>
              <Button variant="ghost" className="w-10 h-10">
                3
              </Button>
              <Button variant="ghost" className="w-10 h-10">
                4
              </Button>
              <Button variant="ghost" className="w-10 h-10">
                5
              </Button>
              <span className="text-muted-foreground">...</span>
            </div>
            <Button variant="outline" className="border-input">
              Next →
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
