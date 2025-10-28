// MOCK DATA - src/data/mockTables.ts

import type { Table } from "@/types/table";
export const mockTables: Table[] = [
  {
    id: "table-1",
    tableNo: "1B",
    capacity: 4,
    location: "Main Hall",
    isActive: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "table-2",
    tableNo: "1A",
    capacity: 2,
    location: "Main Hall",
    isActive: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "table-3",
    tableNo: "1C",
    capacity: 6,
    location: "Private Room",
    isActive: true,
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
  },
  {
    id: "table-4",
    tableNo: "1D",
    capacity: 4,
    location: "Outdoor",
    isActive: true,
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
  },
  {
    id: "table-5",
    tableNo: "1C",
    capacity: 8,
    location: "VIP Section",
    isActive: true,
    createdAt: "2025-01-13",
    updatedAt: "2025-01-13",
  },
];
