import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

interface Settings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  taxRate: number;
  shippingFee: number;
  maintenanceMode: boolean;
  allowNewRegistration: boolean;
}

const defaultSettings: Settings = {
  storeName: "Redsphere",
  storeEmail: "admin@redsphere.com",
  storePhone: "+62812345678",
  storeAddress: "Jl. Red Street No.1, Manchester, UK",
  taxRate: 10,
  shippingFee: 50000,
  maintenanceMode: false,
  allowNewRegistration: true,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof Settings, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // TODO: Send to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage store configuration and settings</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-100 border-l-4 border-green-600 rounded-lg p-4 flex items-center gap-3 text-green-700">
            <AlertCircle size={20} />
            <span className="font-semibold">Settings saved successfully!</span>
          </div>
        )}

        {/* Store Information */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => handleChange("storeEmail", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.storePhone}
                  onChange={(e) => handleChange("storePhone", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Address</label>
              <textarea
                value={settings.storeAddress}
                onChange={(e) => handleChange("storeAddress", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
        </div>

        {/* Financial Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Settings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleChange("taxRate", parseFloat(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Shipping Fee (Rp)</label>
              <input
                type="number"
                value={settings.shippingFee}
                onChange={(e) => handleChange("shippingFee", parseFloat(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Maintenance Mode</p>
                <p className="text-sm text-gray-600">Disable the store for maintenance</p>
              </div>
              <button
                onClick={() => handleChange("maintenanceMode", !settings.maintenanceMode)}
                className={`relative w-14 h-8 rounded-full transition ${
                  settings.maintenanceMode ? "bg-red-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    settings.maintenanceMode ? "translate-x-7" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Allow New Registration</p>
                <p className="text-sm text-gray-600">Allow new users to create accounts</p>
              </div>
              <button
                onClick={() => handleChange("allowNewRegistration", !settings.allowNewRegistration)}
                className={`relative w-14 h-8 rounded-full transition ${
                  settings.allowNewRegistration ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    settings.allowNewRegistration ? "translate-x-7" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-md"
          >
            <Save size={20} />
            Save Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
