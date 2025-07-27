import React, { useState, useEffect } from "react";
import apiClient from "../../api/axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get("/orders/myorders");
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Order History</h3>
      <div className="space-y-3">
        {loading ? (
          <p>Loading history...</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  Order #{order._id.substring(18)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-gray-800">
                  ₹{order.totalAmount.toFixed(2)}
                </p>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">You have no past orders.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
