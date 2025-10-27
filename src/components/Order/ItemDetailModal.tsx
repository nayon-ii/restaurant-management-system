// src/components/Order/ItemDetailModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderItem, OrderStatus } from "@/types/order";

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: OrderItem | null;
  currentStatus: OrderStatus;
  onStatusChange: (itemId: string, newStatus: OrderStatus) => void;
  canChangeStatus?: boolean;
}

export default function ItemDetailModal({
  isOpen,
  onClose,
  item,
  currentStatus,
  onStatusChange,
  canChangeStatus = true,
}: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Item Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Item Info */}
          <div className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-linear-to-br from-primary to-orange-600">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.quantity}x</p>
            </div>
            <p className="font-bold text-foreground">
              ${item.price.toFixed(2)}
            </p>
          </div>

          {/* Size & Extra Ingredients */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Size
              </Label>
              <div className="min-h-11 px-3 py-2.5 bg-card border border-border rounded-lg text-sm">
                {item.size || "N/A"}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Extra Ingredients
              </Label>
              <div className="min-h-11 px-3 py-2.5 bg-card border border-border rounded-lg text-sm">
                {item.extraIngredients || "None"}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Special Instructions
            </Label>
            <div className="min-h-11 px-3 py-2.5 bg-card border border-border rounded-lg text-sm">
              {item.note || "No special instructions"}
            </div>
          </div>

          {/* Time Left & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Time Left
              </Label>
              <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
                {item.timeLeft}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Quantity
              </Label>
              <div className="h-11 px-3 flex items-center bg-card border border-border rounded-lg text-sm font-medium">
                {item.quantity}x
              </div>
            </div>
          </div>

          {/* Status Update */}
          {canChangeStatus && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Update Status
              </Label>
              <Select
                value={currentStatus}
                onValueChange={(value) =>
                  onStatusChange(item.id, value as OrderStatus)
                }
              >
                <SelectTrigger className="w-full h-12 bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Receive">Receive</SelectItem>
                  <SelectItem value="Preparing">Preparing</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Served">Served</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
