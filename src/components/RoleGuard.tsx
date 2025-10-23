// src/components/RoleGuard.tsx
import type { ReactNode } from "react";
import { useHasRole, useHasAnyRole } from "@/hooks/useUserRole";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  allowedRole?: string;
  fallback?: ReactNode;
  requireAll?: boolean;
}

/**
 * Component that conditionally renders children based on user role
 * @param children - Content to render if role check passes
 * @param allowedRoles - Array of roles that can access this content
 * @param allowedRole - Single role that can access this content
 * @param fallback - Content to render if role check fails
 * @param requireAll - If true, user must have ALL roles (for multiple role users)
 */
export const RoleGuard = ({
  children,
  allowedRoles,
  allowedRole,
  fallback = null,
  requireAll = false,
}: RoleGuardProps) => {
  const hasRole = useHasRole(allowedRole || "");
  const hasAnyRole = useHasAnyRole(allowedRoles || []);

  // If no role restrictions, show content
  if (!allowedRoles && !allowedRole) {
    return <>{children}</>;
  }

  // Check single role
  if (allowedRole) {
    return hasRole ? <>{children}</> : <>{fallback}</>;
  }

  // Check multiple roles
  if (allowedRoles) {
    if (requireAll) {
      // User must have ALL roles (for future multi-role support)
      // Note: This is a simplified implementation. For complex multi-role logic,
      // you might want to pass the roles to check as props to avoid hook rules
      const hasAllRoles = false; // Simplified for now
      return hasAllRoles ? <>{children}</> : <>{fallback}</>;
    } else {
      // User needs ANY of the roles
      return hasAnyRole ? <>{children}</> : <>{fallback}</>;
    }
  }

  return <>{fallback}</>;
};

// Convenience components for common role checks
export const AdminOnly = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => (
  <RoleGuard allowedRole="admin" fallback={fallback}>
    {children}
  </RoleGuard>
);

export const ManagerOnly = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => (
  <RoleGuard allowedRole="manager" fallback={fallback}>
    {children}
  </RoleGuard>
);

export const ChefOnly = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => (
  <RoleGuard allowedRole="chef" fallback={fallback}>
    {children}
  </RoleGuard>
);

export const CashierOnly = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => (
  <RoleGuard allowedRole="cashier" fallback={fallback}>
    {children}
  </RoleGuard>
);

export const StaffOnly = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => (
  <RoleGuard allowedRoles={["manager", "chef", "cashier"]} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const AdminOrManager = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => (
  <RoleGuard allowedRoles={["admin", "manager"]} fallback={fallback}>
    {children}
  </RoleGuard>
);
