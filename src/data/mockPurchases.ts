import type { Purchase, PurchaseStats } from "@/types/purchase";

// MOCK DATA - src/data/mockPurchases.ts
export const mockPurchases: Purchase[] = [
  {
    id: "pur-1",
    invoiceNo: "54",
    items: [
      {
        id: "item-1",
        name: "Alu",
        quantity: 20,
        unit: "kg",
        unitPrice: 0.4,
        totalPrice: 8,
      },
    ],
    supplier: "Nayon",
    totalPrice: 8,
    vat: 0,
    discount: 0,
    paidAmount: 8,
    dueAmount: 0,
    totalAmount: 8,
    paymentType: "Cash",
    purchaseDate: "1 Aug 2025",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-01",
  },
  {
    id: "pur-2",
    invoiceNo: "55",
    items: [
      {
        id: "item-1",
        name: "Tomato",
        quantity: 544,
        unit: "kg",
        unitPrice: 2,
        totalPrice: 1088,
      },
      {
        id: "item-2",
        name: "Potato",
        quantity: 544,
        unit: "kg",
        unitPrice: 2,
        totalPrice: 1088,
      },
    ],
    supplier: "Nayon",
    totalPrice: 2176,
    vat: 0,
    discount: 0,
    paidAmount: 2176,
    dueAmount: 0,
    totalAmount: 2176,
    paymentType: "Bkash",
    purchaseDate: "1 Aug 2025",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-01",
  },
];

export const mockPurchaseStats: PurchaseStats[] = [
  { ingredient: "Rice", amount: 4245, percentage: 60.78 },
  { ingredient: "Tomato", amount: 4245, percentage: 30.78 },
  { ingredient: "Cheese", amount: 4245, percentage: 30.78 },
  { ingredient: "Potato", amount: 4245, percentage: 30.78 },
  { ingredient: "Ice", amount: 4245, percentage: 10.78 },
];

export const mockIngredientOptions = [
  "Tomato",
  "Potato",
  "Chicken",
  "Rice",
  "Cheese",
  "Onion",
  "Garlic",
];

export const mockSupplierOptions = ["Nayon", "Ahmed", "Rahman", "Karim"];
