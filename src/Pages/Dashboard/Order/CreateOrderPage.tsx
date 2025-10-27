// src/Pages/Dashboard/Order/CreateOrderPage.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MenuItemCard from "@/components/Order/MenuItemCard";
import CartItemCard from "@/components/Order/CartItemCard";
import OrderSummary from "@/components/Order/OrderSummary";
import ItemCustomizationForm from "@/components/Order/ItemCustomizationForm";
import ReviewSummaryCard from "@/components/Order/ReviewSummaryCard";
import { mockMenuItems } from "@/data/mockOrders";
import type { MenuItem, CartItem } from "@/types/order";

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [orderType, setOrderType] = useState("Dine In");
  const [table, setTable] = useState("");
  const [note, setNote] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredItems = useMemo(() => {
    return mockMenuItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const calculations = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.itemTotal * item.quantity,
      0
    );
    const serviceCharge = subtotal * 0.1;
    const tax = subtotal * 0.05;
    const discount = 0;
    const total = subtotal + serviceCharge + tax - discount;
    const estTime = cart.reduce(
      (max, item) => Math.max(max, item.menuItem.prepTime * item.quantity),
      0
    );

    return { subtotal, serviceCharge, tax, discount, total, estTime };
  }, [cart]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setSize(item.sizes[0]?.name || "");
    setSelectedExtras([]);
    setNote("");
  };

  const toggleExtra = (extraName: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraName)
        ? prev.filter((e) => e !== extraName)
        : [...prev, extraName]
    );
  };

  const itemPrice = useMemo(() => {
    if (!selectedItem) return 0;
    const sizeAdder =
      selectedItem.sizes.find((s) => s.name === size)?.priceAdder || 0;
    const extrasTotal = selectedItem.extras.reduce(
      (sum, e) => (selectedExtras.includes(e.name) ? sum + e.price : sum),
      0
    );
    return selectedItem.basePrice + sizeAdder + extrasTotal;
  }, [selectedItem, size, selectedExtras]);

  const handleAddToCart = () => {
    if (!selectedItem) return;
    if (!size && selectedItem.sizes.length > 0) {
      toast.error("Please select a size");
      return;
    }

    const newCartItem: CartItem = {
      cartId: `${selectedItem.id}-${Date.now()}`,
      menuItem: selectedItem,
      quantity,
      size,
      extras: selectedExtras,
      note,
      itemTotal: itemPrice,
    };

    setCart((prev) => [...prev, newCartItem]);
    resetForm();
    toast.success(`${selectedItem.name} added to order`);
  };

  const resetForm = () => {
    setSelectedItem(null);
    setQuantity(1);
    setSize("");
    setSelectedExtras([]);
    setNote("");
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    toast.success("Item removed from cart");
  };

  const handleNext = () => {
    if (cart.length === 0) {
      toast.error("Please add at least one item");
      return;
    }
    if (orderType === "Dine In" && !table) {
      toast.error("Please select a table");
      return;
    }
    setStep(2);
  };

  const handleCreateOrder = () => {
    toast.success("Order created successfully!");
    navigate("/dashboard/orders");
  };

  return (
    <>
      <DashboardHeader title="Create Order" />

      <main className="min-h-screen bg-background p-3 md:px-8">
        <div className="w-full mx-auto">
          <Button
            variant="ghost"
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            className="mb-4 hover:bg-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex flex-col lg:flex-row gap-6">
            {step === 1 && (
              <div className="w-full lg:w-3/5">
                <div className="bg-card rounded-2xl shadow-sm p-3 mb-4">
                  <Input
                    placeholder="Search Items e.g. Spicy Shawarma"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="bg-card rounded-2xl shadow-sm p-5">
                  <h3 className="text-xl font-bold mb-6">Searched Items</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onSelect={handleSelectItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div
              className={`w-full ${
                step === 1 ? "lg:w-2/5" : "lg:w-1/2 mx-auto"
              } bg-card rounded-2xl shadow-sm p-5 space-y-3 h-fit`}
            >
              {step === 1 ? (
                <>
                  <h3 className="text-xl font-bold">Selected Items</h3>

                  {selectedItem ? (
                    <ItemCustomizationForm
                      selectedItem={selectedItem}
                      quantity={quantity}
                      size={size}
                      selectedExtras={selectedExtras}
                      orderType={orderType}
                      table={table}
                      note={note}
                      itemPrice={itemPrice}
                      onQuantityChange={setQuantity}
                      onSizeChange={setSize}
                      onToggleExtra={toggleExtra}
                      onOrderTypeChange={setOrderType}
                      onTableChange={setTable}
                      onNoteChange={setNote}
                      onAddToCart={handleAddToCart}
                    />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Select an item to customize</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold mb-4">Added Items</h3>
                    <div className="space-y-3">
                      {cart.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">
                          No items added yet
                        </p>
                      ) : (
                        cart.map((item) => (
                          <CartItemCard
                            key={item.cartId}
                            item={item}
                            onRemove={removeFromCart}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <OrderSummary
                    subtotal={calculations.subtotal}
                    serviceCharge={calculations.serviceCharge}
                    tax={calculations.tax}
                    discount={calculations.discount}
                    total={calculations.total}
                  />

                  <Button
                    onClick={handleNext}
                    disabled={cart.length === 0}
                    className="w-full h-12 bg-primary hover:bg-primary/80 text-white rounded-xl text-base font-semibold"
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold tracking-tight">
                        Order Review
                      </h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {cart.length} {cart.length === 1 ? "Item" : "Items"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {cart.map((item) => (
                        <ReviewSummaryCard key={item.cartId} item={item} />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Order ID
                        </Label>
                        <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
                          001
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Table No
                        </Label>
                        <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
                          {table || "N/A"}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Est. Time
                        </Label>
                        <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
                          {Math.floor(calculations.estTime / 60)}m{" "}
                          {calculations.estTime % 60}s
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Order Type
                        </Label>
                        <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium capitalize">
                          {orderType}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Special Notes
                      </Label>
                      <div className="min-h-11 px-3 py-2.5 bg-card border border-border rounded-lg text-sm">
                        {note || "No special instructions"}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Total Amount
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ${calculations.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCreateOrder}
                      className="w-full h-12 bg-primary hover:bg-primary/80 text-white rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                    >
                      Create Order
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
