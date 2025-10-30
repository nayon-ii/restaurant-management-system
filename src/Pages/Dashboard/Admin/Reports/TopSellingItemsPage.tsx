
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import TopSellingItemsSection from "@/components/TopSellingItems/TopSellingItemsSection";
import SalesByCategorySection from "@/components/TopSellingItems/SalesByCategorySection";

export default function TopSellingItemsPage() {
  return (
    <>
      <DashboardHeader
        title="Most Sold Item Report"
        subtitle="Track Your Restaurant Most Sold Item Report"
      />

      <main className="p-3 md:p-8 space-y-6">
        <TopSellingItemsSection />

        <SalesByCategorySection />
      </main>
    </>
  );
}
