// src/components/UserRoleDisplay.tsx
import {
  useUserRole,
  useIsAdmin,
  useIsManager,
  useIsChef,
  useIsCashier,
} from "@/hooks/useUserRole";
import {
  AdminOnly,
  ManagerOnly,
  ChefOnly,
  CashierOnly,
} from "@/components/RoleGuard";

export const UserRoleDisplay = () => {
  const userRole = useUserRole();
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();
  const isChef = useIsChef();
  const isCashier = useIsCashier();

  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Role-Based Access Demo</h3>

      {/* Current Role Info */}
      <div className="mb-4">
        <p>
          <strong>Current Role:</strong> {userRole}
        </p>
        <p>
          <strong>Is Admin:</strong> {isAdmin ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Manager:</strong> {isManager ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Chef:</strong> {isChef ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Cashier:</strong> {isCashier ? "Yes" : "No"}
        </p>
      </div>

      {/* Role-based content using hooks */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Content based on hooks:</h4>
        {isAdmin && (
          <div className="p-2 bg-red-100 text-red-800 rounded">
            🔒 Admin-only content (using useIsAdmin hook)
          </div>
        )}

        {isManager && (
          <div className="p-2 bg-blue-100 text-blue-800 rounded">
            👔 Manager-only content (using useIsManager hook)
          </div>
        )}

        {isChef && (
          <div className="p-2 bg-orange-100 text-orange-800 rounded">
            👨‍🍳 Chef-only content (using useIsChef hook)
          </div>
        )}

        {isCashier && (
          <div className="p-2 bg-green-100 text-green-800 rounded">
            💰 Cashier-only content (using useIsCashier hook)
          </div>
        )}
      </div>

      {/* Role-based content using RoleGuard components */}
      <div>
        <h4 className="font-medium mb-2">
          Content based on RoleGuard components:
        </h4>

        <AdminOnly
          fallback={
            <div className="p-2 bg-gray-100 text-gray-600 rounded">
              ❌ Admin access required
            </div>
          }
        >
          <div className="p-2 bg-red-100 text-red-800 rounded">
            🔒 Admin panel (using AdminOnly component)
          </div>
        </AdminOnly>

        <ManagerOnly
          fallback={
            <div className="p-2 bg-gray-100 text-gray-600 rounded">
              ❌ Manager access required
            </div>
          }
        >
          <div className="p-2 bg-blue-100 text-blue-800 rounded">
            👔 Manager tools (using ManagerOnly component)
          </div>
        </ManagerOnly>

        <ChefOnly
          fallback={
            <div className="p-2 bg-gray-100 text-gray-600 rounded">
              ❌ Chef access required
            </div>
          }
        >
          <div className="p-2 bg-orange-100 text-orange-800 rounded">
            👨‍🍳 Kitchen orders (using ChefOnly component)
          </div>
        </ChefOnly>

        <CashierOnly
          fallback={
            <div className="p-2 bg-gray-100 text-gray-600 rounded">
              ❌ Cashier access required
            </div>
          }
        >
          <div className="p-2 bg-green-100 text-green-800 rounded">
            💰 Cash register (using CashierOnly component)
          </div>
        </CashierOnly>
      </div>
    </div>
  );
};
