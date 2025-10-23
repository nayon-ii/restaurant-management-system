// src/types/order.ts

export type OrderStatus = "Receive" | "Preparing" | "Ready" | "Served";
export type OrderType = "Dine In" | "Take Away" | "Delivery";

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  image: string;
  status: OrderStatus;
  timeLeft: string;
  size?: string;
  extraIngredients?: string;
  note?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  tableNo: string;
  orderType: OrderType;
  totalAmount: number;
  timeLeft: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  serviceCharge: number;
  tax: number;
  discount: number;
}

// For menu items in create order
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

// For cart items in create order
export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  size: string;
  extras: string[];
  note: string;
  itemTotal: number;
}

// For order statistics
export interface OrderStats {
  total: number;
  inProgress: number;
  delivered: number;
}
