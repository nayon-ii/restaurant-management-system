import type { Permission, UserRole } from "../types/userRole";

// MOCK DATA - src/data/mockUserRoles.ts
export const mockPermissions: Permission[] = [
  // Menu Permissions
  { id: "menu-1", name: "Manage Menu", category: "Menu", isEnabled: true },
  { id: "menu-2", name: "Add menu", category: "Menu", isEnabled: false },
  { id: "menu-3", name: "Edit menu", category: "Menu", isEnabled: false },
  { id: "menu-4", name: "Create order", category: "Menu", isEnabled: false },

  // Category Permissions
  {
    id: "cat-1",
    name: "Manage Category",
    category: "Category",
    isEnabled: true,
  },
  {
    id: "cat-2",
    name: "Add category Type",
    category: "Category",
    isEnabled: false,
  },
  {
    id: "cat-3",
    name: "Edit category",
    category: "Category",
    isEnabled: false,
  },
  {
    id: "cat-4",
    name: "Manage Sub-category",
    category: "Category",
    isEnabled: false,
  },
  {
    id: "cat-5",
    name: "Add Sub-category",
    category: "Category",
    isEnabled: false,
  },
  {
    id: "cat-6",
    name: "Edit Sub-category",
    category: "Category",
    isEnabled: false,
  },

  // User Permissions
  { id: "user-1", name: "Manage User", category: "User", isEnabled: true },
  { id: "user-2", name: "Add user", category: "User", isEnabled: false },
  { id: "user-3", name: "Edit user", category: "User", isEnabled: false },
  { id: "user-4", name: "Manage Supplier", category: "User", isEnabled: false },
  { id: "user-5", name: "Add Supplier", category: "User", isEnabled: false },
  { id: "user-6", name: "Edit Supplier", category: "User", isEnabled: false },

  // Purchases Permissions
  {
    id: "pur-1",
    name: "Manage Purchase",
    category: "Purchases",
    isEnabled: true,
  },
  {
    id: "pur-2",
    name: "Add purchase",
    category: "Purchases",
    isEnabled: false,
  },
  {
    id: "pur-3",
    name: "Edit purchase",
    category: "Purchases",
    isEnabled: false,
  },

  // Expense Permissions
  { id: "exp-1", name: "Manage Expense", category: "Expense", isEnabled: true },
  {
    id: "exp-2",
    name: "Add expense type",
    category: "Expense",
    isEnabled: false,
  },
  {
    id: "exp-3",
    name: "Edit expense type",
    category: "Expense",
    isEnabled: false,
  },
  { id: "exp-4", name: "Add expense", category: "Expense", isEnabled: false },
  { id: "exp-5", name: "Edit expense", category: "Expense", isEnabled: false },
];

export const mockUserRoles: UserRole[] = [
  {
    id: "role-1",
    name: "Admin",
    permissions: mockPermissions.map((p) => ({ ...p, isEnabled: true })),
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "role-2",
    name: "Manager",
    permissions: mockPermissions,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "role-3",
    name: "Chef",
    permissions: mockPermissions.map((p) => ({ ...p, isEnabled: false })),
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
  },
  {
    id: "role-4",
    name: "Waiter",
    permissions: mockPermissions.map((p) => ({ ...p, isEnabled: false })),
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
  },
  {
    id: "role-5",
    name: "Cashier",
    permissions: mockPermissions.map((p) => ({ ...p, isEnabled: false })),
    createdAt: "2025-01-13",
    updatedAt: "2025-01-13",
  },
  {
    id: "role-6",
    name: "Cleaner",
    permissions: mockPermissions.map((p) => ({ ...p, isEnabled: false })),
    createdAt: "2025-01-13",
    updatedAt: "2025-01-13",
  },
];
