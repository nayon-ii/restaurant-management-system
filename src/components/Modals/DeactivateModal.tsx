// DEACTIVATE MODAL - src/components/Modals/DeactivateModal.tsx
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  buttonText?: string;
}

export default function DeactivateModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  buttonText = "Deactivate",
}: DeactivateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-md bg-card border-border">
        <div className="text-center space-y-6 py-4">
          <p className="text-lg font-medium text-foreground">
            {title || "Are you sure you want to deactivate this menu item?"}
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/80"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
