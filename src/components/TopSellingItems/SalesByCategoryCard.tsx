interface SalesByCategoryCardProps {
  category: string;
  revenue: number;
  percentage: number;
  orders: number;
}

export default function SalesByCategoryCard({
  category,
  revenue,
  percentage,
  orders,
}: SalesByCategoryCardProps) {
  return (
    <div className="space-y-3">
      {/* Header with category name and revenue */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-sm md:text-base">
          {category}
        </h3>
        <p className="font-bold text-foreground text-sm md:text-base">
          ${revenue.toLocaleString()}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer with percentage and orders */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{orders} orders</p>
        <p className="text-xs font-semibold text-foreground">{percentage}%</p>
      </div>
    </div>
  );
}
