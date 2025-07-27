import React, { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import VendorDetailsModal from "./VendorDetailsModal";

const AggregationView = () => {
  const [zoneData, setZoneData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    const fetchAggregationData = async () => {
      try {
        const response = await apiClient.get("/admin/aggregation");
        setZoneData(response.data.data);
      } catch (err) {
        setError("Failed to fetch aggregation data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAggregationData();
  }, []);

  const handleProductClick = (zone, product) => {
    setSelectedZone(zone);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedZone(null);
  };

  if (loading)
    return (
      <div className="p-12 flex justify-center text-gray-500 animate-pulse">
        Loading daily aggregation...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
    );

  return (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight w-screen">
        Daily Aggregation by Zone
      </h1>
      <div className="space-y-8">
        {zoneData.length > 0 ? (
          zoneData.map((zone) => (
            <div
              key={zone.zone}
              className="bg-white/80 rounded-2xl shadow-xl border border-slate-100 p-6 transition hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-2">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-400" />
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    {zone.zone}
                  </h2>
                </div>
                <p className="text-lg font-bold text-green-700 bg-green-50 px-4 py-1 rounded-full">{`Total Value: ₹${zone.zoneTotalValue.toFixed(
                  2
                )}`}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-2 px-2 text-left text-xs font-extrabold text-green-700 uppercase tracking-wide">
                        Product
                      </th>
                      <th className="py-2 px-2 text-left text-xs font-medium text-green-700 uppercase">
                        Total Qty
                      </th>
                      <th className="py-2 px-2 text-left text-xs font-medium text-green-700 uppercase">
                        Vendors
                      </th>
                      <th className="py-2 px-2 text-left text-xs font-medium text-green-700 uppercase">
                        Price/Unit
                      </th>
                      <th className="py-2 px-2 text-left text-xs font-medium text-green-700 uppercase">
                        Total Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-50 bg-white/90">
                    {zone.products.map((product) => (
                      <tr
                        key={product.productId}
                        onClick={() => handleProductClick(zone.zone, product)}
                        className="hover:bg-green-100/70 cursor-pointer transition"
                      >
                        <td className="py-2 px-2 text-xs font-bold text-slate-900">
                          {product.name}
                        </td>
                        <td className="py-2 px-2 text-xs text-slate-700">
                          {product.totalQuantity} {product.unit}
                        </td>
                        <td className="py-2 px-2 text-xs">
                          {product.vendorCount}
                        </td>
                        <td className="py-2 px-2 text-xs text-green-800">
                          ₹{product.pricePerUnit.toFixed(2)}
                        </td>
                        <td className="py-2 px-2 text-xs font-semibold text-green-700">
                          ₹{product.totalValue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center bg-white/70 rounded-xl shadow-xl p-10 text-gray-400 font-medium">
            No orders have been placed today.
          </div>
        )}
      </div>
      <VendorDetailsModal
        zone={selectedZone}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </>
  );
};
export default AggregationView;
