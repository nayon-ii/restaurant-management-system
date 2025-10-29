// TYPES - src/types/purchase.ts
export interface PurchaseItem {
  id: string;
  name: string;
  quantity: number;
  unit: "kg" | "gm" | "piece" | "ML";
  unitPrice: number;
  totalPrice: number;
}

export interface Purchase {
  id: string;
  invoiceNo: string;
  items: PurchaseItem[];
  supplier: string;
  totalPrice: number;
  vat: number;
  discount: number;
  paidAmount: number;
  dueAmount: number;
  totalAmount: number;
  paymentType: string;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseStats {
  ingredient: string;
  amount: number;
  percentage: number;
}
