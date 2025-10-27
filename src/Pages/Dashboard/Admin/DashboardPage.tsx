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
import { topItems } from "@/data/mockTopItem";
import { chartData } from "@/data/mockOrders";
import CustomAreaChart from "@/components/Charts/AreaChart";

import deliverIcon from "@/assets/icons/order.svg";

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
          <StatCard title="Total Order" value="77" image={deliverIcon} />
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
                  <SelectItem value="Years">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CustomAreaChart
              data={chartData[timeFilter as keyof typeof chartData]}
              xDataKey="month"
              yDataKey="orders"
              strokeColor="#07AC5E"
              gradientId="orderGradient"
              gradientStart="rgba(7, 172, 94, 0.1)"
              gradientEnd="rgba(7, 172, 94, 0.02)"
            />
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
      </main>
    </>
  );
}
