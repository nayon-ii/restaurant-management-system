// src/components/Order/CartItemCard.tsx
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/Pages/Dashboard/Order/CreateOrderPage";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (cartId: string) => void;
}

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border">
      <img
        src={item.menuItem.image}
        alt={item.menuItem.name}
        className="w-14 h-14 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground">{item.menuItem.name}</p>
        <p className="text-sm text-muted-foreground">
          {item.menuItem.category}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{item.quantity}x</p>
      </div>
      <div className="text-right flex flex-col items-end gap-1">
        <p className="font-bold text-foreground">
          ${(item.itemTotal * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-primary/90 hover:text-orange-700 hover:bg-orange-50"
          onClick={() => onRemove(item.cartId)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
