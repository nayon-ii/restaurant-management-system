// src/Pages/Dashboard/Order/CreateOrderPage.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MenuItemCard from "@/components/Order/MenuItemCard";
import OrderSummary from "@/components/Order/OrderSummary";
import CartItemCard from "@/components/Order/CartItemCard";

// Interfaces
interface MenuItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  sizes: { name: string; priceAdder: number }[];
  extras: { name: string; price: number }[];
  prepTime: number;
}

interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  size: string;
  extras: string[];
  note: string;
  itemTotal: number;
}

// Mock Menu Data
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Cheese Pizza",
    category: "Hot Cool Spot",
    basePrice: 29.0,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop",
    sizes: [
      { name: "Small", priceAdder: 0 },
      { name: "Medium", priceAdder: 5 },
      { name: "Large", priceAdder: 10 },
    ],
    extras: [
      { name: "Cheese", price: 2 },
      { name: "Olive", price: 1.5 },
      { name: "Mushroom", price: 2.5 },
    ],
    prepTime: 20,
  },
  {
    id: "2",
    name: "Cheese Burger",
    category: "Hot Cool Spot",
    basePrice: 29.0,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
    sizes: [
      { name: "Small", priceAdder: 0 },
      { name: "Medium", priceAdder: 5 },
      { name: "Large", priceAdder: 10 },
    ],
    extras: [
      { name: "Cheese", price: 2 },
      { name: "Bacon", price: 3 },
    ],
    prepTime: 20,
  },
  {
    id: "3",
    name: "Spicy Shawarma",
    category: "Hot Cool Spot",
    basePrice: 9.99,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=300&fit=crop",
    sizes: [
      { name: "Small", priceAdder: 0 },
      { name: "Medium", priceAdder: 3 },
      { name: "Large", priceAdder: 6 },
    ],
    extras: [
      { name: "Cheese", price: 1 },
      { name: "Olive", price: 1 },
    ],
    prepTime: 20,
  },
];

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

      <main className="min-h-screen bg-background p-3 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            className="mb-4 hover:bg-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Search & Items Grid */}
            {step === 1 && (
              <div className="w-full lg:w-3/5">
                <div className="bg-card rounded-2xl shadow-sm p-4 mb-4">
                  <Input
                    placeholder="Search Items e.g. Spicy Shawarma"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="bg-card rounded-2xl shadow-sm p-6">
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

            {/* Right: Form & Cart */}
            <div
              className={`w-full ${
                step === 1 ? "lg:w-2/5" : "lg:w-1/2 mx-auto"
              } bg-card rounded-2xl shadow-sm p-6 space-y-6 h-fit`}
            >
              {step === 1 ? (
                <>
                  <h3 className="text-xl font-bold">Selected Items</h3>

                  {selectedItem ? (
                    <div className="space-y-4 pb-6 border-b border-border">
                      <div className="flex items-start gap-4 bg-background p-4 rounded-xl border border-border">
                        <img
                          src={selectedItem.image}
                          alt={selectedItem.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {selectedItem.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedItem.category}
                          </p>
                          <p className="text-primary font-bold mt-1">
                            ${itemPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {selectedItem.sizes.length > 0 && (
                        <div>
                          <Label className="text-base font-semibold mb-3 block">
                            Size
                          </Label>
                          <div className="flex gap-2">
                            {selectedItem.sizes.map((s) => (
                              <Button
                                key={s.name}
                                variant={
                                  size === s.name ? "default" : "outline"
                                }
                                onClick={() => setSize(s.name)}
                                className="flex-1 rounded-xl"
                              >
                                {s.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedItem.extras.length > 0 && (
                        <div>
                          <Label className="text-base font-semibold mb-3 block">
                            Extra Ingredients
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.extras.map((e) => (
                              <Button
                                key={e.name}
                                variant={
                                  selectedExtras.includes(e.name)
                                    ? "default"
                                    : "outline"
                                }
                                onClick={() => toggleExtra(e.name)}
                                className="rounded-xl"
                              >
                                {e.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          Order Type
                        </Label>
                        <Select value={orderType} onValueChange={setOrderType}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Dine In">Dine In</SelectItem>
                            <SelectItem value="Take Away">Take Away</SelectItem>
                            <SelectItem value="Delivery">Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {orderType === "Dine In" && (
                        <div>
                          <Label className="text-base font-semibold mb-3 block">
                            Table
                          </Label>
                          <Select value={table} onValueChange={setTable}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select Table" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1a">1a</SelectItem>
                              <SelectItem value="2b">2b</SelectItem>
                              <SelectItem value="3b">3b</SelectItem>
                              <SelectItem value="4c">4c</SelectItem>
                              <SelectItem value="5d">5d</SelectItem>
                              <SelectItem value="6B">6B</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          Note
                        </Label>
                        <Input
                          placeholder="If any"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <Button
                        onClick={handleAddToCart}
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold"
                      >
                        Add
                      </Button>
                    </div>
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
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold"
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">Selected Items</h3>
                  <div className="space-y-3 pb-6 border-b border-border">
                    {cart.map((item) => (
                      <CartItemCard
                        key={item.cartId}
                        item={item}
                        onRemove={removeFromCart}
                        compact
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Order ID
                      </Label>
                      <Input
                        value="001"
                        readOnly
                        className="h-12 bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Table No
                      </Label>
                      <Input
                        value={table || "N/A"}
                        readOnly
                        className="h-12 bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Total Amount
                      </Label>
                      <Input
                        value={`$${calculations.total.toFixed(2)}`}
                        readOnly
                        className="h-12 bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Time
                      </Label>
                      <Input
                        value={`${Math.floor(calculations.estTime / 60)} Min ${
                          calculations.estTime % 60
                        } Sec`}
                        readOnly
                        className="h-12 bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Order Type
                      </Label>
                      <Input
                        value={orderType}
                        readOnly
                        className="h-12 bg-background"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Note
                      </Label>
                      <Input
                        value={note || "No"}
                        readOnly
                        className="h-12 bg-background"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateOrder}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold mt-6"
                  >
                    Create Order
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
