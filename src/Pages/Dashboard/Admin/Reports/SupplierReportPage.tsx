// SUPPLIER REPORT PAGE - src/Pages/Dashboard/Admin/Reports/SupplierReportPage.tsx
import { useState, useMemo, useEffect } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatCard from "@/components/Shared/StatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Printer } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import { mockBills, mockSuppliers } from "@/data/mockSuppliers";

export default function SupplierReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredBills = useMemo(() => {
    return mockBills.filter((bill) => {
      const matchesSearch =
        bill.billId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  const paginatedBills = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBills.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBills, currentPage]);

  const totals = useMemo(() => {
    const totalSuppliers = mockSuppliers.length;
    const totalAmount = filteredBills.reduce(
      (sum, b) => sum + b.totalAmount,
      0
    );
    const totalPaid = filteredBills.reduce((sum, b) => sum + b.paid, 0);
    const totalDue = filteredBills.reduce((sum, b) => sum + b.due, 0);

    return { totalSuppliers, totalAmount, totalPaid, totalDue };
  }, [filteredBills]);

  const handlePrint = () => {
    toast.success("Print functionality will be implemented");
  };

  return (
    <>
      <DashboardHeader
        title="Supplier Report"
        subtitle="Track Your Restaurant Supplier Report"
      />

      <main className="p-3 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Suppliers"
            value={totals.totalSuppliers.toString()}
          />
          <StatCard
            title="Total Amount"
            value={`${totals.totalAmount.toFixed(2)}`}
          />
          <StatCard
            title="Total Paid"
            value={`${totals.totalPaid.toFixed(2)}`}
          />
          <StatCard title="Total Due" value={`${totals.totalDue.toFixed(2)}`} />
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm pb-5">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Supplier Report
            </h2>
            <Button
              onClick={handlePrint}
              className="bg-primary hover:bg-primary/80 text-white rounded-sm px-4 py-2 flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print
            </Button>
          </div>

          <div className="p-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Supplier..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-12 bg-background"
              />
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-thin mx-5 border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left p-4 font-semibold">Bill ID</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Supplier</th>
                  <th className="text-center p-4 font-semibold">Total</th>
                  <th className="text-right p-4 font-semibold">Paid</th>
                  <th className="text-right p-4 font-semibold">Due</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton columns={6} />
                ) : paginatedBills.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-5 text-center text-muted-foreground"
                    >
                      No supplier bills found
                    </td>
                  </tr>
                ) : (
                  paginatedBills.map((bill, index) => (
                    <tr
                      key={bill.id}
                      className={`border-b border-border ${
                        index % 2 === 0 ? "bg-background" : "bg-card"
                      } hover:bg-accent/50 transition-colors`}
                    >
                      <td className="p-4">{bill.billId}</td>
                      <td className="p-4">{bill.date}</td>
                      <td className="p-4">{bill.supplier}</td>
                      <td className="p-4 text-center">
                        ${bill.totalAmount.toFixed(2)}
                      </td>
                      <td className="p-4 text-right text-green-600">
                        ${bill.paid.toFixed(2)}
                      </td>
                      <td className="p-4 text-right text-red-600">
                        ${bill.due.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
