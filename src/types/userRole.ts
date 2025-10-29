// TYPES - src/types/userRole.ts
// export interface Permission {
//   id: string;
//   name: string;
//   category: string;
//   isEnabled: boolean;
// }

// export interface UserRole {
//   id: string;
//   name: string;
//   permissions: Permission[];
//   createdAt: string;
//   updatedAt: string;
// }

export interface PermissionCategory {
  name: string;
  permissions: Permission[];
}


export interface Permission {
  id: string;
  name: string;
  category: string;
  isEnabled: boolean;
  isParent?: boolean;
  children?: Permission[];
}

export interface UserRole {
  id: string;
  name: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}