// src/components/ExpenseType/ExpenseTypeModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ExpenseType {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ExpenseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExpenseType | string) => void;
  expenseType?: ExpenseType | null;
  mode: "add" | "edit";
}

export default function ExpenseTypeModal({
  isOpen,
  onClose,
  onSave,
  expenseType,
  mode,
}: ExpenseTypeModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode === "edit" && expenseType) {
      setName(expenseType.name);
    } else {
      setName("");
    }
  }, [mode, expenseType, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      if (mode === "edit" && expenseType) {
        onSave({
          ...expenseType,
          name: name.trim(),
        });
      } else {
        onSave(name.trim());
      }
      setName("");
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {mode === "edit" ? "Edit" : "Add"} Expense Type
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Expense Type Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter expense type name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-primary hover:bg-primary/90"
              disabled={!name.trim()}
            >
              {mode === "edit" ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
