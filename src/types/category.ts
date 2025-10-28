// src/types/category.ts
export interface Category {
  id: string;
  name: string;
  number: string;
  image: string;
  subCategoriesCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: string;
  name: string;
  number: string;
  categoryId: string;
  categoryName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
