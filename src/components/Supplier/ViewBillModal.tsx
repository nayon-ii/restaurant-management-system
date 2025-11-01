// VIEW BILL MODAL - src/components/Supplier/ViewBillModal.tsx
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
  const total = subTotal + tax;
  const paid = bill.paid;
  const due = total - paid;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <div className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Bill Details
            </DialogTitle>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bill ID:</span>
                <span className="text-sm font-semibold text-foreground">
                  {bill.billId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Date:</span>
                <span className="text-sm font-semibold text-foreground">
                  {bill.date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Supplier:</span>
                <span className="text-sm font-semibold text-foreground">
                  {bill.supplier}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-base">
              Order Items
            </h3>
            <div className="space-y-2">
              {bill.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <span className="text-foreground font-medium">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      × {item.quantity} {item.unit}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t-2 border-border">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sub Total:</span>
              <span className="font-semibold text-foreground">
                ${subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tax (10%):</span>
              <span className="font-semibold text-foreground">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="font-bold text-foreground text-lg">Total:</span>
              <span className="font-bold text-foreground text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Paid:</span>
              <span className="font-semibold text-green-600">
                ${paid.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-muted-foreground">Due:</span>
              <span className="font-semibold text-red-600">
                ${due.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t-2 border-border">
              <span className="font-bold text-foreground text-xl">
                Total Payable:
              </span>
              <span className="font-bold text-primary text-xl">
                ${due.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
