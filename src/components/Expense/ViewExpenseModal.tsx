import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Expense } from "@/types/expense";

interface ViewExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export default function ViewExpenseModal({
  isOpen,
  onClose,
  expense,
}: ViewExpenseModalProps) {
  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Expense Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Expense ID
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm text-foreground">
                {expense.expenseId}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Expense Type
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm text-foreground">
                {expense.expenseType}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Name
            </Label>
            <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm text-foreground">
              {expense.name}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Quantity
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                {expense.quantity}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Unit Price
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                ${expense.unitPrice.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Total Price
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                ${expense.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Total Discount
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                ${expense.totalDiscount.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Total Amount
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                ${expense.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Paid Amount
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                ${expense.paidAmount.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Due Amount
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm">
                ${expense.dueAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Supplier
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm text-foreground">
                {expense.supplier}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Date
              </Label>
              <div className="h-12 px-4 flex items-center bg-card border border-border rounded-md text-sm text-foreground">
                {expense.date}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
