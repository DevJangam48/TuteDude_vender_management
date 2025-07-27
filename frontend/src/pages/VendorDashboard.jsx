import React from "react";
import Navbar from "../components/layout/Navbar";
import ProductList from "../components/vendor/ProductList";
import Cart from "../components/vendor/Cart";
import OrderHistory from "../components/vendor/OrderHistory";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100" w-screen>
      <Navbar />
      <main className="w-screen mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Product Listing */}
          <div className="lg:col-span-2">
            <ProductList />
          </div>

          {/* Right Column: Cart and Order History */}
          <div className="space-y-8">
            <Cart />
            <OrderHistory />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
