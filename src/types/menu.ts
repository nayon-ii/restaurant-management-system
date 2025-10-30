// src/types/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  image: string;
  airViewImage?: string;
  cookingTime: string;
  ingredients?: Ingredient[];
  extraIngredients: ExtraIngredient[];
  sizes?: MenuSize[];
  variants?: MenuVariant[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  availableQty: number;
  consumptionQty: number;
}

export interface ExtraIngredient {
  id: string;
  name: string;
  price: number;
}

export interface MenuSize {
  id: string;
  size: string;
  regularPrice: number;
  offerPrice: number;
}

export interface MenuVariant {
  id: string;
  name: string;
  cost: number;
  price: number;
  discount: number;
  ingredients: Ingredient[];
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}
