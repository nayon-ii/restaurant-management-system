// src/components/Category/EditCategoryModal.tsx
import { useState, useRef, useEffect } from "react";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";
import type { Category } from "@/types/category";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onSave: (category: Category) => void;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  category,
  onSave,
}: EditCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    image: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        number: category.number,
        image: category.image,
      });
      setImagePreview(category.image);
    }
  }, [category]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        handleInputChange("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !formData.name || !formData.number) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    onSave({
      ...category,
      name: formData.name,
      number: formData.number,
      image: formData.image,
      updatedAt: new Date().toISOString(),
    });

    toast.success("Category updated successfully!");
    setIsSubmitting(false);
  };

  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="font-semibold">Category Image</Label>
            <div className="flex flex-col items-center gap-3">
              {imagePreview ? (
                <div className="w-32 h-32 rounded-full overflow-hidden bg-linear-to-br from-orange-50 to-orange-100 border-4 border-white shadow-xl">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-orange-50 to-orange-100 border-4 border-white shadow-xl flex items-center justify-center">
                  <ImageUp className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                className="gap-3 w-40 h-10 rounded-xl font-semibold"
              >
                <ImageUp className="w-4 h-4" />
                Change Image
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Category Name
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 bg-background"
                placeholder="e.g., Main Course"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Category Number
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
              className="flex-1 h-12 rounded-xl"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Updating...
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
