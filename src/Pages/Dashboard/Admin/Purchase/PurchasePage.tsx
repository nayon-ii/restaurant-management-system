// PURCHASE PAGE - src/Pages/Dashboard/Purchase/PurchasePage.tsx
// ============================================
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Plus, Eye, Pencil } from "lucide-react";
import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";
import ViewPurchaseModal from "@/components/Purchase/ViewPurchaseModal";
import { mockPurchases, mockPurchaseStats } from "@/data/mockPurchases";
import type { Purchase } from "@/types/purchase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PurchasePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, ] = useState<Purchase[]>(mockPurchases);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const matchesSearch =
        purchase.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesFilter =
        filterType === "all" ||
        purchase.items.some(
          (item) => item.name.toLowerCase() === filterType.toLowerCase()
        );

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, purchases, filterType]);

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const paginatedPurchases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPurchases.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPurchases, currentPage]);

  const handleView = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  const handleEdit = (purchaseId: string) => {
    navigate(`/dashboard/purchase/${purchaseId}`);
  };

  const handleAdd = () => {
    navigate("/dashboard/purchase/add");
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
        title="Purchase"
        subtitle="Track and manage business Purchase"
      />

      <main className="p-3 md:p-8 space-y-3 md:space-y-6">
        {/* Recent Purchase Section */}
        <div className="bg-card rounded-2xl border border-border shadow-[0px_8px_32px_0px_#00000026] pb-5">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Recent Purchase
            </h2>
            <Button
              onClick={handleAdd}
              className="flex items-center justify-center gap-1 bg-primary hover:bg-primary/80 shadow-lg hover:shadow-xl rounded-md px-4 py-2.5 text-white transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Purchase
            </Button>
          </div>

          <div className="p-5 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Order..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-12 bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-4 border-input hover:bg-accent"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterType("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("rice")}>
                  Rice
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("chicken")}>
                  Chicken
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("cheese")}>
                  Cheese
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("beef")}>
                  Beef
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-x-auto scrollbar-thin mx-auto md:mx-5 border rounded-t-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-center p-4 font-semibold">Invoice No</th>
                  <th className="text-center p-4 font-semibold">Ingredient</th>
                  <th className="text-center p-4 font-semibold">Quantity</th>
                  <th className="text-center p-4 font-semibold">Price</th>
                  <th className="text-center p-4 font-semibold">
                    Purchase date
                  </th>
                  <th className="text-center p-4 font-semibold">Supplier</th>
                  <th className="text-center p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton columns={7} />
                ) : paginatedPurchases.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-2 md:p-5 text-center">
                      <p className="text-muted-foreground">
                        No purchases found
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedPurchases.map((purchase, index) => (
                    <tr
                      key={purchase.id}
                      className={`border-b border-border text-center ${
                        index % 2 === 0 ? "bg-background" : "bg-card"
                      } hover:bg-accent/50 transition-colors`}
                    >
                      <td className="p-4 text-sm text-foreground">
                        {purchase.invoiceNo}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {purchase.items[0]?.name || "N/A"}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {purchase.items[0]?.quantity}
                        {purchase.items[0]?.unit}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        ${purchase.totalPrice}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {purchase.purchaseDate}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {purchase.supplier}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-accent"
                            onClick={() => handleView(purchase)}
                          >
                            <Eye className="h-5 w-5 text-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-accent"
                            onClick={() => handleEdit(purchase.id)}
                          >
                            <Pencil className="h-5 w-5 text-foreground" />
                          </Button>
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
        {!isLoading && paginatedPurchases.length > 0 && (
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

        {/* Recent by Type Section */}
        <div className="bg-card rounded-2xl border border-border shadow-[0px_8px_32px_0px_#00000026] p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Recent by Type
          </h2>
          <div className="space-y-4">
            {mockPurchaseStats.map((stat) => (
              <div key={stat.ingredient} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">
                    {stat.ingredient}
                  </span>
                  <span className="text-foreground font-semibold">
                    ${stat.amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {stat.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ViewPurchaseModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedPurchase(null);
        }}
        purchase={selectedPurchase}
      />
    </>
  );
}
