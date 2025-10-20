import { useTheme } from "@/hooks/useTheme";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { actualTheme } = useTheme();

  return (
    <Sonner
      theme={actualTheme as ToasterProps["theme"]}
      position="top-center" 
      duration={3000}
      closeButton={true} 
      richColors={true} 
      expand={false}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground hover:group-[.toast]:bg-primary/90",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground hover:group-[.toast]:bg-muted/90",
          closeButton:
            "group-[.toast]:bg-card group-[.toast]:text-foreground group-[.toast]:border-border",
          // Success - Green background
          success:
            "group-[.toast]:bg-green-600 group-[.toast]:text-white group-[.toast]:border-green-700",
          // Error - Red background
          error:
            "group-[.toast]:bg-red-600 group-[.toast]:text-white group-[.toast]:border-red-700",
          // Warning - Yellow/Orange background
          warning:
            "group-[.toast]:bg-orange-600 group-[.toast]:text-white group-[.toast]:border-orange-700",
          // Info - Blue background
          info: "group-[.toast]:bg-blue-600 group-[.toast]:text-white group-[.toast]:border-blue-700",
        },
        style: {
          padding: "16px",
          gap: "8px",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
