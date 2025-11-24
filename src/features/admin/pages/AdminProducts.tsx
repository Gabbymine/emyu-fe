import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
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

interface Category {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  category_id: string;
  is_customizable: boolean;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category_id: "",
    is_customizable: false,
  });

  // Fetch products and categories on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories");
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
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
      const productData: {
        name: string;
        description: string;
        price: number;
        category_id?: string;
        is_customizable: boolean;
      } = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        is_customizable: false,
      };

      // Only include category_id if it's not empty
      if (formData.category_id && formData.category_id.trim() !== "") {
        productData.category_id = formData.category_id;
      }

      await adminProductService.createProduct(productData);

      setFormData({ name: "", description: "", price: "", category_id: "", is_customizable: false });
      setShowAddForm(false);
      setError(null);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create product. Please check all fields.");
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      category_id: product.category_id || "",
      is_customizable: product.is_customizable || false,
    });
    setShowEditModal(true);
    setError(null);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.id || !formData.name || !formData.price) {
      setError("Please fill in required fields");
      return;
    }

    try {
      const productData: {
        name: string;
        description: string;
        price: number;
        category_id?: string;
        is_customizable: boolean;
      } = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        is_customizable: formData.is_customizable,
      };

      if (formData.category_id && formData.category_id.trim() !== "") {
        productData.category_id = formData.category_id;
      }

      await adminProductService.updateProduct(editingProduct.id, productData);

      setFormData({ name: "", description: "", price: "", category_id: "", is_customizable: false });
      setShowEditModal(false);
      setEditingProduct(null);
      setError(null);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Failed to update product. Please check all fields.");
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", category_id: "", is_customizable: false });
    setError(null);
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
                  <option value="">Select Category (Optional)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Product Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_customizable"
                  checked={formData.is_customizable}
                  onChange={(e) => setFormData({ ...formData, is_customizable: e.target.checked })}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="is_customizable" className="text-gray-700 font-medium">
                  Is Customizable
                </label>
              </div>
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
            <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-100 border-b-2 border-gray-200 sticky top-0 z-10">
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
                      <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap">{product.name || "N/A"}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{product.description || "N/A"}</td>
                      <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap">
                        Rp{(product.price || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditClick(product)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                          >
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
            </div>
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Edit size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Edit Product</h3>
                    <p className="text-sm text-red-100">Update product information</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-600 rounded-lg">
                    <p className="text-red-600 font-semibold">{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleUpdateProduct} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 transition"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (Rp) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 transition"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 transition"
                      >
                        <option value="">Select Category (Optional)</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Customizable Checkbox */}
                    <div className="flex items-center h-full pt-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.is_customizable}
                          onChange={(e) => setFormData({ ...formData, is_customizable: e.target.checked })}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                        />
                        <span className="text-gray-700 font-semibold">Is Customizable</span>
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 transition resize-none"
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
