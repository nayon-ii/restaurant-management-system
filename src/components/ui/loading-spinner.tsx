import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "ring";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  variant = "ring",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  // Modern Spinner (default)
  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>
    );
  }

  // Dots Loader
  if (variant === "dots") {
    const dotSize = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
    };

    return (
      <div className={cn("flex items-center gap-1", className)}>
        <div
          className={cn(
            "rounded-full bg-primary animate-bounce",
            dotSize[size]
          )}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={cn(
            "rounded-full bg-primary animate-bounce",
            dotSize[size]
          )}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={cn(
            "rounded-full bg-primary animate-bounce",
            dotSize[size]
          )}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  }

  // Pulse Loader
  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
        <div className="absolute inset-0 rounded-full bg-primary" />
      </div>
    );
  }

  // Ring Loader (double ring)
  if (variant === "ring") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin" />
      </div>
    );
  }

  return null;
}
