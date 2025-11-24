import { useState, useEffect } from "react";
import { Trash2, User } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { adminUserService } from "../services/adminService";

interface AdminUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  created_at?: string;
  role_id?: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminUserService.getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      await adminUserService.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user");
    }
  };

  const handleRoleChange = async (id: string | undefined, newRole: number) => {
    if (!id) return;

    try {
      await adminUserService.updateUser(id, { role_id: newRole });
      await fetchUsers();
    } catch (err) {
      console.error("Failed to update user role:", err);
      setError("Failed to update user role");
    }
  };

  const adminCount = users.filter((u) => u.role_id === 1).length;
  const activeCount = users.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-medium mb-2">Active Users</p>
            <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-medium mb-2">Admin Users</p>
            <p className="text-3xl font-bold text-gray-900">{adminCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">Loading users...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Phone</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Join Date</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-red-600" />
                        </div>
                        <span className="text-gray-900 font-semibold">{user.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">{user.phone || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID") : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role_id || 2}
                        onChange={(e) => handleRoleChange(user.id, parseInt(e.target.value))}
                        className={`px-3 py-1 rounded-full text-sm font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer ${
                          user.role_id === 1
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <option value={2}>User</option>
                        <option value={1}>Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
