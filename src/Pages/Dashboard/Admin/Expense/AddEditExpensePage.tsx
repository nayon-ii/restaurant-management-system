// src/Pages/Dashboard/Expense/AddEditExpensePage.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Printer, Check, ChevronsUpDown } from "lucide-react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  mockExpenses,
  mockExpenseTypes,
  mockSupplierOptions,
} from "@/data/mockExpenses";

export default function AddEditExpensePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  // Form state
  const [expenseType, setExpenseType] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("0");
  const [paidAmount, setPaidAmount] = useState("0");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<{
    expenseType?: string;
    name?: string;
    quantity?: string;
    unitPrice?: string;
    supplier?: string;
    date?: string;
  }>({});

  useEffect(() => {
    if (isEdit) {
      const fetchExpense = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const expense = mockExpenses.find((e) => e.id === id);
        if (expense) {
          setExpenseType(expense.expenseType);
          setName(expense.name);
          setQuantity(expense.quantity.toString());
          setUnitPrice(expense.unitPrice.toString());
          setTotalDiscount(expense.totalDiscount.toString());
          setPaidAmount(expense.paidAmount.toString());
          setDate(expense.createdAt);
        } else {
          toast.error("Expense not found");
          navigate("/dashboard/expenses");
        }

        setIsLoading(false);
      };
      fetchExpense();
    }
  }, [id, isEdit, navigate]);

  const calculateTotalPrice = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(unitPrice) || 0;
    return (qty * price).toFixed(2);
  };

  const calculateTotalAmount = () => {
    const totalPrice = parseFloat(calculateTotalPrice()) || 0;
    const discount = parseFloat(totalDiscount) || 0;
    return (totalPrice - discount).toFixed(2);
  };

  const calculateDueAmount = () => {
    const totalAmt = parseFloat(calculateTotalAmount()) || 0;
    const paid = parseFloat(paidAmount) || 0;
    return (totalAmt - paid).toFixed(2);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!expenseType) newErrors.expenseType = "Expense type is required";
    if (!name) newErrors.name = "Name is required";
    if (!quantity || parseFloat(quantity) <= 0)
      newErrors.quantity = "Valid quantity is required";
    if (!unitPrice || parseFloat(unitPrice) <= 0)
      newErrors.unitPrice = "Valid unit price is required";
    if (!date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(
      isEdit ? "Expense updated successfully!" : "Expense added successfully!"
    );
    setIsSubmitting(false);
    navigate("/dashboard/expenses");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      toast.error("Failed to open print window. Please allow popups.");
      return;
    }

    const invoiceNo = isEdit
      ? mockExpenses.find((e) => e.id === id)?.invoiceNo || "N/A"
      : `EXP-${Date.now()}`;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

    const printContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Expense Invoice - ${invoiceNo}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f9f9f9;
      color: #1f2937;
      padding: 20px;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #f97316, #fb923c);
      color: white;
      padding: 24px;
      text-align: center;
    }
    .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
    .header p { opacity: 0.9; font-size: 14px; }
    .content { padding: 32px; }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
      font-size: 14px;
    }
    .info-card {
      background: #fff7ed;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #f97316;
    }
    .info-card h3 {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #f97316;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .info-card p { color: #374151; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      font-size: 14px;
    }
    th {
      background: #f97316;
      color: white;
      padding: 14px 12px;
      text-align: left;
      font-weight: 600;
    }
    td {
      padding: 14px 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    tr:nth-child(even) td { background: #fff7ed; }
    .text-right { text-align: right; }
    .totals {
      float: right;
      width: 350px;
      margin-top: 32px;
    }
    .totals table { font-size: 15px; }
    .totals td {
      padding: 10px 0;
      border: none;
    }
    .totals .label { font-weight: 600; color: #374151; }
    .totals .amount { text-align: right; font-weight: 600; }
    .totals .final {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      border-top: 2px solid #f97316;
      padding-top: 12px;
    }
    .footer {
      text-align: center;
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px dashed #d1d5db;
      color: #6b7280;
      font-size: 13px;
    }
    @media print {
      body { background: white; padding: 0; }
      .invoice-container { box-shadow: none; }
      @page { margin: 0.5in; }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <h1>Expense Invoice</h1>
      <p>Professional Expense Receipt</p>
    </div>
    <div class="content">
      <div class="info-grid">
        <div class="info-card">
          <h3>Invoice No</h3>
          <p><strong>${invoiceNo}</strong></p>
        </div>
        <div class="info-card">
          <h3>Expense Date</h3>
          <p><strong>${formattedDate}</strong></p>
        </div>
        <div class="info-card">
          <h3>Expense Type</h3>
          <p><strong>${expenseType}</strong></p>
        </div>
        <div class="info-card">
          <h3>Supplier</h3>
          <p><strong>${supplier}</strong></p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th class="text-right">Quantity</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${name}</td>
            <td class="text-right">${parseFloat(quantity).toFixed(2)}</td>
            <td class="text-right">$${parseFloat(unitPrice).toFixed(2)}</td>
            <td class="text-right">$${calculateTotalPrice()}</td>
          </tr>
        </tbody>
      </table>

      <div class="totals">
        <table>
          <tr>
            <td class="label">Subtotal</td>
            <td class="amount">$${calculateTotalPrice()}</td>
          </tr>
          <tr>
            <td class="label">Discount</td>
            <td class="amount">-$${parseFloat(totalDiscount).toFixed(2)}</td>
          </tr>
          <tr>
            <td class="label">Paid Amount</td>
            <td class="amount">$${parseFloat(paidAmount).toFixed(2)}</td>
          </tr>
          <tr class="final">
            <td class="label">Due Amount</td>
            <td class="amount">$${calculateDueAmount()}</td>
          </tr>
        </table>
      </div>

      <div style="clear: both;"></div>

      <div class="footer">
        <p>Thank you for your expense record!</p>
        <p>This is a system-generated invoice.</p>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    toast.success("Print preview ready");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border p-4 md:p-5.5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/expenses")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {isEdit ? "Edit Expense" : "Add Expense"}
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
            {/* Expense Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Expense Type <span className="text-red-500">*</span>
              </Label>
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger
                  className={`h-12! w-full ${
                    errors.expenseType ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Furniture" />
                </SelectTrigger>
                <SelectContent>
                  {mockExpenseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expenseType && (
                <p className="text-sm text-red-500">{errors.expenseType}</p>
              )}
            </div>

            {/* Expense Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Expense</h3>
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-1">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    Quantity <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`h-12 ${
                      errors.quantity ? "border-red-500" : ""
                    }`}
                    placeholder="Write QTY"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">{errors.quantity}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    Unit Price <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className={`h-12 ${
                      errors.unitPrice ? "border-red-500" : ""
                    }`}
                    placeholder="Write per unit price"
                  />
                  {errors.unitPrice && (
                    <p className="text-sm text-red-500">{errors.unitPrice}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Total Price</Label>
                  <Input
                    type="text"
                    value={calculateTotalPrice()}
                    className="h-12"
                    placeholder="Total price"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Total Discount</Label>
                  <Input
                    type="number"
                    value={totalDiscount}
                    onChange={(e) => setTotalDiscount(e.target.value)}
                    className="h-12"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Total Amount</Label>
                  <Input
                    type="text"
                    value={calculateTotalAmount()}
                    className="h-12"
                    placeholder="0.00"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Paid Amount</Label>
                  <Input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className="h-12"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Due Amount</Label>
                  <Input
                    type="text"
                    value={calculateDueAmount()}
                    className="h-12"
                    placeholder="0.00"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Combobox Supplier Field */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    Supplier
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                          "w-full h-12 justify-between bg-card",
                          !supplier && "text-muted-foreground"
                        )}
                      >
                        {supplier || "Type or select supplier name"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search or type supplier..."
                          value={supplier}
                          onValueChange={setSupplier}
                        />
                        <CommandList>
                          <CommandEmpty>
                            <div className="p-2 text-sm text-muted-foreground">
                              Press Enter to use "{supplier}"
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {mockSupplierOptions.map((option) => (
                              <CommandItem
                                key={option}
                                value={option}
                                onSelect={(currentValue) => {
                                  setSupplier(currentValue);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    supplier === option
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-1">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`h-12 ${errors.date ? "border-red-500" : ""}`}
                    placeholder="mm/dd/yyyy"
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 h-12 rounded-md bg-primary hover:bg-primary/80"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {isEdit ? "Updating..." : "Adding..."}
                  </>
                ) : isEdit ? (
                  "Update Expense"
                ) : (
                  "Add Expense"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handlePrint}
                className="h-12 w-12 rounded-md"
              >
                <Printer className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
