// TYPES - src/types/supplier.ts
export interface Supplier {
  id: string;
  name: string;
  number: string;
  email: string;
  location: string;
  total: number;
  paid: number;
  due: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bill {
  id: string;
  billId: string;
  date: string;
  supplier: string;
  supplierId: string;
  items: BillItem[];
  totalAmount: number;
  paid: number;
  due: number;
  paymentMethod?: string;
}

export interface BillItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface SupplierStats {
  totalSuppliers: number;
  totalBills: number;
  totalPurchases: number;
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
}
