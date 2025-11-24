import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useToastContext } from "@/context/useToast";
import { LogOut, Edit2, MapPin, Plus, Trash2, Loader, Mail, Phone as PhoneIcon } from "lucide-react";
import { shippingAddressService } from "../services/shippingAddressService";
import type { ShippingAddress } from "../services/shippingAddressService";
import Navbar from "@/layout/Navbar";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { showToast } = useToastContext();
  
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    province: "",
    postal_code: "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shippingAddressService.getUserAddresses();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load addresses:", err);
      setError("Gagal memuat alamat");
      showToast("Gagal memuat alamat", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (!formData.address || !formData.city || !formData.province || !formData.postal_code || !formData.phone) {
      showToast("Mohon lengkapi semua field", "error");
      return;
    }

    setSubmitting(true);
    try {
      if (editingAddress) {
        // Update existing address
        await shippingAddressService.updateAddress(editingAddress.id, {
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postal_code,
          phone: formData.phone,
        });
        showToast("Alamat berhasil diperbarui", "success");
      } else {
        // Create new address
        await shippingAddressService.createAddress({
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postal_code,
          phone: formData.phone,
        });
        showToast("Alamat berhasil ditambahkan", "success");
      }
      
      setFormData({
        address: "",
        city: "",
        province: "",
        postal_code: "",
        phone: user?.phone || "",
      });
      setEditingAddress(null);
      setShowAddressForm(false);
      await loadAddresses();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Gagal menyimpan alamat";
      showToast(errorMsg, "error");
      console.error("Failed to save address:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) return;

    setSubmitting(true);
    try {
      await shippingAddressService.deleteAddress(id);
      showToast("Alamat berhasil dihapus", "success");
      await loadAddresses();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Gagal menghapus alamat";
      showToast(errorMsg, "error");
      console.error("Failed to delete address:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (address: ShippingAddress) => {
    setEditingAddress(address);
    setFormData({
      address: address.address,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
      phone: address.phone,
    });
    setShowAddressForm(true);
  };

  const handleCancel = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setFormData({
      address: "",
      city: "",
      province: "",
      postal_code: "",
      phone: user?.phone || "",
    });
  };

  const handleLogout = () => {
    logout();
    showToast("Logout berhasil", "success");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-red-600">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-black mb-3 text-gray-900">Profil Saya</h1>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-red-600">{user?.name}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <PhoneIcon size={16} />
                    <span>{user?.phone}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition duration-300 font-semibold shadow-md hover:shadow-lg"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-600">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MapPin size={28} className="text-red-600" />
              </div>
              Alamat Pengiriman
            </h2>
            <button
              onClick={() => {
                setEditingAddress(null);
                setFormData({
                  address: "",
                  city: "",
                  province: "",
                  postal_code: "",
                  phone: user?.phone || "",
                });
                setShowAddressForm(!showAddressForm);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              disabled={submitting}
            >
              <Plus size={20} />
              Tambah Alamat
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-4 mb-6 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Add/Edit Form */}
          {showAddressForm && (
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-8 mb-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                {editingAddress ? "Edit Alamat" : "Alamat Baru"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Jalan dan No. Rumah"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-red-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Kota"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="px-4 py-3 bg-white border-2 border-red-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
                  />
                  <input
                    type="text"
                    placeholder="Provinsi"
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    className="px-4 py-3 bg-white border-2 border-red-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Kode Pos"
                    value={formData.postal_code}
                    onChange={(e) =>
                      setFormData({ ...formData, postal_code: e.target.value })
                    }
                    className="px-4 py-3 bg-white border-2 border-red-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
                  />
                  <input
                    type="tel"
                    placeholder="Nomor Telepon"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="px-4 py-3 bg-white border-2 border-red-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAddAddress}
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300 font-semibold disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  {submitting && <Loader size={18} className="animate-spin" />}
                  {editingAddress ? "Simpan Perubahan" : "Tambah Alamat"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={submitting}
                  className="flex-1 px-4 py-3 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg transition duration-300 font-semibold disabled:opacity-50"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <Loader className="animate-spin text-red-600 mx-auto mb-3" size={32} />
                  <p className="text-gray-600 font-medium">Memuat alamat...</p>
                </div>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="text-gray-300 mx-auto mb-3" size={48} />
                <p className="text-gray-600 text-lg">
                  Belum ada alamat. Tambahkan alamat pengiriman Anda.
                </p>
              </div>
            ) : (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-6 rounded-xl border-2 border-red-100 bg-gradient-to-br from-white to-red-50 hover:border-red-600 hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-gray-900 mb-2">{address.address}</p>
                      <div className="space-y-1 text-gray-600">
                        <p className="text-sm">
                          <span className="font-semibold">Kota:</span> {address.city}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Provinsi:</span> {address.province}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Kode Pos:</span> {address.postal_code}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Telepon:</span> {address.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(address)}
                        disabled={submitting}
                        className="p-2 hover:bg-red-100 rounded-lg transition duration-300 text-red-600 hover:text-red-700 disabled:opacity-50"
                        title="Edit"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        disabled={submitting}
                        className="p-2 hover:bg-red-100 rounded-lg transition duration-300 text-red-600 hover:text-red-700 disabled:opacity-50"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
