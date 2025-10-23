// src/components/Order/ReviewSummaryCard.tsx

import type { CartItem } from "@/types/order";

interface ReviewSummaryCardProps {
  item: CartItem;
}

export default function ReviewSummaryCard({ item }: ReviewSummaryCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
      <img
        src={item.menuItem.image}
        alt={item.menuItem.name}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold">{item.menuItem.name}</p>
        <p className="text-sm text-muted-foreground">{item.quantity}x</p>
      </div>
      <p className="font-bold">
        ${(item.itemTotal * item.quantity).toFixed(2)}
      </p>
      
    </div>
  );
}