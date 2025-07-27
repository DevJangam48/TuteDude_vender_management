import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../api/axios";

const VendorDetailsModal = ({ zone, product, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (zone && product) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get(
            `/admin/aggregation/details?zone=${zone}&productId=${product.productId}`
          );
          setDetails(response.data.data);
        } catch (error) {
          setDetails(null);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [zone, product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px] flex items-center justify-center p-3"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="bg-white/95 rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 text-gray-400 bg-transparent hover:text-green-600 p-2 rounded-full transition-colors focus:ring-2 focus:ring-green-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="py-4 px-6 border-b flex flex-col gap-1 bg-gradient-to-l from-white to-green-50">
              <h3 className="text-lg font-bold text-slate-800">
                Vendor Details for{" "}
                <span className="text-green-700">
                  {details?.productName || product.name}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">Zone: {zone}</p>
            </div>
            <div className="p-5 overflow-y-auto">
              {loading ? (
                <div className="py-12 text-center">Loading details...</div>
              ) : details && details.vendors.length > 0 ? (
                <table className="min-w-full text-slate-800">
                  <thead>
                    <tr className="bg-green-50/80">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-700 uppercase">
                        Vendor
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-700 uppercase">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-700 uppercase">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.vendors.map((item, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-white even:bg-green-50/50 hover:bg-green-100/70 transition"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-bold text-slate-900">
                            {item.vendor.name}
                          </span>
                          <div className="text-xs text-slate-500">
                            {item.vendor.address.street}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-800">
                          {item.vendor.phone}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-semibold text-green-700">
                          {item.quantity} {product.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-10 px-2 text-slate-400 text-center">
                  No vendor details found.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default VendorDetailsModal;
