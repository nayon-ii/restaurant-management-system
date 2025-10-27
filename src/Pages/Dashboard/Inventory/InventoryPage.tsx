// src/Pages/Dashboard/Inventory
import { useState, useMemo, useEffect } from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import StatCard from "@/components/Shared/StatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  SlidersHorizontal,
  Pencil,
  DollarSign,
  Check,
} from "lucide-react";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import DeactivateModal from "@/components/Modals/DeactivateModal";
import EditInventoryModal from "@/components/Inventory/EditInventoryModal";
import { mockInventoryItems } from "@/data/mockInventory";
import type { InventoryItem } from "@/types/inventory";
import { Switch } from "@/components/ui/switch";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(mockInventoryItems);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ==== NEW: filter dropdown state ====
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  // ====================================

  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // ---- NEW: status filter logic ----
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? item.isActive
          : !item.isActive;
      // ----------------------------------

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, inventoryItems, statusFilter]); // ← added statusFilter

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const stats = useMemo(() => {
    const monthlySpend = 5326;
    const todaySpend = 205;
    return { monthlySpend, todaySpend };
  }, []);

  const handleStatusToggle = (item: InventoryItem) => {
    if (item.isActive) {
      setSelectedItem(item);
      setIsDeactivateModalOpen(true);
    } else {
      setInventoryItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isActive: true } : i))
      );
    }
  };

  const handleDeactivate = () => {
    if (selectedItem) {
      setInventoryItems((prev) =>
        prev.map((i) =>
          i.id === selectedItem.id ? { ...i, isActive: false } : i
        )
      );
    }
    setIsDeactivateModalOpen(false);
    setSelectedItem(null);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedItem: InventoryItem) => {
    setInventoryItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-md ${
              currentPage === i
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-foreground hover:bg-accent"
            }`}
            variant={currentPage === i ? "default" : "ghost"}
          >
            {i}
          </Button>
        );
      }
    } else {
      pages.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-10 h-10 rounded-md ${
            currentPage === 1
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-foreground hover:bg-accent"
          }`}
          variant={currentPage === 1 ? "default" : "ghost"}
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis1" className="text-muted-foreground">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-md ${
              currentPage === i
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-foreground hover:bg-accent"
            }`}
            variant={currentPage === i ? "default" : "ghost"}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis2" className="text-muted-foreground">
            ...
          </span>
        );
      }

      pages.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 rounded-md ${
            currentPage === totalPages
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-foreground hover:bg-accent"
          }`}
          variant={currentPage === totalPages ? "default" : "ghost"}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <>
      <DashboardHeader
        title="Ingredient Management"
        subtitle="Track Your Ingredient Stock"
      />

      <main className="p-3 md:p-8 space-y-3 md:space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Monthly Spend"
            value={`$${stats.monthlySpend.toLocaleString()}`}
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
          <StatCard
            title="Today's Spend"
            value={`$${stats.todaySpend}`}
            icon={<DollarSign className="h-6 w-6 text-foreground" />}
          />
        </div>

        {/* Ingredients Section */}
        <div className="bg-card rounded-2xl border border-border shadow-sm pb-5">
          <div className="p-5 border-b border-border">
            <h2 className="text-2xl font-semibold text-foreground">
              Ingredients
            </h2>
          </div>

          {/* Search + Filter */}
          <div className="p-5 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Staff"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-12 bg-background"
              />
            </div>

            {/* ==== FILTER BUTTON & DROPDOWN ==== */}
            <div className="relative">
              <Button
                variant="outline"
                className="h-12 px-4 border-input hover:bg-accent"
                onClick={() => setShowFilter((v) => !v)}
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                {statusFilter === "all"
                  ? "All"
                  : statusFilter === "active"
                  ? "Active"
                  : "Deactivate"}
              </Button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border p-2 z-10">
                  {(["all", "active", "inactive"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setStatusFilter(opt);
                        setCurrentPage(1);
                        setShowFilter(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      <span className="capitalize">
                        {opt === "inactive" ? "Deactivate" : opt}
                      </span>
                      {statusFilter === opt && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* =================================== */}
          </div>

          {/* Table */}
          <div className="overflow-x-auto scrollbar-thin mx-auto md:mx-5 border rounded-t-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-center p-4 font-semibold">Name</th>
                  <th className="text-center p-4 font-semibold">Sufficient</th>
                  <th className="text-center p-4 font-semibold">Low</th>
                  <th className="text-center p-4 font-semibold">
                    Out of stock
                  </th>
                  <th className="text-center p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton columns={5} />
                ) : paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-2 md:p-5 text-center">
                      <p className="text-muted-foreground">
                        No inventory items found
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-border text-center ${
                        index % 2 === 0 ? "bg-background" : "bg-card"
                      } hover:bg-accent/50 transition-colors`}
                    >
                      <td className="p-4 text-sm text-foreground">
                        {item.name}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {item.sufficient}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {item.low}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {item.outOfStock}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-accent"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-5 w-5 text-foreground" />
                          </Button>
                          <Switch
                            checked={item.isActive}
                            onCheckedChange={() => handleStatusToggle(item)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {!isLoading && paginatedItems.length > 0 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="rounded-md bg-card shadow-[0px_8px_32px_0px_#00000026]"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </Button>
            <div className="flex items-center gap-2">{renderPageNumbers()}</div>
            <Button
              variant="outline"
              className="rounded-md bg-card shadow-[0px_8px_32px_0px_#00000026]"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}
      <DeactivateModal
        isOpen={isDeactivateModalOpen}
        onClose={() => {
          setIsDeactivateModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleDeactivate}
        title="Are you sure you want to deactivate this ingredient?"
      />

      <EditInventoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        onSave={handleSaveEdit}
      />
    </>
  );
}
