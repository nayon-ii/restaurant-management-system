// ADD MENU PAGE - src/Pages/Dashboard/Menu/AddMenuPage.tsx
// ============================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MenuForm from "@/components/Menu/MenuForm";
import type { MenuItem } from "@/types/menu";

export default function AddMenuPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData: Partial<MenuItem> = {
    name: "",
    category: "",
    subCategory: "",
    description: "",
    image: "",
    airViewImage: "",
    cookingTime: "00 min",
    ingredients: [],
    extraIngredients: [],
    sizes: [],
  };

  const handleSubmit = async (formData: Partial<MenuItem>) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form data::", formData);

    toast.success("Menu item created successfully!");
    setIsSubmitting(false);
    navigate("/dashboard/menu");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border p-4 md:p-5.5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/menu")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Add Menu</h1>
        </div>
      </div>

      <div className="p-4 md:p-8 scrollbar-thin">
        <MenuForm
          initialData={initialFormData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitButtonText="Create Menu"
        />
      </div>
    </div>
  );
}
