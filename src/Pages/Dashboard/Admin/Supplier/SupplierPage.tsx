// SUPPLIER PAGE - src/Pages/Dashboard/Supplier/SupplierPage.tsx
import { useState, useMemo, useEffect } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatCard from "@/components/Shared/StatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import AddSupplierModal from "@/components/Supplier/AddSupplierModal";
import { mockSuppliers, mockBills } from "@/data/mockSuppliers";
import type { Supplier, SupplierStats } from "@/types/supplier";
import { DueBillsSection } from "@/components/Supplier/DueBillsSection";
import { Pagination } from "@/components/Shared/Pagination";

export default function SupplierPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [activeTab, setActiveTab] = useState<"all" | "due" | "suppliers">(
    "due"
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const stats: SupplierStats = useMemo(() => {
    const totalSuppliers = suppliers.length;
    const totalBills = mockBills.length;
    const totalPurchases = 5326;
    const totalAmount = 5326;
    const totalPaid = 5326;
    const totalDue = 5326;

    return {
      totalSuppliers,
      totalBills,
      totalPurchases,
      totalAmount,
      totalPaid,
      totalDue,
    };
  }, [suppliers]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery, suppliers]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSuppliers, currentPage]);

  const handleAddSupplier = (
    supplierData: Omit<Supplier, "id" | "createdAt" | "updatedAt">
  ) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: `sup-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSuppliers((prev) => [newSupplier, ...prev]);
    setIsAddModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <>
      <DashboardHeader
        title="Supplier Management"
        subtitle="Manage suppliers, purchases, and payments"
      />

      <main className="p-3 md:p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Suppliers"
            value={stats.totalSuppliers.toString()}
          />
          <StatCard title="Total Bills" value={stats.totalBills.toString()} />
          <StatCard
            title="Total Purchases"
            value={`$${stats.totalPurchases.toLocaleString()}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Amount"
            value={`$${stats.totalAmount.toLocaleString()}`}
          />
          <StatCard
            title="Total Paid"
            value={`$${stats.totalPaid.toLocaleString()}`}
          />
          <StatCard
            title="Total Due"
            value={`$${stats.totalDue.toLocaleString()}`}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab("all")}
            className={`flex-1 h-12 rounded-xl ${
              activeTab === "all"
                ? "bg-card text-foreground border border-border"
                : "bg-card text-muted-foreground border border-border"
            }`}
            variant="ghost"
          >
            All Bill
          </Button>
          <Button
            onClick={() => setActiveTab("due")}
            className={`flex-1 h-12 rounded-xl ${
              activeTab === "due"
                ? "bg-primary text-white"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            Due Bills
          </Button>
          <Button
            onClick={() => setActiveTab("suppliers")}
            className={`flex-1 h-12 rounded-xl ${
              activeTab === "suppliers"
                ? "bg-card text-foreground border border-border"
                : "bg-card text-muted-foreground border border-border"
            }`}
            variant="ghost"
          >
            Suppliers
          </Button>
        </div>

        {/* Due Bills Section */}
        {activeTab === "all" && (
          <DueBillsSection bills={mockBills} isLoading={isLoading} />
        )}

        {activeTab === "due" && (
          <DueBillsSection
            bills={mockBills.filter((bill) => bill.due > 0)}
            isLoading={isLoading}
          />
        )}

        {/* Suppliers Section */}
        {activeTab === "suppliers" && (
          <div className="bg-card rounded-2xl border border-border shadow-sm pb-5">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">
                Supplier
              </h2>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1 bg-primary hover:bg-primary/80 rounded-sm px-4 py-2.5 text-white"
              >
                <Plus className="w-5 h-5" />
                Add Supplier
              </Button>
            </div>

            <div className="p-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search Bill..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 h-12 bg-background"
                />
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin mx-5 border rounded-t-xl">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-center p-4 font-semibold">Name</th>
                    <th className="text-center p-4 font-semibold">Number</th>
                    <th className="text-center p-4 font-semibold">Email</th>
                    <th className="text-center p-4 font-semibold">Location</th>
                    <th className="text-center p-4 font-semibold">Total</th>
                    <th className="text-center p-4 font-semibold">Paid</th>
                    <th className="text-center p-4 font-semibold">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableSkeleton columns={7} />
                  ) : paginatedSuppliers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-5 text-center text-muted-foreground"
                      >
                        No suppliers found
                      </td>
                    </tr>
                  ) : (
                    paginatedSuppliers.map((supplier, index) => (
                      <tr
                        key={supplier.id}
                        className={`border-b border-border text-center ${
                          index % 2 === 0 ? "bg-background" : "bg-card"
                        } hover:bg-accent/50 transition-colors`}
                      >
                        <td className="p-4 text-sm">{supplier.name}</td>
                        <td className="p-4 text-sm">{supplier.number}</td>
                        <td className="p-4 text-sm">{supplier.email}</td>
                        <td className="p-4 text-sm">{supplier.location}</td>
                        <td className="p-4 text-sm">${supplier.total}</td>
                        <td className="p-4 text-sm">${supplier.paid}</td>
                        <td className="p-4 text-sm">${supplier.due}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading &&
          (activeTab === "suppliers"
            ? paginatedSuppliers.length > 0
            : mockBills.length > 0) && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
      </main>

      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSupplier}
      />
    </>
  );
}
