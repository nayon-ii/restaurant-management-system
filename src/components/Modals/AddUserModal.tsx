// src/components/Modals/AddUserModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  number?: string;
  gmail: string;
  role?: string;
  joiningDate?: string;
  salary?: number;
  image?: string;
  isActive: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onAdd,
}: AddUserModalProps) {
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    number: "",
    gmail: "",
    joiningDate: "",
    salary: 0,
    role: "",
    isActive: true,
  });

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Validation Error", {
        description: "Please enter staff name",
      });
      return;
    }

    if (!formData.number?.trim()) {
      toast.error("Validation Error", {
        description: "Please enter staff number",
      });
      return;
    }

    if (!formData.gmail.trim()) {
      toast.error("Validation Error", {
        description: "Please enter staff email",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.gmail)) {
      toast.error("Validation Error", {
        description: "Please enter a valid email address",
      });
      return;
    }

    if (!formData.joiningDate) {
      toast.error("Validation Error", {
        description: "Please select joining date",
      });
      return;
    }

    if (!formData.salary || formData.salary <= 0) {
      toast.error("Validation Error", {
        description: "Please enter a valid salary amount",
      });
      return;
    }

    if (!formData.role) {
      toast.error("Validation Error", {
        description: "Please select a role",
      });
      return;
    }

    // All validations passed, add user
    onAdd(formData);

    // Reset form
    setFormData({
      id: "",
      name: "",
      number: "",
      gmail: "",
      joiningDate: "",
      salary: 0,
      role: "",
      isActive: true,
    });

    onClose();
  };

  const handleInputChange = (field: keyof User, value: string | number) => {
    if (field === "salary") {
      setFormData({
        ...formData,
        [field]: typeof value === "string" && value === "" ? 0 : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      id: "",
      name: "",
      number: "",
      gmail: "",
      joiningDate: "",
      salary: 0,
      role: "",
      isActive: true,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Name
            </Label>
            <Input
              placeholder="Write staff name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Number */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Number
            </Label>
            <Input
              placeholder="Write staff number"
              value={formData.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Gmail */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Gmail
            </Label>
            <Input
              type="email"
              placeholder="Write your gmail"
              value={formData.gmail}
              onChange={(e) => handleInputChange("gmail", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Joining Date */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Joining Date
            </Label>
            <Input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => handleInputChange("joiningDate", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Salary */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Salary
            </Label>
            <Input
              type="number"
              placeholder="Enter staff salary"
              value={formData.salary || ""}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              required
              min="0"
              className="mt-2"
            />
          </div>

          {/* Role */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value: string) =>
                handleInputChange("role", value)
              }
            >
              <SelectTrigger className="w-full h-12 bg-background border-input mt-2">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Chef">Chef</SelectItem>
                <SelectItem value="Cleaner">Cleaner</SelectItem>
                <SelectItem value="Waiter">Waiter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Button */}
          <Button onClick={handleSubmit} className="w-full h-12 mt-4">
            Add User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
