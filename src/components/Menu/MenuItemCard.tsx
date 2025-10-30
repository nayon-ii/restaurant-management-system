//  src/components/Menu/MenuItemCard.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SquarePen } from "lucide-react";
import type { MenuItem } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItem;
  onStatusToggle: (item: MenuItem) => void;
}

export default function MenuItemCard({
  item,
  onStatusToggle,
}: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Image Container - Fixed Height */}
        <div className="w-full h-64 mb-3 rounded-md overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-scale-down rounded-md"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400";
            }}
          />
        </div>

        {/* Content Section - Flexible Height */}
        <div className="flex-1 flex flex-col">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <span className="font-bold text-lg whitespace-nowrap ml-2">
              ${item.sizes?.[0]?.offerPrice.toFixed(2) || "0.00"}
            </span>
          </div>

          {/* Description - Fixed Height */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-10">
            {item.description}
          </p>

          {/* Actions - Always at Bottom */}
          <div className="flex items-center gap-4 mt-auto">
            <Link to={`/dashboard/menu/${item.id}`} className="flex-1">
              <Button className="w-full gap-2 bg-primary hover:bg-primary/80 text-white rounded-md h-10">
                <SquarePen className="w-4 h-4" />
                Edit
              </Button>
            </Link>

            {/* Toggle Switch */}
            <button
              onClick={() => onStatusToggle(item)}
              className={`relative w-20 h-10 rounded-full transition-colors ${
                item.isActive ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={item.isActive ? "Deactivate item" : "Activate item"}
            >
              <span
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  item.isActive ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
