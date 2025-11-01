// MAKE PAYMENT MODAL - src/components/Supplier/MakePaymentModal.tsx
// ============================================
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
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import type { Bill } from "@/types/supplier";

interface MakePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill | null;
}

export default function MakePaymentModal({
  isOpen,
  onClose,
  bill,
}: MakePaymentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    voucherNumber: "",
    supplier: "",
    date: "",
    totalAmount: "",
    totalPaid: "",
    paymentAmount: "",
    due: "",
    paymentMethod: "",
    note: "",
  });

  useEffect(() => {
    if (bill) {
      const newDue = bill.due - parseFloat(formData.paymentAmount || "0");
      setFormData({
        voucherNumber: bill.billId,
        supplier: bill.supplier,
        date: bill.date,
        totalAmount: bill.totalAmount.toFixed(2),
        totalPaid: bill.paid.toFixed(2),
        paymentAmount: "",
        due: newDue > 0 ? newDue.toFixed(2) : "0",
        paymentMethod: bill.paymentMethod || "Cash",
        note: "",
      });
    }
  }, [bill]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "paymentAmount" && bill) {
        const paymentAmt = parseFloat(value) || 0;
        const newDue = bill.due - paymentAmt;
        updated.due = newDue > 0 ? newDue.toFixed(2) : "0";
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.paymentAmount || parseFloat(formData.paymentAmount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Payment submitted successfully!");
    setIsSubmitting(false);
    onClose();
  };

  if (!bill) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-xs" />
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Make Payment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-sm">Voucher Number</Label>
            <Input
              type="text"
              value={formData.voucherNumber}
              className="h-12"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Supplier</Label>
            <Input
              type="text"
              value={formData.supplier}
              className="h-12"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Date</Label>
            <Input
              type="text"
              value={formData.date}
              className="h-12"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Total Amount</Label>
            <Input
              type="text"
              value={`${formData.totalAmount}`}
              className="h-12"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Total Paid</Label>
            <Input
              type="text"
              value={`${formData.totalPaid}`}
              className="h-12"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Payment Amount</Label>
            <Input
              type="number"
              value={formData.paymentAmount}
              onChange={(e) =>
                handleInputChange("paymentAmount", e.target.value)
              }
              className="h-12"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Due</Label>
            <Input type="text" value={formData.due} className="h-12" readOnly />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Payment Method</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                handleInputChange("paymentMethod", value)
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Cash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bkash">Bkash</SelectItem>
                <SelectItem value="Nagad">Nagad</SelectItem>
                <SelectItem value="Rocket">Rocket</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Note</Label>
            <Textarea
              value={formData.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              className="min-h-20"
              placeholder="Acf"
            />
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
                  Submitting...
                </>
              ) : (
                "Submit Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
