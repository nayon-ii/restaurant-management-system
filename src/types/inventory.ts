// ============================================
// TYPES - src/types/inventory.ts
// ============================================
export interface InventoryItem {
  id: string;
  name: string;
  sufficient: string;
  low: string;
  outOfStock: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
