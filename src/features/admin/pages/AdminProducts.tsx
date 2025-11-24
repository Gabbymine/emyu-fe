import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { adminProductService } from "../services/adminService";

interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: string;
  is_customizable?: boolean;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  category_id: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminProductService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      (p.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.description?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError("Please fill in required fields");
      return;
    }

    try {
      await adminProductService.createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        is_customizable: false,
      });

      setFormData({ name: "", description: "", price: "", category_id: "" });
      setShowAddForm(false);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create product");
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure you want to delete this product?")) return;

    try {
      await adminProductService.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-md"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h3>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                />
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                >
                  <option value="">Select Category</option>
                  <option value="1">Jersey</option>
                  <option value="2">Shorts</option>
                  <option value="3">Jacket</option>
                  <option value="4">Accessories</option>
                </select>
              </div>
              <textarea
                placeholder="Product Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">Loading products...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Product Name</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Customizable</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900 font-semibold">{product.name || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600 truncate">{product.description || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      Rp{(product.price || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          product.is_customizable
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.is_customizable ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600">
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
