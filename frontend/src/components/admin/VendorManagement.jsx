import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../../api/axios";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin/vendors");
      setVendors(response.data.data);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
      setError("Could not load vendor data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  if (loading) return <div className="p-8 text-center">Loading vendors...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-screen">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
        {/* A button to add vendors could go here in the future */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined On
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td className="py-4 px-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vendor.name}
                </td>
                <td className="py-4 px-3 whitespace-nowrap text-sm text-gray-700">
                  <div>{vendor.email}</div>
                  <div>{vendor.phone}</div>
                </td>
                <td className="py-4 px-3 whitespace-nowrap text-sm text-gray-700">
                  <div>
                    {vendor.address.street}, {vendor.address.zone}
                  </div>
                  <div>
                    {vendor.address.city}, {vendor.address.zipCode}
                  </div>
                </td>
                <td className="py-4 px-3 whitespace-nowrap text-sm text-gray-700">
                  {new Date(vendor.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorManagement;
