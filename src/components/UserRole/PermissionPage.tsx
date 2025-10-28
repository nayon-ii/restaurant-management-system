// PERMISSION PAGE - src/Pages/Dashboard/UserRole/PermissionPage.tsx
// ============================================
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { mockUserRoles, mockPermissions } from "@/data/mockUserRoles";
import type { UserRole, Permission } from "@/types/userRole";

export default function PermissionPage() {
  const navigate = useNavigate();
  const { roleId } = useParams<{ roleId: string }>();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const foundRole = mockUserRoles.find((r) => r.id === roleId);

      if (foundRole) {
        setRole(foundRole);
        setPermissions(
          foundRole.permissions.length > 0
            ? foundRole.permissions
            : mockPermissions
        );
      } else {
        toast.error("Role not found");
        navigate("/dashboard/user-roles");
      }

      setIsLoading(false);
    };

    fetchRole();
  }, [roleId, navigate]);

  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((permission) => {
      if (!groups[permission.category]) {
        groups[permission.category] = [];
      }
      groups[permission.category].push(permission);
    });
    return groups;
  }, [permissions]);

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === permissionId ? { ...p, isEnabled: !p.isEnabled } : p
      )
    );
  };

  const handleCategoryToggle = (category: string, isEnabled: boolean) => {
    setPermissions((prev) =>
      prev.map((p) => (p.category === category ? { ...p, isEnabled } : p))
    );
  };

  const isCategoryEnabled = (category: string) => {
    const categoryPerms = groupedPermissions[category];
    return categoryPerms?.some((p) => p.isEnabled) || false;
  };

  const handleSave = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Permissions updated successfully!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!role) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/user-roles")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Permission</h1>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4 font-semibold">Role</th>
                  <th className="text-left p-4 font-semibold">Permission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 align-top">
                    <span className="font-medium text-foreground">
                      {role.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-6">
                      {Object.entries(groupedPermissions).map(
                        ([category, perms]) => (
                          <div key={category} className="space-y-3">
                            <h3 className="text-primary font-semibold text-sm">
                              {category}
                            </h3>
                            <div className="space-y-2">
                              {perms.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id={permission.id}
                                    checked={permission.isEnabled}
                                    onCheckedChange={() =>
                                      handlePermissionToggle(permission.id)
                                    }
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                  />
                                  <label
                                    htmlFor={permission.id}
                                    className="text-sm text-foreground cursor-pointer"
                                  >
                                    {permission.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-border">
            <Button
              onClick={handleSave}
              className="w-full md:w-auto px-8 h-12 rounded-xl bg-primary hover:bg-primary/80"
            >
              Save Permissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
