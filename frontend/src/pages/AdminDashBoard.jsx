import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AggregationView from "../components/admin/AggregationView";
import ProductManagement from "../components/admin/ProductManagement";
import VendorManagement from "../components/admin/VendorManagement";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("aggregation");

  const renderView = () => {
    switch (activeView) {
      case "aggregation":
        return <AggregationView />;
      case "products":
        return <ProductManagement />;
      case "vendors":
        return <VendorManagement />;
      default:
        return <AggregationView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-green-50 to-blue-50 bg-fixed">
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-4 sm:p-8 relative">{renderView()}</main>
    </div>
  );
};
export default AdminDashboard;
