// src/types/reports.ts
export interface SalesReport {
  id: string;
  date: string;
  type: string;
  amount: number;
  tax: number;
  cost: number;
  discount: number;
}

export interface ExpenseReport {
  id: string;
  expenseType: string;
  createdAt: string;
  quantity: number;
  unitPrice: number;
  paidAmount: number;
  totalDiscount?: number;
  supplier?: string;
  name?: string;
}