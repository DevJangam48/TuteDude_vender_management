import React, { useState, useEffect, useContext } from "react";
import apiClient from "../../api/axios";
import { CartContext } from "../../context/CartContext";

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem(product, quantity);
      // Optional: Add a visual confirmation, like changing button text
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
      <div>
        <h4 className="font-bold text-lg text-gray-800">{product.name}</h4>
        <p className="text-sm text-gray-500">
          Market Price:{" "}
          <span className="line-through">
            ₹{product.marketPrice}/{product.unit}
          </span>
        </p>
        <p className="text-lg font-semibold text-green-600">
          Group Price: ₹{product.groupPrice}/{product.unit}
        </p>
      </div>
      <div className="flex items-center space-x-3 mt-4 sm:mt-0">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          className="w-20 text-center border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black"
        />
        <span className="font-medium text-gray-700">{product.unit}</span>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products/getProducts");
        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center p-10">Loading products...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Today's Available Produce
      </h3>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
