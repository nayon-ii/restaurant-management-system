// VIEW PURCHASE MODAL - src/components/Purchase/ViewPurchaseModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Purchase } from "@/types/purchase";

interface ViewPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchase: Purchase | null;
}

export default function ViewPurchaseModal({
  isOpen,
  onClose,
  purchase,
}: ViewPurchaseModalProps) {
  if (!purchase) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Purchase Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Invoice No
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm text-foreground">
                {purchase.invoiceNo}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Purchase Date
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm text-foreground">
                {purchase.purchaseDate}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Items
            </Label>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="text-left p-3 text-sm font-semibold">
                      Name
                    </th>
                    <th className="text-center p-3 text-sm font-semibold">
                      Quantity
                    </th>
                    <th className="text-center p-3 text-sm font-semibold">
                      Unit Price
                    </th>
                    <th className="text-right p-3 text-sm font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchase.items.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-background" : ""}
                    >
                      <td className="p-3 text-sm">{item.name}</td>
                      <td className="p-3 text-sm text-center">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-3 text-sm text-center">
                        ${item.unitPrice}
                      </td>
                      <td className="p-3 text-sm text-right">
                        ${item.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Supplier
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm text-foreground">
                {purchase.supplier}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Payment Type
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm text-foreground">
                {purchase.paymentType}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Total Price
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm">
                ${purchase.totalPrice.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                VAT
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm">
                ${purchase.vat.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Discount
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm">
                ${purchase.discount.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Paid Amount
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm">
                ${purchase.paidAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Due Amount
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-md text-sm">
                ${purchase.dueAmount.toFixed(2)}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Total Amount
              </Label>
              <div className="h-12 px-4 flex items-center bg-primary/10 border border-primary/20 rounded-md text-sm font-bold text-primary">
                ${purchase.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
