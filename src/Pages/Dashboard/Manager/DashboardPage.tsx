// src/Pages/Dashboard/Manager/DashboardPage.tsx
import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatCard from "@/components/Shared/StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBag, Truck, Eye } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", orders: 50 },
  { month: "Feb", orders: 120 },
  { month: "Mar", orders: 80 },
  { month: "Apr", orders: 40 },
  { month: "May", orders: 70 },
  { month: "Jun", orders: 90 },
  { month: "Jul", orders: 150 },
  { month: "Aug", orders: 120 },
  { month: "Sep", orders: 180 },
  { month: "Oct", orders: 200 },
  { month: "Nov", orders: 170 },
  { month: "Dec", orders: 80 },
];

const mockOrders = [
  {
    id: "006",
    date: "20 Aug 2025",
    tableNo: "6D",
    items: "Cheese Pizza",
    timeLeft: "00:25:10",
    status: "Pending",
  },
  {
    id: "005",
    date: "20 Aug 2025",
    tableNo: "6E",
    items: "Cheese Pizza",
    timeLeft: "00:25:10",
    status: "Receive",
  },
  {
    id: "003",
    date: "20 Aug 2025",
    tableNo: "6C",
    items: "Cheese Pizza",
    timeLeft: "00:15:10",
    status: "Preparing",
  },
];

const topItems = [
  {
    name: "Pizza",
    sold: "20 Sold",
    price: "$4,825",
    image: "/placeholder-food.jpg",
  },
  {
    name: "Pizza",
    sold: "20 Sold",
    price: "$4,825",
    image: "/placeholder-food.jpg",
  },
  {
    name: "Pizza",
    sold: "20 Sold",
    price: "$4,825",
    image: "/placeholder-food.jpg",
  },
];

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState("Day");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "receive":
        return "bg-[#28a5dd] text-white";
      case "pending":
        return "bg-[#84cc16] text-white";
      case "preparing":
        return "bg-[#d4a12e] text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <>
      <DashboardHeader title="Dashboard" />

      <main className="p-3 md:p-8 space-y-3 md:space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Staff"
            value="26"
            icon={<Users className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Total Orders"
            value="80"
            icon={<ShoppingBag className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Customers Served"
            value="77"
            icon={<Truck className="h-6 w-6 text-foreground" />}
          />
        </div>

        {/* Chart and Top Items Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Overview Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Order Overview
              </h2>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-28 border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Week">Week</SelectItem>
                  <SelectItem value="Month">Month</SelectItem>
                  <SelectItem value="Year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="month"
                  stroke="#737373"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#737373" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Items */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Top Performing Items
            </h2>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-orange-600">
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
                    <p className="font-semibold text-sm text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.sold}</p>
                  </div>
                  <p className="font-bold text-foreground">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Orders</h2>
          </div>

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
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
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
        </div>
      </main>
    </>
  );
}
