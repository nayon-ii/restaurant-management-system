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
import { Users, Eye } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import processIcon from "@/assets/icons/process.svg";
import deliverIcon from "@/assets/icons/deliver.svg";
import { getStatusColor } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { UserRoleDisplay } from "@/components/UserRoleDisplay";

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

interface Order {
  id: string;
  date: string;
  tableNo: string;
  items: string;
  timeLeft: string;
  status: string;
  fullItems: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: "001",
    date: "20 Aug 2025",
    tableNo: "6A",
    items: "Cheese Pizza",
    timeLeft: "0",
    status: "Receive",
    fullItems: [
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
  {
    id: "002",
    date: "20 Aug 2025",
    tableNo: "6B",
    items: "Cheese Pizza",
    timeLeft: "00:05:10",
    status: "Ready",
    fullItems: [
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
    ],
  },
  {
    id: "003",
    date: "20 Aug 2025",
    tableNo: "6C",
    items: "Cheese Pizza",
    timeLeft: "00:15:10",
    status: "Preparing",
    fullItems: [
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
  {
    id: "004",
    date: "20 Aug 2025",
    tableNo: "6D",
    items: "Cheese Pizza",
    timeLeft: "00:25:10",
    status: "Receive",
    fullItems: [
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
  {
    id: "005",
    date: "20 Aug 2025",
    tableNo: "6E",
    items: "Cheese Pizza",
    timeLeft: "00:25:10",
    status: "Receive",
    fullItems: [
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
  {
    id: "006",
    date: "20 Aug 2025",
    tableNo: "7A",
    items: "Burger Combo",
    timeLeft: "00:10:00",
    status: "Preparing",
    fullItems: [
      {
        id: "item-1",
        name: "Burger Combo",
        category: "American",
        image: "/order1.png",
        status: "Preparing",
        timeLeft: "10 min",
        size: "Large",
        extraIngredients: "Extra Bacon",
        note: "",
      },
    ],
  },
  {
    id: "007",
    date: "20 Aug 2025",
    tableNo: "7B",
    items: "Pasta Alfredo",
    timeLeft: "00:20:00",
    status: "Receive",
    fullItems: [
      {
        id: "item-1",
        name: "Pasta Alfredo",
        category: "Italian",
        image: "/order1.png",
        status: "Receive",
        timeLeft: "20 min",
        size: "Regular",
        extraIngredients: "Parmesan",
        note: "Extra creamy",
      },
    ],
  },
  {
    id: "008",
    date: "20 Aug 2025",
    tableNo: "8A",
    items: "Sushi Roll",
    timeLeft: "00:12:00",
    status: "Ready",
    fullItems: [
      {
        id: "item-1",
        name: "Sushi Roll",
        category: "Japanese",
        image: "/order1.png",
        status: "Ready",
        timeLeft: "12 min",
        size: "8 pieces",
        extraIngredients: "Wasabi, Ginger",
        note: "",
      },
    ],
  },
];

const topItems = [
  {
    name: "Pizza",
    sold: "20 Sold",
    price: "$4,825",
    image: "/order1.png",
  },
  {
    name: "Pizza",
    sold: "20 Sold",
    price: "$4,825",
    image: "/order1.png",
  },
  {
    name: "Pizza",
    sold: "20 Sold",
    price: "$4,825",
    image: "/order1.png",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState("Day");

  const handleViewDetails = (orderId: string) => {
    navigate(`/dashboard/orders/${orderId}`);
  };

  return (
    <>
      <DashboardHeader title="Dashboard" />

      <main className="p-3 md:p-8 space-y-3 md:space-y-6">
        {/* Role-based Demo */}
        <UserRoleDisplay />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Staff"
            value="26"
            icon={<Users className="h-6 w-6 text-foreground" />}
          />
          <StatCard title="Order In Progress" value="80" image={processIcon} />
          <StatCard title="Total Delivered" value="77" image={deliverIcon} />
        </div>

        {/* Chart and Top Items Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Overview Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-md p-6">
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
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="orderGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(7, 172, 94, 0.1)" />
                    <stop offset="100%" stopColor="rgba(7, 172, 94, 0.02)" />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#07AC5E"
                  strokeWidth={3}
                  fill="url(#orderGradient)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Items */}
          <div className="bg-background p-3 md:p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Top Performing Items
            </h2>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-card hover:bg-secondary transition-colors shadow-lg"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden  bg-linear-to-br from-primary to-orange-600">
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
        <div className="bg-card rounded-2xl shadow-md">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Orders</h2>
          </div>

          <div className="overflow-x-auto rounded-b-xl">
            <table className="w-full rounded-b-xl">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-center p-4 font-semibold">Order ID</th>
                  <th className="text-center p-4 font-semibold">Date</th>
                  <th className="text-center p-4 font-semibold">Table No</th>
                  <th className="text-center p-4 font-semibold">Items</th>
                  <th className="text-center p-4 font-semibold">Time Left</th>
                  <th className="text-center p-4 font-semibold">Status</th>
                  <th className="text-center p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 5).map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-border text-center ${
                      index % 2 === 0 ? "bg-background" : "bg-card"
                    } hover:bg-accent/50 transition-colors`}
                  >
                    <td className="p-3 text-sm font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="p-3 text-sm text-foreground">
                      {order.date}
                    </td>
                    <td className="p-3 text-sm text-foreground">
                      {order.tableNo}
                    </td>
                    <td className="p-3 text-sm text-foreground">
                      {order.items}
                    </td>
                    <td className="p-3 text-sm font-medium text-foreground">
                      {order.timeLeft}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent"
                        onClick={() => handleViewDetails(order.id)}
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
