import SalesByCategoryCard from "./SalesByCategoryCard";
import { mockSalesByCategory } from "@/data/mockTopSellingItems";

export default function SalesByCategorySection() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0px_8px_32px_0px_#00000026] p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Sales by Category
      </h2>

      {/* Categories List */}
      <div className="space-y-6">
        {mockSalesByCategory.map((category) => (
          <SalesByCategoryCard
            key={category.id}
            category={category.category}
            revenue={category.revenue}
            percentage={category.percentage}
            orders={category.orders}
          />
        ))}
      </div>
    </div>
  );
}
