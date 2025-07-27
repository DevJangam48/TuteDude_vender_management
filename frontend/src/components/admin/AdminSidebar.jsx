import React from "react";
import { useAuth } from "../../hooks/useAuth";

// Example icons - in a real app, you'd use an icon library like Lucide or Heroicons
const AggregationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);
const ProductIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
const VendorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.126-1.283.356-1.857m0 0a3.002 3.002 0 013.39-2.142 3.002 3.002 0 013.39 2.142M12 15.5a3 3 0 01-3-3V7a3 3 0 016 0v5.5a3 3 0 01-3 3z"
    />
  </svg>
);

const AdminSidebar = ({ activeView, setActiveView }) => {
  const { logout } = useAuth();

  const navItems = [
    { id: "aggregation", label: "Aggregation", icon: <AggregationIcon /> },
    { id: "products", label: "Products", icon: <ProductIcon /> },
    { id: "vendors", label: "Vendors", icon: <VendorIcon /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white/70 backdrop-blur-lg shadow-xl border-r border-slate-200 flex flex-col sticky top-0">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-100">
        <span className="w-9 h-9 bg-gradient-to-tr from-green-500 to-green-300 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* ... */}
          </svg>
        </span>
        <h2 className="text-xl font-black text-gray-800 tracking-tight">
          Admin Panel
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center px-4 py-2 rounded-lg text-left font-semibold text-base transition 
              ${
                activeView === item.id
                  ? "bg-gradient-to-r from-green-500 to-teal-400 text-white shadow"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }
              focus:outline-none focus:ring-2 focus:ring-green-300`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-2 rounded-lg font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <svg
            className="h-5 w-5 mr-3 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* ... */}
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
