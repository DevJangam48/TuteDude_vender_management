import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../../api/axios";
import ProductModal from "./ProductModal";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/products/getAllProductsAdmin");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSuccess = () => {
    fetchProducts(); // Re-fetch products after a successful add/edit
  };

  if (loading)
    return <div className="p-8 text-center">Loading products...</div>;

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg w-screen">
        {/* UPDATED: Title formatting */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add New Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* UPDATED: Alignment and padding */}
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Price
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Price
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  {/* UPDATED: Increased vertical padding for more space */}
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    ₹{product.groupPrice} / {product.unit}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    ₹{product.marketPrice} / {product.unit}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-center">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default ProductManagement;
