import type { ReactNode } from "react";
import { useHasRole, useHasAnyRole } from "@/hooks/useUserRole";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  allowedRole?: string;
  fallback?: ReactNode;
  requireAll?: boolean;
  canTrigger?: string[]; // Roles that can interact with the element
}

/**
 * Component that conditionally renders children based on user role
 * @param children - Content to render if role check passes
 * @param allowedRoles - Array of roles that can access this content
 * @param allowedRole - Single role that can access this content
 * @param fallback - Content to render if role check fails
 * @param requireAll - If true, user must have ALL roles (for multiple role users)
 * @param canTrigger - Array of roles that can interact/trigger the element (others can see but not interact)
 */
export const RoleGuard = ({
  children,
  allowedRoles,
  allowedRole,
  fallback = null,
  requireAll = false,
  canTrigger,
}: RoleGuardProps) => {
  const hasRole = useHasRole(allowedRole || "");
  const hasAnyRole = useHasAnyRole(allowedRoles || []);
  const canTriggerRole = useHasAnyRole(canTrigger || []);

  // If no role restrictions, show content
  if (!allowedRoles && !allowedRole) {
    // If canTrigger is specified, check if user can interact
    if (canTrigger) {
      if (!canTriggerRole) {
        // Hide icon if exists
        return (
          <div className="pointer-events-none opacity-50 [&_*[data-icon]]:hidden">
            {children}
          </div>
        );
      }
    }
    return <>{children}</>;
  }

  // Check single role
  if (allowedRole) {
    if (!hasRole) {
      return <>{fallback}</>;
    }

    // User has access, now check if they can trigger
    if (canTrigger && !canTriggerRole) {
      return (
        <div className="pointer-events-none [&_*[data-icon]]:hidden">
          {children}
        </div>
      );
    }

    return <>{children}</>;
  }

  // Check multiple roles
  if (allowedRoles) {
    let hasRequiredRole = false;

    if (requireAll) {
      // User must have ALL roles (for future multi-role support)
      const hasAllRoles = false; // Simplified for now
      hasRequiredRole = hasAllRoles;
    } else {
      // User needs ANY of the roles
      hasRequiredRole = hasAnyRole;
    }

    if (!hasRequiredRole) {
      return <>{fallback}</>;
    }

    // User has access, now check if they can trigger
    if (canTrigger && !canTriggerRole) {
      return (
        <div className="pointer-events-none [&_*[data-icon]]:hidden">
          {children}
        </div>
      );
    }

    return <>{children}</>;
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
