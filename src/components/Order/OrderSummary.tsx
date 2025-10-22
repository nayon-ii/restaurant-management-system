// src/components/Order/OrderSummary.tsx

interface OrderSummaryProps {
  subtotal: number;
  serviceCharge: number;
  tax: number;
  discount: number;
  total: number;
}

export default function OrderSummary({
  subtotal,
  serviceCharge,
  tax,
  discount,
  total,
}: OrderSummaryProps) {
  return (
    <div className="space-y-3 pt-6 border-t border-border">
      <div className="flex justify-between text-sm">
        <p className="text-muted-foreground">Sub-Total</p>
        <p className="font-semibold">${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-muted-foreground">Service Charge</p>
        <p className="font-semibold">${serviceCharge.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-muted-foreground">Tax</p>
        <p className="font-semibold">${tax.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-muted-foreground">Discount</p>
        <p className="font-semibold">${discount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
        <p>Total</p>
        <p className="text-primary/90">${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
