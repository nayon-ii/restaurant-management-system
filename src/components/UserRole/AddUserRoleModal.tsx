// ADD USER ROLE MODAL - src/components/UserRole/AddUserRoleModal.tsx
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

interface AddUserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleName: string) => void;
}

export default function AddUserRoleModal({
  isOpen,
  onClose,
  onSave,
}: AddUserRoleModalProps) {
  const [roleName, setRoleName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }

    onSave(roleName);
    toast.success("User role added successfully!");
    setRoleName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add User Role
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Role Name
            </Label>
            <Input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="h-12 bg-background"
              placeholder="write role name"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/80"
          >
            Create Role
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
