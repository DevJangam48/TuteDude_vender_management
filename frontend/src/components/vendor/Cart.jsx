import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import apiClient from "../../api/axios";

const Cart = () => {
  const { cartItems, totalAmount, clearCart, removeItem } =
    useContext(CartContext);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setMessage("");

    const orderData = {
      deliveryZone: user.address.zone,
      orderItems: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      await apiClient.post("/orders/createOrder", orderData);
      setMessage("Order placed successfully!");
      clearCart();
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      setMessage("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Your Cart</h3>
      {message && (
        <p
          className={`mb-4 text-sm ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-500">
                  {item.quantity} {item.unit} x ₹{item.groupPrice}
                </p>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-4">
                  ₹{(item.quantity * item.groupPrice).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        )}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg text-gray-900">
        <span>Total</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <button
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0 || isSubmitting}
        className="w-full mt-4 bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Cart;
