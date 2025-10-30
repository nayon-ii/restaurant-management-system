interface TopSellingItemCardProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  revenue: number;
}

export default function TopSellingItemCard({
  name,
  image,
  quantity,
  revenue,
}: TopSellingItemCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
      {/* Item Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-linear-to-br from-primary/20 to-primary/10">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          {quantity} Sold
        </p>
      </div>

      {/* Revenue */}
      <div className="shrink-0 text-right">
        <p className="font-bold text-foreground text-base md:text-lg">
          ${revenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
