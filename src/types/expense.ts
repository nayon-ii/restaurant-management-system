// TYPES - src/types/expense.ts
export interface Expense {
  id: string;
  expenseId: string;
  expenseType: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  totalDiscount: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  supplier?: string;
  date: string;
  invoiceNo?: string;
  createdAt: string;
  updatedAt: string;
}
