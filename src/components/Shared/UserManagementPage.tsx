// src/pages/UserManagementPage.tsx
import { useState, useMemo, useEffect } from "react";
import { Eye, Search, SlidersHorizontal, Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import EditUserModal from "@/components/Modals/EditUserModal";
import ViewUserModal from "@/components/Modals/ViewUserModal";
import AddUserModal from "@/components/Modals/AddUserModal";
import DeactivateModal from "@/components/Modals/DeactivateModal";
import { TableSkeleton } from "../Skeleton/TableSkeleton";
import { toast } from "sonner";
import { RoleGuard } from "../RoleGuard";
import { mockUsersData } from "@/data/mockUsersData";
import type { User } from "@/types/user";

const roles = ["All", "Chef", "Cashier", "Waiter", "Cleaner"];

interface UserManagementPageProps {
  title?: string;
}

// Main Component
export default function UserManagementPage({
  title = "Staff",
}: UserManagementPageProps) {
  const [users, setUsers] = useState<User[]>(mockUsersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "deactivated">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);

  const itemsPerPage = 15;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const matchesSearch =
        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.gmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      // Tab logic: "all" shows everyone, "active" shows only active, "deactivated" shows only inactive
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && user.isActive) ||
        (activeTab === "deactivated" && !user.isActive);

      return matchesSearch && matchesRole && matchesTab;
    });
  }, [users, searchQuery, roleFilter, activeTab]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const handleToggleActive = (user: User) => {
    setUserToToggle(user);
    setDeactivateModalOpen(true);
  };

  const confirmToggle = () => {
    if (!userToToggle) return;

    const newStatus = !userToToggle.isActive;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userToToggle.id ? { ...u, isActive: newStatus } : u
      )
    );

    if (newStatus) {
      toast.success("User activated successfully", {
        description: `${userToToggle.name} has been activated`,
      });
    } else {
      toast.warning("User deactivated", {
        description: `${userToToggle.name} has been deactivated`,
      });
    }

    setDeactivateModalOpen(false);
    setUserToToggle(null);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSave = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditModalOpen(false);
    setSelectedUser(null);

    toast.success("User updated successfully", {
      description: `${updatedUser.name}'s information has been updated`,
    });
  };

  const handleAdd = (newUser: User) => {
    const newId = (
      Math.max(...users.map((u) => parseInt(u.id))) + 1
    ).toString();

    const userToAdd = {
      ...newUser,
      id: newId,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.name}`,
    };

    setUsers((prev) => [...prev, userToAdd]);
    setAddModalOpen(false);

    toast.success("User added successfully", {
      description: `${newUser.name} has been added to the system`,
    });
  };

  const handleCloseView = () => {
    setViewModalOpen(false);
    setSelectedUser(null);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          variant={currentPage === i ? "default" : "outline"}
          className="w-10 h-10 p-0 rounded-sm shadow-xl"
        >
          {i}
        </Button>
      );
    }
    if (totalPages > 5) {
      pages.push(
        <span key="ellipsis" className="px-2">
          ...
        </span>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-background p-3 md:p-8">
      {/* User Management Section */}
      <div className="bg-card rounded-2xl shadow-sm pb-3">
        {/* Title and Add Button */}
        <div className="px-5 py-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>

          <RoleGuard allowedRoles={["admin", "manager"]}>
            <Button
              onClick={() => setAddModalOpen(true)}
              className="h-10 md:w-32 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add {title}
            </Button>
          </RoleGuard>
        </div>

        {/* Tabs */}
        <div className="px-5">
          <div className="flex gap-2 bg-card shadow-md rounded-2xl p-1">
            <button
              onClick={() => {
                setActiveTab("all");
                setCurrentPage(1);
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-primary text-white"
                  : "bg-card text-foreground hover:bg-primary/30"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => {
                setActiveTab("active");
                setCurrentPage(1);
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === "active"
                  ? "bg-primary text-white"
                  : "bg-card text-foreground hover:bg-primary/30"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setActiveTab("deactivated");
                setCurrentPage(1);
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === "deactivated"
                  ? "bg-primary text-white"
                  : "bg-card text-foreground hover:bg-primary/30"
              }`}
            >
              Deactivated
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-5 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search User"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{roleFilter}</span>
            </button>
            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setRoleFilter(role);
                      setShowRoleDropdown(false);
                      setCurrentPage(1);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin mx-auto md:mx-5 border rounded-md">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-4 text-center font-semibold">User ID</th>
                <th className="p-4 text-center font-semibold">Name</th>
                <th className="p-4 text-center font-semibold">Number</th>
                <th className="p-4 text-center font-semibold">Gmail</th>
                <th className="p-4 text-center font-semibold">Role</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton />
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user: User, index: number) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-2 text-center text-gray-900">{user.id}</td>
                    <td className="p-2 text-center text-gray-900">
                      {user.name}
                    </td>
                    <td className="p-2 text-center text-gray-900">
                      {user.number}
                    </td>
                    <td className="p-2 text-center text-gray-900">
                      {user.gmail}
                    </td>
                    <td className="p-2 text-center text-gray-900">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "Manager"
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "Chef"
                            ? "bg-green-100 text-green-800"
                            : user.role === "Waiter"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(user)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <SquarePen className="w-4 h-4 text-gray-700" />
                        </button>
                        <Toggle
                          checked={user.isActive}
                          onChange={() => handleToggleActive(user)}
                          className="data-[state=on]:bg-green-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && paginatedUsers.length > 0 && (
        <div className="p-6 flex items-center justify-between ">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-md bg-card shadow-[0px_8px_32px_0px_#00000026]"
          >
            ← Previous
          </Button>
          <div className="flex items-center gap-2">{renderPageNumbers()}</div>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded-md bg-card shadow-[0px_8px_32px_0px_#00000026]"
          >
            Next →
          </Button>
        </div>
      )}

      <AddUserModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
      />

      {selectedUser && (
        <EditUserModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}

      {selectedUser && (
        <ViewUserModal
          isOpen={viewModalOpen}
          onClose={handleCloseView}
          user={selectedUser}
        />
      )}

      {/* Reusable Deactivate Modal */}
      <DeactivateModal
        isOpen={deactivateModalOpen}
        onClose={() => {
          setDeactivateModalOpen(false);
          setUserToToggle(null);
        }}
        onConfirm={confirmToggle}
        title={
          userToToggle?.isActive
            ? `Are you sure you want to deactivate ${userToToggle.name}?`
            : `Are you sure you want to activate ${userToToggle?.name}?`
        }
        buttonText={userToToggle?.isActive ? `Deactivate` : `Activate`}
      />
    </div>
  );
}
