import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../api/axios";

const ProductModal = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    marketPrice: "",
    groupPrice: "",
    unit: "kg",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!product;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: product.name,
        description: product.description,
        marketPrice: product.marketPrice,
        groupPrice: product.groupPrice,
        unit: product.unit,
        isActive: product.isActive,
      });
    }
  }, [product, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isEditing) {
        await apiClient.put(`/products/${product._id}`, formData);
      } else {
        await apiClient.post("/products/createProduct", formData);
      }
      onSuccess(); // Refresh the product list
      onClose(); // Close the modal
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 custom-blur-bg flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-gray-50 rounded-lg shadow-xl w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-black">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="input-style text-black"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="input-style text-black"
                rows="3"
              ></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="marketPrice"
                  type="number"
                  value={formData.marketPrice}
                  onChange={handleChange}
                  placeholder="Market Price"
                  className="input-style text-black"
                  required
                />
                <input
                  name="groupPrice"
                  type="number"
                  value={formData.groupPrice}
                  onChange={handleChange}
                  placeholder="Group Price"
                  className="input-style text-black"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="Unit (e.g., kg)"
                  className="input-style text-black"
                  required
                />
                <div className="flex items-center justify-center bg-gray-50 rounded-md border">
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700 mr-3"
                  >
                    Active:
                  </label>
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 "
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="p-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
