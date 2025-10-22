// src/components/Order/ItemDetailModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface OrderItem {
  id: string;
  name: string;
  category: string;
  image: string;
  status: string;
  timeLeft: string;
  size?: string;
  extraIngredients?: string;
  note?: string;
}

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: OrderItem | null;
  currentStatus: string;
  onStatusChange: (itemId: string, newStatus: string) => void;
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
            Selected Items
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Item Info */}
          <div className="flex items-center gap-4 p-3 bg-card rounded-xl border border-input">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-orange-600">
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
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
          </div>

          {/* Size & Extra Ingredients */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Size
              </Label>
              <Input
                value={item.size || "N/A"}
                readOnly
                className="bg-card border-input mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Extra Ingredients
              </Label>
              <Input
                value={item.extraIngredients || "None"}
                readOnly
                className="bg-card border-input mt-2"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Note
            </Label>
            <Input
              value={item.note || "No notes"}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Time Left */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Time Left
            </Label>
            <Input
              value={item.timeLeft}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Status Update - Chef can only set Preparing, Ready, Served */}

          {canChangeStatus && (
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Update Status
              </Label>
              <Select
                value={currentStatus}
                onValueChange={(value) => onStatusChange(item.id, value)}
              >
                <SelectTrigger className="w-full h-12 bg-background border-input mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
