// KITCHEN SKELETON - src/components/Skeleton/KitchenSkeleton.tsx
export function KitchenColumnSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          {/* Header Skeleton */}
          <div className="bg-muted h-10 animate-pulse" />

          {/* Body Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
            </div>
            <div className="h-3 bg-muted rounded animate-pulse w-1/3 ml-auto" />
            <div className="flex gap-2 pt-2">
              <div className="flex-1 h-9 bg-muted rounded animate-pulse" />
              <div className="h-9 w-9 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
