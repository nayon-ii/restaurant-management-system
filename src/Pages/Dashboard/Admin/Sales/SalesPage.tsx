// src\Pages\Dashboard\Admin\Sales\SalesPage.tsx
import OrdersPage from "../../Order/OrdersPage";

export default function SalesPage() {
  return (
    <div>
      <OrdersPage
        basePath="/dashboard/sales"
        headerTitle="Sales Order Management"
        headerSubtitle=""
      />
    </div>
  );
}
