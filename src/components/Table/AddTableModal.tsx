// ADD TABLE MODAL - src/components/Table/AddTableModal.tsx
import { useState } from "react";
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
import { toast } from "sonner";
import type { Table } from "@/types/table";

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (table: Omit<Table, "id" | "createdAt" | "updatedAt">) => void;
}

export default function AddTableModal({
  isOpen,
  onClose,
  onSave,
}: AddTableModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tableNo: "",
    capacity: "",
    location: "",
    isActive: true,
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tableNo || !formData.capacity || !formData.location) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    onSave({
      tableNo: formData.tableNo,
      capacity: Number(formData.capacity),
      location: formData.location,
      isActive: formData.isActive,
    });

    toast.success("Table added successfully!");
    setIsSubmitting(false);
    setFormData({ tableNo: "", capacity: "", location: "", isActive: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add New Table
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Table Number
            </Label>
            <Input
              type="text"
              value={formData.tableNo}
              onChange={(e) => handleInputChange("tableNo", e.target.value)}
              className="h-12 bg-background"
              placeholder="e.g., 1A, 2B"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Capacity
              </Label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                className="h-12 bg-background"
                placeholder="e.g., 4"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Location
              </Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="h-12 bg-background"
                placeholder="e.g., Main Hall"
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
                  Adding...
                </>
              ) : (
                "Add Table"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
