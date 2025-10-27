// src/Pages/Dashboard/Chef/OrderDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { ArrowLeft } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import ItemDetailModal from "@/components/Order/ItemDetailModal";
import { mockOrders } from "@/data/mockOrders";
import type { Order, OrderItem, OrderStatus } from "@/types/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemStatuses, setItemStatuses] = useState<Record<string, OrderStatus>>(
    {}
  );
  const [overallStatus, setOverallStatus] = useState<OrderStatus>("Receive");
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const foundOrder = mockOrders.find((o) => o.id === orderId);

      if (foundOrder) {
        setOrder(foundOrder);
        const statuses: Record<string, OrderStatus> = {};
        foundOrder.items.forEach((item) => {
          statuses[item.id] = item.status;
        });
        setItemStatuses(statuses);
        setOverallStatus(foundOrder.status);
      } else {
        toast.error("Order not found");
        navigate("/dashboard/orders");
      }

      setIsLoading(false);
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handleStatusChange = (itemId: string, newStatus: OrderStatus) => {
    setItemStatuses((prev) => ({
      ...prev,
      [itemId]: newStatus,
    }));
    toast.success("Item status updated");
  };

  const handleOverallStatusChange = (newStatus: OrderStatus) => {
    setOverallStatus(newStatus);
    toast.success("Order status updated");
  };

  const handleItemClick = (item: OrderItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <>
        <DashboardHeader title="Order Details" />
        <main className="p-3 md:p-8 flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <LoadingSpinner size="lg" />
        </main>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <DashboardHeader title="Order Details" />
        <main className="p-3 md:p-8">
          <div className="text-center">
            <p className="text-muted-foreground">Order not found</p>
          </div>
        </main>
      </>
    );
  }

  const isSingleItem = order.items.length === 1;
  const singleItem = isSingleItem ? order.items[0] : null;

  return (
    <>
      <DashboardHeader title="Order Details" />

      <main className="p-3 md:p-8">
        <div className="w-full mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/orders")}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-foreground">
              Order ID: {order.id}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Order Details */}
            <div className="w-full lg:w-1/2 space-y-3">
              <div className="bg-card rounded-2xl border border-border shadow-sm p-5 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {/* Order ID */}
                  <div className="space-y-2 flex-1">
                    <Label className="text-sm font-medium text-foreground">
                      Order ID
                    </Label>
                    <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm">
                      {order.id}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2 flex-1">
                    <Label className="text-sm font-medium text-foreground">
                      Date
                    </Label>
                    <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm">
                      {order.date}
                    </div>
                  </div>
                </div>

                {/* Single Item - Show Ordered Items section */}
                {isSingleItem && singleItem && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Ordered Items
                    </Label>
                    <div
                      onClick={() => handleItemClick(singleItem)}
                      className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border hover:border-primary cursor-pointer transition-all"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-linear-to-br from-primary to-orange-600">
                        <img
                          src={singleItem.image}
                          alt={singleItem.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {singleItem.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {singleItem.quantity}x
                        </p>
                      </div>
                      <p className="font-bold text-foreground">
                        ${singleItem.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Table No & Order Type */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Table No
                    </Label>
                    <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm">
                      {order.tableNo}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Order Type
                    </Label>
                    <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm capitalize">
                      {order.orderType}
                    </div>
                  </div>
                </div>

                {/* Single Item - Show Size, Extra Ingredients, Note, Status */}
                {isSingleItem && singleItem && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          Size
                        </Label>
                        <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm">
                          {singleItem.size || "N/A"}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          Extra Ingredients
                        </Label>
                        <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm">
                          {singleItem.extraIngredients || "None"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Note
                      </Label>
                      <div className="min-h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm">
                        {singleItem.note || "No notes"}
                      </div>
                    </div>
                  </>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Time Left */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Time Left
                    </Label>
                    <div className="h-12 px-4 flex items-center bg-card border border-border rounded-xl text-sm font-bold text-red-500">
                      {order.timeLeft}
                    </div>
                  </div>

                  {/* Status - For Single Item */}
                  {isSingleItem && singleItem && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Status
                      </Label>
                      <Select
                        value={itemStatuses[singleItem.id] || singleItem.status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            singleItem.id,
                            value as OrderStatus
                          )
                        }
                      >
                        <SelectTrigger className="w-full h-12! shadow-none bg-card text-foreground border border-border rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Receive">Receive</SelectItem>
                          <SelectItem value="Preparing">Preparing</SelectItem>
                          <SelectItem value="Ready">Ready</SelectItem>
                          <SelectItem value="Served">Served</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Status - For Multiple Items */}
                  {!isSingleItem && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Status
                      </Label>
                      <Select
                        value={overallStatus}
                        onValueChange={(value) =>
                          handleOverallStatusChange(value as OrderStatus)
                        }
                      >
                        <SelectTrigger className="w-full h-12! shadow-none bg-card text-foreground border border-border rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Receive">Receive</SelectItem>
                          <SelectItem value="Preparing">Preparing</SelectItem>
                          <SelectItem value="Ready">Ready</SelectItem>
                          <SelectItem value="Served">Served</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Added Items & Summary */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Added Items</h3>
                <div className="space-y-3 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => !isSingleItem && handleItemClick(item)}
                      className={`flex items-center gap-3 p-3 bg-card rounded-xl border border-border ${
                        !isSingleItem
                          ? "hover:border-primary cursor-pointer transition-all"
                          : ""
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x
                        </p>
                      </div>
                      <p className="font-bold text-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-semibold">{order.items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sub-Total</span>
                    <span className="font-semibold">
                      ${order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Service Charge
                    </span>
                    <span className="font-semibold">
                      ${order.serviceCharge.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">
                      ${order.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-semibold">
                      ${order.discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ItemDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        currentStatus={
          selectedItem
            ? itemStatuses[selectedItem.id] || selectedItem.status
            : "Receive"
        }
        onStatusChange={handleStatusChange}
      />
    </>
  );
}

// // src/Pages/Dashboard/Chef/OrderDetailPage.tsx
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import DashboardHeader from "@/components/Dashboard/DashboardHeader";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowLeft } from "lucide-react";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import { toast } from "sonner";
// import ItemDetailModal from "@/components/Order/ItemDetailModal";
// import { mockOrders } from "@/data/mockOrders";
// import type { Order, OrderItem, OrderStatus } from "@/types/order";

// export default function OrderDetailPage() {
//   const { orderId } = useParams<{ orderId: string }>();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [itemStatuses, setItemStatuses] = useState<Record<string, OrderStatus>>(
//     {}
//   );
//   const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       setIsLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       const foundOrder = mockOrders.find((o) => o.id === orderId);

//       if (foundOrder) {
//         setOrder(foundOrder);
//         const statuses: Record<string, OrderStatus> = {};
//         foundOrder.items.forEach((item) => {
//           statuses[item.id] = item.status;
//         });
//         setItemStatuses(statuses);
//       } else {
//         toast.error("Order not found");
//         navigate("/dashboard/orders");
//       }

//       setIsLoading(false);
//     };

//     fetchOrder();
//   }, [orderId, navigate]);

//   const handleStatusChange = (itemId: string, newStatus: OrderStatus) => {
//     setItemStatuses((prev) => ({
//       ...prev,
//       [itemId]: newStatus,
//     }));
//     toast.success("Item status updated");
//   };

//   const handleItemClick = (item: OrderItem) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   if (isLoading) {
//     return (
//       <>
//         <DashboardHeader title="Order Details" />
//         <main className="p-3 md:p-8 flex items-center justify-center min-h-[calc(100vh-5rem)]">
//           <LoadingSpinner size="lg" />
//         </main>
//       </>
//     );
//   }

//   if (!order) {
//     return (
//       <>
//         <DashboardHeader title="Order Details" />
//         <main className="p-3 md:p-8">
//           <div className="text-center">
//             <p className="text-muted-foreground">Order not found</p>
//           </div>
//         </main>
//       </>
//     );
//   }

//   return (
//     <>
//       <DashboardHeader title="Order Details" />

//       <main className="p-3 md:p-8">
//         <div className="w-full mx-auto">
//           <div className="flex items-center gap-3 mb-6">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate("/dashboard/orders")}
//               className="hover:bg-accent"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h2 className="text-2xl font-bold text-foreground">
//               Order ID: {order.id}
//             </h2>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Left Side - Order Details */}
//             <div className="w-full lg:w-1/2 space-y-6">
//               <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="text-xl font-bold mb-6">Order Information</h3>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
//                       Date
//                     </Label>
//                     <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
//                       {order.date}
//                     </div>
//                   </div>

//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
//                       Order ID
//                     </Label>
//                     <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
//                       {order.id}
//                     </div>
//                   </div>

//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
//                       Table No
//                     </Label>
//                     <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
//                       {order.tableNo}
//                     </div>
//                   </div>

//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
//                       Order Type
//                     </Label>
//                     <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium capitalize">
//                       {order.orderType}
//                     </div>
//                   </div>

//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
//                       Time Left
//                     </Label>
//                     <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
//                       {order.timeLeft}
//                     </div>
//                   </div>

//                   <div className="space-y-1.5">
//                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
//                       Status
//                     </Label>
//                     <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium capitalize">
//                       {order.status}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-border">
//                   <div className="bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium text-muted-foreground">
//                         Total Amount
//                       </span>
//                       <span className="text-2xl font-bold text-primary">
//                         ${order.totalAmount.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="text-xl font-bold mb-4">Ordered Items</h3>
//                 <div className="space-y-3">
//                   {order.items.map((item) => (
//                     <div
//                       key={item.id}
//                       onClick={() => handleItemClick(item)}
//                       className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border hover:border-primary cursor-pointer transition-all"
//                     >
//                       <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-linear-to-br from-primary to-orange-600">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-semibold text-foreground">
//                           {item.name}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {item.category}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="text-center text-foreground">
//                           <Select
//                             value={
//                               itemStatuses[item.id] ||
//                               item.status ||
//                               "placeholder"
//                             } // Default to placeholder if no value is selected
//                             onValueChange={(value) =>
//                               handleStatusChange(item.id, value as OrderStatus)
//                             }
//                           >
//                             <SelectTrigger
//                               onClick={(e) => e.stopPropagation()}
//                               className="border-0 rounded-full shadow-none bg-primary text-white"
//                             >
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {/* Placeholder option */}
//                               <SelectItem value="placeholder" disabled>
//                                 Select Status
//                               </SelectItem>
//                               <SelectItem value="Preparing">
//                                 Preparing
//                               </SelectItem>
//                               <SelectItem value="Ready">Ready</SelectItem>
//                               <SelectItem value="Served">Served</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <p className="text-xs text-muted-foreground mt-1">
//                             {item.timeLeft}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Added Items & Summary */}
//             <div className="w-full lg:w-1/2 space-y-6">
//               <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
//                 <h3 className="text-xl font-bold mb-4">Added Items</h3>
//                 <div className="space-y-3 mb-6">
//                   {order.items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-14 h-14 rounded-lg object-cover"
//                         onError={(e) => {
//                           e.currentTarget.style.display = "none";
//                         }}
//                       />
//                       <div className="flex-1">
//                         <p className="font-semibold text-foreground">
//                           {item.name}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {item.quantity}x
//                         </p>
//                       </div>
//                       <p className="font-bold text-foreground">
//                         ${item.price.toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="space-y-3 pt-4 border-t border-border">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{order.items.length}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Sub-Total</span>
//                     <span className="font-semibold">
//                       ${order.subtotal.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">
//                       Service Charge
//                     </span>
//                     <span className="font-semibold">
//                       ${order.serviceCharge.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Tax</span>
//                     <span className="font-semibold">
//                       ${order.tax.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Discount</span>
//                     <span className="font-semibold">
//                       ${order.discount.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
//                     <span>Total</span>
//                     <span className="text-primary">
//                       ${order.totalAmount.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <ItemDetailModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         item={selectedItem}
//         currentStatus={
//           selectedItem
//             ? itemStatuses[selectedItem.id] || selectedItem.status
//             : "Receive"
//         }
//         onStatusChange={handleStatusChange}
//       />
//     </>
//   );
// }
