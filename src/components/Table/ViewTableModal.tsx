// VIEW TABLE MODAL - src/components/Table/ViewTableModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Table } from "@/types/table";

interface ViewTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: Table | null;
}

export default function ViewTableModal({
  isOpen,
  onClose,
  table,
}: ViewTableModalProps) {
  if (!table) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Table Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Table Number
            </Label>
            <div className="h-12 px-4 flex items-center bg-background border border-border rounded-xl text-sm text-foreground">
              {table.tableNo}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Capacity
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-xl text-sm text-foreground">
                {table.capacity} People
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Location
              </Label>
              <div className="h-12 px-4 flex items-center bg-background border border-border rounded-xl text-sm text-foreground">
                {table.location}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </Label>
            <div className="h-12 px-4 flex items-center bg-background border border-border rounded-xl text-sm">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  table.isActive
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                {table.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
