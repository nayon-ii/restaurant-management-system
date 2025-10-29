// src/components/Order/ItemCustomizationForm.tsx
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { MenuItem } from "@/types/order";

interface ItemCustomizationFormProps {
  selectedItem: MenuItem;
  quantity: number;
  size: string;
  selectedExtras: string[];
  orderType: string;
  table: string;
  note: string;
  itemPrice: number;
  onQuantityChange: (quantity: number) => void;
  onSizeChange: (size: string) => void;
  onToggleExtra: (extra: string) => void;
  onOrderTypeChange: (type: string) => void;
  onTableChange: (table: string) => void;
  onNoteChange: (note: string) => void;
  onAddToCart: () => void;
}

export default function ItemCustomizationForm({
  selectedItem,
  quantity,
  size,
  selectedExtras,
  orderType,
  table,
  note,
  itemPrice,
  onQuantityChange,
  onSizeChange,
  onToggleExtra,
  onOrderTypeChange,
  onTableChange,
  onNoteChange,
  onAddToCart,
}: ItemCustomizationFormProps) {
  return (
    <div className="space-y-3 border-b border-[#ABABAB]">
      <div className="flex items-center gap-4 bg-background p-3 rounded-md border border-border">
        <img
          src={selectedItem.image}
          alt={selectedItem.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-foreground">{selectedItem.name}</p>
          <p className="text-sm text-muted-foreground">
            {selectedItem.category}
          </p>
          <p className="text-primary/90 font-bold mt-1">
            ${itemPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="font-semibold w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {selectedItem.sizes.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-3 block">Size</Label>
          <div className="flex gap-2">
            {selectedItem.sizes.map((s) => (
              <Button
                key={s.name}
                variant={size === s.name ? "default" : "outline"}
                onClick={() => onSizeChange(s.name)}
                className={`flex-1 rounded-md border ${
                  size === s.name ? "border-primary text-primary" : ""
                } bg-card`}
              >
                {s.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedItem.extras.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Extra Ingredients
          </Label>
          <div className="flex flex-wrap gap-2">
            {selectedItem.extras.map((e) => (
              <Button
                key={e.name}
                variant={
                  selectedExtras.includes(e.name) ? "default" : "outline"
                }
                onClick={() => onToggleExtra(e.name)}
                className={`flex-1 rounded-md border ${
                  selectedExtras.includes(e.name)
                    ? "border-primary text-primary"
                    : ""
                } bg-card`}
              >
                {e.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center gap-5">
        <div className="flex-1">
          <Label className="text-base font-semibold mb-3 block">
            Order Type
          </Label>
          <Select value={orderType} onValueChange={onOrderTypeChange}>
            <SelectTrigger className="h-12 w-full" iconClassName="text-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dine In">Dine In</SelectItem>
              <SelectItem value="Take Away">Take Away</SelectItem>
              <SelectItem value="Delivery">Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {orderType === "Dine In" && (
          <div className="flex-1">
            <Label className="text-base font-semibold mb-3 block">Table</Label>
            <Select value={table} onValueChange={onTableChange}>
              <SelectTrigger
                className="h-12 w-full"
                iconClassName="text-primary"
              >
                <SelectValue placeholder="Select Table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1a">1a</SelectItem>
                <SelectItem value="2b">2b</SelectItem>
                <SelectItem value="3b">3b</SelectItem>
                <SelectItem value="4c">4c</SelectItem>
                <SelectItem value="5d">5d</SelectItem>
                <SelectItem value="6B">6B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Note</Label>
        <Input
          placeholder="If any"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="h-12"
        />
      </div>

      <Button
        onClick={onAddToCart}
        className="w-full h-12 bg-primary hover:bg-primary/80 text-white rounded-md text-base font-semibold mb-2"
      >
        Add
      </Button>
    </div>
  );
}
