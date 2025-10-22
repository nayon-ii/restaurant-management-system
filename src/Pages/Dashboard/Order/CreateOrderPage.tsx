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

// Interfaces
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  sizes: { name: string; priceAdder: number }[];
  extras: { name: string; price: number }[];
  prepTime: number;
}

export interface CartItem {
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
            {/* Left: Search & Items Grid */}
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

            {/* Right: Form & Cart */}
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
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold"
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold tracking-tight">
                        Order Review
                      </h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {cart.length} {cart.length === 1 ? "Item" : "Items"}
                      </span>
                    </div>

                    {/* Selected Items */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <ReviewSummaryCard key={item.cartId} item={item} />
                      ))}
                    </div>

                    {/* Order Details Grid */}
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

                    {/* Note Section - Always visible */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Special Notes
                      </Label>
                      <div className="min-h-11 px-3 py-2.5 bg-card border border-border rounded-lg text-sm">
                        {note || "No special instructions"}
                      </div>
                    </div>

                    {/* Total Amount - Highlighted */}
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

                    {/* Action Button */}
                    <Button
                      onClick={handleCreateOrder}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
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

// // src/Pages/Dashboard/Order/CreateOrderPage.tsx
// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Minus, Plus, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import DashboardHeader from "@/components/Dashboard/DashboardHeader";

// // Interfaces
// interface MenuItem {
//   id: string;
//   name: string;
//   category: string;
//   basePrice: number;
//   image: string;
//   sizes: { name: string; priceAdder: number }[];
//   extras: { name: string; price: number }[];
//   prepTime: number;
// }

// interface CartItem {
//   cartId: string;
//   menuItem: MenuItem;
//   quantity: number;
//   size: string;
//   extras: string[];
//   note: string;
//   itemTotal: number;
// }

// // Mock Menu Data
// const mockMenuItems: MenuItem[] = [
//   {
//     id: "1",
//     name: "Cheese Pizza",
//     category: "Hot Cool Spot",
//     basePrice: 29.0,
//     image:
//       "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop",
//     sizes: [
//       { name: "Small", priceAdder: 0 },
//       { name: "Medium", priceAdder: 5 },
//       { name: "Large", priceAdder: 10 },
//     ],
//     extras: [
//       { name: "Cheese", price: 2 },
//       { name: "Olive", price: 1.5 },
//       { name: "Mushroom", price: 2.5 },
//     ],
//     prepTime: 20,
//   },
//   {
//     id: "2",
//     name: "Cheese Burger",
//     category: "Hot Cool Spot",
//     basePrice: 29.0,
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
//     sizes: [
//       { name: "Small", priceAdder: 0 },
//       { name: "Medium", priceAdder: 5 },
//       { name: "Large", priceAdder: 10 },
//     ],
//     extras: [
//       { name: "Cheese", price: 2 },
//       { name: "Bacon", price: 3 },
//     ],
//     prepTime: 20,
//   },
//   {
//     id: "3",
//     name: "Spicy Shawarma",
//     category: "Hot Cool Spot",
//     basePrice: 9.99,
//     image:
//       "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=300&fit=crop",
//     sizes: [
//       { name: "Small", priceAdder: 0 },
//       { name: "Medium", priceAdder: 3 },
//       { name: "Large", priceAdder: 6 },
//     ],
//     extras: [
//       { name: "Cheese", price: 1 },
//       { name: "Olive", price: 1 },
//     ],
//     prepTime: 20,
//   },
// ];

// export default function CreateOrderPage() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [size, setSize] = useState("");
//   const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
//   const [orderType, setOrderType] = useState("Dine In");
//   const [table, setTable] = useState("");
//   const [note, setNote] = useState("");
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const filteredItems = useMemo(() => {
//     return mockMenuItems.filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery]);

//   const calculations = useMemo(() => {
//     const subtotal = cart.reduce(
//       (sum, item) => sum + item.itemTotal * item.quantity,
//       0
//     );
//     const serviceCharge = subtotal * 0.1;
//     const tax = subtotal * 0.05;
//     const discount = 0;
//     const total = subtotal + serviceCharge + tax - discount;
//     const estTime = cart.reduce(
//       (max, item) => Math.max(max, item.menuItem.prepTime * item.quantity),
//       0
//     );

//     return { subtotal, serviceCharge, tax, discount, total, estTime };
//   }, [cart]);

//   const handleSelectItem = (item: MenuItem) => {
//     setSelectedItem(item);
//     setQuantity(1);
//     setSize(item.sizes[0]?.name || "");
//     setSelectedExtras([]);
//     setNote("");
//   };

//   const toggleExtra = (extraName: string) => {
//     setSelectedExtras((prev) =>
//       prev.includes(extraName)
//         ? prev.filter((e) => e !== extraName)
//         : [...prev, extraName]
//     );
//   };

//   const itemPrice = useMemo(() => {
//     if (!selectedItem) return 0;
//     const sizeAdder =
//       selectedItem.sizes.find((s) => s.name === size)?.priceAdder || 0;
//     const extrasTotal = selectedItem.extras.reduce(
//       (sum, e) => (selectedExtras.includes(e.name) ? sum + e.price : sum),
//       0
//     );
//     return selectedItem.basePrice + sizeAdder + extrasTotal;
//   }, [selectedItem, size, selectedExtras]);

//   const handleAddToCart = () => {
//     if (!selectedItem) return;
//     if (!size && selectedItem.sizes.length > 0) {
//       toast.error("Please select a size");
//       return;
//     }

//     const newCartItem: CartItem = {
//       cartId: `${selectedItem.id}-${Date.now()}`,
//       menuItem: selectedItem,
//       quantity,
//       size,
//       extras: selectedExtras,
//       note,
//       itemTotal: itemPrice,
//     };

//     setCart((prev) => [...prev, newCartItem]);
//     resetForm();
//     toast.success(`${selectedItem.name} added to order`);
//   };

//   const resetForm = () => {
//     setSelectedItem(null);
//     setQuantity(1);
//     setSize("");
//     setSelectedExtras([]);
//     setNote("");
//   };

//   const removeFromCart = (cartId: string) => {
//     setCart((prev) => prev.filter((item) => item.cartId !== cartId));
//     toast.success("Item removed from cart");
//   };

//   const handleNext = () => {
//     if (cart.length === 0) {
//       toast.error("Please add at least one item");
//       return;
//     }
//     if (orderType === "Dine In" && !table) {
//       toast.error("Please select a table");
//       return;
//     }
//     setStep(2);
//   };

//   const handleCreateOrder = () => {
//     toast.success("Order created successfully!");
//     navigate("/dashboard/orders");
//   };

//   return (
//     <>
//       <DashboardHeader title="Create Order" />

//       <main className="min-h-screen bg-background p-3 md:px-8">
//         <div className="w-full mx-auto">
//           <Button
//             variant="ghost"
//             onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
//             className="mb-4 hover:bg-accent"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back
//           </Button>

//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Left: Search & Items Grid */}
//             {step === 1 && (
//               <div className="w-full lg:w-3/5">
//                 <div className="bg-card rounded-2xl shadow-sm p-3 mb-4">
//                   <Input
//                     placeholder="Search Items e.g. Spicy Shawarma"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="h-12"
//                   />
//                 </div>

//                 <div className="bg-card rounded-2xl shadow-sm p-5">
//                   <h3 className="text-xl font-bold mb-6">Searched Items</h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                     {filteredItems.map((item) => (
//                       <div
//                         key={item.id}
//                         className="bg-background rounded-xl border border-border p-3 cursor-pointer hover:shadow-lg hover:border-primary transition-all"
//                         onClick={() => handleSelectItem(item)}
//                       >
//                         <div className="relative">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-full h-32 object-cover rounded-lg mb-3"
//                             onError={(e) => {
//                               e.currentTarget.src =
//                                 "https://via.placeholder.com/300?text=No+Image";
//                             }}
//                           />
//                         </div>
//                         <p className="font-medium text-foreground mb-2">
//                           {item.name}
//                         </p>
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
//                           <img
//                             src="/icons/clock.svg"
//                             alt="Time"
//                             className="w-5 h-5 object-cover "
//                           />
//                           <span>{item.prepTime} min</span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className="text-primary/90 font-bold text-lg">
//                             ${item.basePrice.toFixed(2)}
//                           </p>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6 rounded-full bg-gray-200 hover:bg-primary/50 text-primary"
//                           >
//                             <Plus className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Right: Form & Cart */}
//             <div
//               className={`w-full ${
//                 step === 1 ? "lg:w-2/5" : "lg:w-1/2 mx-auto"
//               } bg-card rounded-2xl shadow-sm p-5 space-y-3 h-fit`}
//             >
//               {step === 1 ? (
//                 <>
//                   <h3 className="text-xl font-bold">Selected Items</h3>

//                   {selectedItem ? (
//                     <div className="space-y-3 border-b border-[#ABABAB]">
//                       <div className="flex items-center gap-4 bg-background p-3 rounded-xl border border-border">
//                         <img
//                           src={selectedItem.image}
//                           alt={selectedItem.name}
//                           className="w-16 h-16 rounded-lg object-cover"
//                         />
//                         <div className="flex-1">
//                           <p className="font-semibold text-foreground">
//                             {selectedItem.name}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {selectedItem.category}
//                           </p>
//                           <p className="text-primary/90 font-bold mt-1">
//                             ${itemPrice.toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() =>
//                               setQuantity(Math.max(1, quantity - 1))
//                             }
//                           >
//                             <Minus className="h-3 w-3" />
//                           </Button>
//                           <span className="font-semibold w-8 text-center">
//                             {quantity}
//                           </span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() => setQuantity(quantity + 1)}
//                           >
//                             <Plus className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       </div>

//                       {selectedItem.sizes.length > 0 && (
//                         <div>
//                           <Label className="text-base font-semibold mb-3 block">
//                             Size
//                           </Label>
//                           <div className="flex gap-2">
//                             {selectedItem.sizes.map((s) => (
//                               <Button
//                                 key={s.name}
//                                 variant={
//                                   size === s.name ? "default" : "outline"
//                                 }
//                                 onClick={() => setSize(s.name)}
//                                 className={`flex-1 rounded-md border ${
//                                   size === s.name
//                                     ? "border-primary text-primary"
//                                     : ""
//                                 } bg-card`}
//                               >
//                                 {s.name}
//                               </Button>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {selectedItem.extras.length > 0 && (
//                         <div>
//                           <Label className="text-base font-semibold mb-3 block">
//                             Extra Ingredients
//                           </Label>
//                           <div className="flex flex-wrap gap-2">
//                             {selectedItem.extras.map((e) => (
//                               <Button
//                                 key={e.name}
//                                 variant={
//                                   selectedExtras.includes(e.name)
//                                     ? "default"
//                                     : "outline"
//                                 }
//                                 onClick={() => toggleExtra(e.name)}
//                                 className={`flex-1 rounded-md border ${
//                                   selectedExtras.includes(e.name)
//                                     ? "border-primary text-primary"
//                                     : ""
//                                 } bg-card`}
//                               >
//                                 {e.name}
//                               </Button>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       <div className=" flex flex-wrap justify-between items-center gap-5">
//                         <div className="flex-1">
//                           <Label className="text-base font-semibold mb-3 block">
//                             Order Type
//                           </Label>
//                           <Select
//                             value={orderType}
//                                                       onValueChange={setOrderType}
//                           >
//                             <SelectTrigger className="h-12 w-full">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="Dine In">Dine In</SelectItem>
//                               <SelectItem value="Take Away">
//                                 Take Away
//                               </SelectItem>
//                               <SelectItem value="Delivery">Delivery</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         {orderType === "Dine In" && (
//                           <div className="flex-1">
//                             <Label className="text-base font-semibold mb-3 block">
//                               Table
//                             </Label>
//                             <Select value={table} onValueChange={setTable}>
//                               <SelectTrigger className="h-12 w-full">
//                                 <SelectValue placeholder="Select Table" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="1a">1a</SelectItem>
//                                 <SelectItem value="2b">2b</SelectItem>
//                                 <SelectItem value="3b">3b</SelectItem>
//                                 <SelectItem value="4c">4c</SelectItem>
//                                 <SelectItem value="5d">5d</SelectItem>
//                                 <SelectItem value="6B">6B</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         )}
//                       </div>

//                       <div>
//                         <Label className="text-base font-semibold mb-3 block">
//                           Note
//                         </Label>
//                         <Input
//                           placeholder="If any"
//                           value={note}
//                           onChange={(e) => setNote(e.target.value)}
//                           className="h-12"
//                         />
//                       </div>

//                       <Button
//                         onClick={handleAddToCart}
//                         className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold mb-2"
//                       >
//                         Add
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="text-center py-12 text-muted-foreground">
//                       <p>Select an item to customize</p>
//                     </div>
//                   )}

//                   <div>
//                     <h3 className="text-xl font-bold mb-4">Added Items</h3>
//                     <div className="space-y-3">
//                       {cart.length === 0 ? (
//                         <p className="text-center py-8 text-muted-foreground">
//                           No items added yet
//                         </p>
//                       ) : (
//                         cart.map((item) => (
//                           <div
//                             key={item.cartId}
//                             className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border"
//                           >
//                             <img
//                               src={item.menuItem.image}
//                               alt={item.menuItem.name}
//                               className="w-14 h-14 rounded-lg object-cover"
//                             />
//                             <div className="flex-1 min-w-0">
//                               <p className="font-semibold text-foreground">
//                                 {item.menuItem.name}
//                               </p>
//                               <p className="text-sm text-muted-foreground">
//                                 {item.menuItem.category}
//                               </p>
//                               <p className="text-xs text-muted-foreground mt-1">
//                                 {item.quantity}x
//                               </p>
//                             </div>
//                             <div className="text-right flex flex-col items-end gap-1">
//                               <p className="font-bold text-foreground">
//                                 ${(item.itemTotal * item.quantity).toFixed(2)}
//                               </p>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-6 w-6 text-primary/90 hover:text-orange-700 hover:bg-orange-50"
//                                 onClick={() => removeFromCart(item.cartId)}
//                               >
//                                 <X className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-3 pt-6 border-t border-border">
//                     <div className="flex justify-between text-sm">
//                       <p className="text-muted-foreground">Sub-Total</p>
//                       <p className="font-semibold">
//                         ${calculations.subtotal.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <p className="text-muted-foreground">Service Charge</p>
//                       <p className="font-semibold">
//                         ${calculations.serviceCharge.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <p className="text-muted-foreground">Tax</p>
//                       <p className="font-semibold">
//                         ${calculations.tax.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <p className="text-muted-foreground">Discount</p>
//                       <p className="font-semibold">
//                         ${calculations.discount.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
//                       <p>Total</p>
//                       <p className="text-primary/90">
//                         ${calculations.total.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>

//                   <Button
//                     onClick={handleNext}
//                     disabled={cart.length === 0}
//                     className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold"
//                   >
//                     Next
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <h3 className="text-xl font-bold">Selected Items</h3>
//                   <div className="space-y-3 pb-6 border-b border-border">
//                     {cart.map((item) => (
//                       <div
//                         key={item.cartId}
//                         className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border"
//                       >
//                         <img
//                           src={item.menuItem.image}
//                           alt={item.menuItem.name}
//                           className="w-12 h-12 rounded-lg object-cover"
//                         />
//                         <div className="flex-1">
//                           <p className="font-semibold">{item.menuItem.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {item.quantity}x
//                           </p>
//                         </div>
//                         <p className="font-bold">
//                           ${(item.itemTotal * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <Label className="text-sm font-medium mb-2 block">
//                         Order ID
//                       </Label>
//                       <Input
//                         value="001"
//                         readOnly
//                         className="h-12 bg-background"
//                       />
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium mb-2 block">
//                         Table No
//                       </Label>
//                       <Input
//                         value={table || "N/A"}
//                         readOnly
//                         className="h-12 bg-background"
//                       />
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium mb-2 block">
//                         Total Amount
//                       </Label>
//                       <Input
//                         value={`$${calculations.total.toFixed(2)}`}
//                         readOnly
//                         className="h-12 bg-background"
//                       />
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium mb-2 block">
//                         Time
//                       </Label>
//                       <Input
//                         value={`${Math.floor(calculations.estTime / 60)} Min ${
//                           calculations.estTime % 60
//                         } Sec`}
//                         readOnly
//                         className="h-12 bg-background"
//                       />
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium mb-2 block">
//                         Order Type
//                       </Label>
//                       <Input
//                         value={orderType}
//                         readOnly
//                         className="h-12 bg-background"
//                       />
//                     </div>
//                     <div>
//                       <Label className="text-sm font-medium mb-2 block">
//                         Note
//                       </Label>
//                       <Input
//                         value={note || "No"}
//                         readOnly
//                         className="h-12 bg-background"
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     onClick={handleCreateOrder}
//                     className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold mt-6"
//                   >
//                     Create Order
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
