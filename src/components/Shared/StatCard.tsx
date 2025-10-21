// src\components\Shared\StatCard.tsx
import { useState } from "react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  image?: string;
  valueColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  image,
  valueColor = "text-foreground",
}: StatCardProps) {
  const [imageError, setImageError] = useState(false);

  const showImage = image && !imageError;

  return (
    <div
      className="bg-card rounded-2xl p-6 hover:shadow-lg transition-shadow"
      style={{
        boxShadow: "0px 8px 32px 0px #00000026",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0px 12px 48px 0px #00000040";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0px 8px 32px 0px #00000026";
      }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg md:text-2xl font-medium text-dark dark:text-foreground">
            {title}
          </h3>
          <h2
            className={`text-xl md:text-4xl font-semibold text-dark dark:text-foreground ${valueColor}`}
          >
            {value}
          </h2>
        </div>
        <div className="p-1 rounded-xl flex items-center justify-center w-12 h-12">
          {showImage ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            icon
          )}
        </div>
      </div>
    </div>
  );
}
