// src/Pages/Dashboard/Admin/DashboardPage.tsx
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
import { DollarSign } from "lucide-react";
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
  { month: "Jan", earnings: 50 },
  { month: "Feb", earnings: 120 },
  { month: "Mar", earnings: 80 },
  { month: "Apr", earnings: 40 },
  { month: "May", earnings: 70 },
  { month: "Jun", earnings: 90 },
  { month: "Jul", earnings: 150 },
  { month: "Aug", earnings: 120 },
  { month: "Sep", earnings: 180 },
  { month: "Oct", earnings: 200 },
  { month: "Nov", earnings: 170 },
  { month: "Dec", earnings: 80 },
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

export default function AdminDashboardPage() {
  const [timeFilter, setTimeFilter] = useState("Years");

  return (
    <>
      <DashboardHeader title="Admin Dashboard" />

      <main className="p-3 md:p-8 space-y-3 md:space-y-6">
        {/* Statistics Cards - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Today's Earning"
            value="$10,926"
            valueColor="text-[#22c55e]"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Total Cost"
            value="$5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Total Discount"
            value="$326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
        </div>

        {/* Statistics Cards - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Profit"
            value="$5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Tax Amount"
            value="$5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Total Payable"
            value="$5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
        </div>

        {/* Statistics Cards - Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Expenses"
            value="$5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Profit After Expenses"
            value="$5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Total Orders"
            value="5,326"
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
        </div>

        {/* Chart and Top Items Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earning Overview Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Earning Overview
              </h2>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-28 border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Week">Week</SelectItem>
                  <SelectItem value="Month">Month</SelectItem>
                  <SelectItem value="Years">Years</SelectItem>
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
                  dataKey="earnings"
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
      </main>
    </>
  );
}
