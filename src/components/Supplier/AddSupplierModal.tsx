// ADD SUPPLIER MODAL - src/components/Supplier/AddSupplierModal.tsx
// ============================================
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
import { toast } from "sonner";
import type { Supplier } from "@/types/supplier";

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Omit<Supplier, "id" | "createdAt" | "updatedAt">) => void;
}

export default function AddSupplierModal({
  isOpen,
  onClose,
  onSave,
}: AddSupplierModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    location: "",
    total: 0,
    paid: 0,
    due: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.number ||
      !formData.email ||
      !formData.location
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    onSave(formData);
    toast.success("Supplier added successfully!");
    setFormData({
      name: "",
      number: "",
      email: "",
      location: "",
      total: 0,
      paid: 0,
      due: 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add Supplier
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm">Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-12"
              placeholder="Ibrahim"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Number</Label>
            <Input
              type="text"
              value={formData.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              className="h-12"
              placeholder="0187464621"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12"
              placeholder="ri@gmail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Location</Label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="h-12"
              placeholder="New York, USA"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/80"
            >
              Add Supplier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
