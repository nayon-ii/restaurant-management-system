// VIEW BILL MODAL - src/components/Supplier/ViewBillModal.tsx
// ============================================
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Bill } from "@/types/supplier";

interface ViewBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill | null;
}

export default function ViewBillModal({
  isOpen,
  onClose,
  bill,
}: ViewBillModalProps) {
  if (!bill) return null;

  const subTotal = bill.items.reduce((sum, item) => sum + item.price, 0);
  const tax = subTotal * 0.1;
  const total = bill.totalAmount;
  const paid = bill.paid;
  const due = bill.due;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Bill ID: {bill.billId}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Date: {bill.date}
              </p>
              <p className="text-sm text-foreground mt-1">
                Supplier: {bill.supplier}
              </p>
            </div>
            {bill.paymentMethod && (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${bill.totalAmount.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {bill.paymentMethod}
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Order Items</h3>
            <div className="space-y-2">
              {bill.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-border"
                >
                  <div>
                    <span className="text-foreground">
                      {item.name} * {item.quantity}
                      {item.unit}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sub Total:</span>
              <span className="font-semibold">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Paid:</span>
              <span className="font-semibold text-green-600">
                ${paid.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Due:</span>
              <span className="font-semibold text-red-600">
                ${due.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t border-border">
              <span>Total Payable:</span>
              <span className="text-primary">${due.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
