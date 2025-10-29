// src/components/Category/EditSubCategoryModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import type { SubCategory, Category } from "@/types/category";

interface EditSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  subCategory: SubCategory | null;
  onSave: (subCategory: SubCategory) => void;
}

export default function EditSubCategoryModal({
  isOpen,
  onClose,
  categories,
  subCategory,
  onSave,
}: EditSubCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    categoryId: "",
    categoryName: "",
  });

  useEffect(() => {
    if (subCategory) {
      setFormData({
        name: subCategory.name,
        number: subCategory.number,
        categoryId: subCategory.categoryId,
        categoryName: subCategory.categoryName,
      });
    }
  }, [subCategory]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    setFormData((prev) => ({
      ...prev,
      categoryId,
      categoryName: category?.name || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !subCategory ||
      !formData.name ||
      !formData.number ||
      !formData.categoryId
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    onSave({
      ...subCategory,
      name: formData.name,
      number: formData.number,
      categoryId: formData.categoryId,
      categoryName: formData.categoryName,
      updatedAt: new Date().toISOString(),
    });

    toast.success("Sub-category updated successfully!");
    setIsSubmitting(false);
  };

  if (!subCategory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Edit Sub-Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Parent Category
            </Label>
            <Select
              value={formData.categoryId}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="h-12 bg-background">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Sub-Category Name
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 bg-background"
                placeholder="e.g., Pizza"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Sub-Category Number
              </Label>
              <Input
                type="text"
                value={formData.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                className="h-12 bg-background"
                placeholder="e.g., 001"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-md"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-md bg-primary hover:bg-primary/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Updating...
                </>
              ) : (
                "Update Sub-Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
