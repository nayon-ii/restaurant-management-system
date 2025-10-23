// src/components/Order/MenuItemCard.tsx
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types/order";

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onSelect }: MenuItemCardProps) {
  return (
    <div
      className="bg-background rounded-xl border border-border p-3 cursor-pointer hover:shadow-lg hover:border-primary transition-all"
      onClick={() => onSelect(item)}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-cover rounded-lg mb-3"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300?text=No+Image";
          }}
        />
      </div>
      <p className="font-medium text-foreground mb-2">{item.name}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <img
          src="/icons/clock.svg"
          alt="Time"
          className="w-5 h-5 object-cover"
        />
        <span>{item.prepTime} min</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-primary/90 font-bold text-lg">
          ${item.basePrice.toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full bg-gray-200 hover:bg-primary/50 text-primary"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
