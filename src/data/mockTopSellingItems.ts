// Mock data for top selling items
export interface TopSellingItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  revenue: number;
}

export interface SalesByCategory {
  id: string;
  category: string;
  revenue: number;
  percentage: number;
  orders: number;
}

export const mockTopSellingItems: TopSellingItem[] = [
  {
    id: "item-1",
    name: "Pizza",
    image: "/order1.png",
    quantity: 20,
    revenue: 4825,
  },
  {
    id: "item-2",
    name: "Burger",
    image: "/order1.png",
    quantity: 18,
    revenue: 4320,
  },
  {
    id: "item-3",
    name: "Pasta",
    image: "/order1.png",
    quantity: 15,
    revenue: 3750,
  },
  {
    id: "item-4",
    name: "Salad",
    image: "/order1.png",
    quantity: 12,
    revenue: 2880,
  },
  {
    id: "item-5",
    name: "Sandwich",
    image: "/order1.png",
    quantity: 10,
    revenue: 2400,
  },
];

export const mockSalesByCategory: SalesByCategory[] = [
  {
    id: "cat-1",
    category: "Main Courses",
    revenue: 4245,
    percentage: 60.78,
    orders: 546,
  },
  {
    id: "cat-2",
    category: "Appetizers",
    revenue: 2150,
    percentage: 30.78,
    orders: 546,
  },
  {
    id: "cat-3",
    category: "Desserts",
    revenue: 750,
    percentage: 10.78,
    orders: 546,
  },
];
