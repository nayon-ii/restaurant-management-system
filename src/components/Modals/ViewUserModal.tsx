// src/components/Modals/ViewUserModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function ViewUserModal({
  isOpen,
  onClose,
  user,
}: ViewUserModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-xl bg-card border-border max-h-[90vh] overflow-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            View User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* User Image */}
          {user.image && (
            <div className="flex justify-center mb-6">
              <img
                src={user.image}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* User ID */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              User ID
            </Label>
            <Input
              value={user.id}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Name */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Name
            </Label>
            <Input
              value={user.name}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Number */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Number
            </Label>
            <Input
              value={user.number || "N/A"}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Gmail */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Gmail
            </Label>
            <Input
              value={user.gmail}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Joining Date */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Joining Date
            </Label>
            <Input
              value={user.joiningDate || "N/A"}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Salary */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Salary
            </Label>
            <Input
              value={user.salary ? `${user.salary}` : "N/A"}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>

          {/* Role */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2">
              Role
            </Label>
            <Input
              value={user.role || "N/A"}
              readOnly
              className="bg-card border-input mt-2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
