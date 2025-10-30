// src/components/Modals/ExpenseViewModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import type { ExpenseReport } from "@/types/reports";

interface ExpenseViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: ExpenseReport | null;
}

export default function ExpenseViewModal({
  isOpen,
  onClose,
  expense,
}: ExpenseViewModalProps) {
  if (!expense) return null;

  const totalAmount = expense.quantity * expense.unitPrice;
  const dueAmount = totalAmount - expense.paidAmount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              View Expense Report
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                {format(new Date(expense.createdAt), "MM/dd/yyyy")}
              </div>
            </div>

            {/* Expense ID */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expense ID
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                {expense.id}
              </div>
            </div>

            {/* Expense Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expense Type
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                {expense.name || expense.expenseType}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantity
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                {expense.quantity}
              </div>
            </div>

            {/* Total Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Amount
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                ${totalAmount.toFixed(2)}
              </div>
            </div>

            {/* Paid Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Paid Amount
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                ${expense.paidAmount.toFixed(2)}
              </div>
            </div>

            {/* Due Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Due Amount
              </label>
              <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                ${dueAmount.toFixed(2)}
              </div>
            </div>

            {/* Supplier (if available) */}
            {expense.supplier && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Supplier
                </label>
                <div className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground">
                  {expense.supplier}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
