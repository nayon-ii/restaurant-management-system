// src/hooks/useUserRole.ts
import { useAppSelector } from "@/redux/hooks";

/**
 * Custom hook to get the current user's role
 * @returns The user's role or null if not authenticated
 */
export const useUserRole = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user?.role || null;
};

/**
 * Custom hook to check if the current user has a specific role
 * @param role - The role to check against
 * @returns boolean indicating if user has the role
 */
export const useHasRole = (role: string) => {
  const userRole = useUserRole();
  return userRole === role;
};

/**
 * Custom hook to check if the current user has any of the specified roles
 * @param roles - Array of roles to check against
 * @returns boolean indicating if user has any of the roles
 */
export const useHasAnyRole = (roles: string[]) => {
  const userRole = useUserRole();
  return userRole ? roles.includes(userRole) : false;
};

/**
 * Custom hook to check if the current user has admin privileges
 * @returns boolean indicating if user is admin
 */
export const useIsAdmin = () => {
  return useHasRole("admin");
};

/**
 * Custom hook to check if the current user has manager privileges
 * @returns boolean indicating if user is manager
 */
export const useIsManager = () => {
  return useHasRole("manager");
};

/**
 * Custom hook to check if the current user has chef privileges
 * @returns boolean indicating if user is chef
 */
export const useIsChef = () => {
  return useHasRole("chef");
};

/**
 * Custom hook to check if the current user has cashier privileges
 * @returns boolean indicating if user is cashier
 */
export const useIsCashier = () => {
  return useHasRole("cashier");
};
