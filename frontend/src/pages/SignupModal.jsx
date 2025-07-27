import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useUI } from "../context/UIContext";

const modalVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 0.45 },
  },
  exit: { opacity: 0, y: 60, scale: 0.95, transition: { duration: 0.22 } },
};
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const SignupModal = () => {
  const { isSignupModalOpen, closeSignupModal, switchToLogin } = useUI();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "Pune",
    state: "Maharashtra",
    zipCode: "",
    zone: "",
    role: "vendor",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const address = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        zone: formData.zone,
      };
      await signup({ ...formData, address });
      closeSignupModal();
    } catch (err) {
      setError("Signup failed. Please check your details and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isSignupModalOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-gradient-to-br from-green-100/30 via-white/30 to-purple-200/40
            backdrop-blur-[5px] flex items-center justify-center p-2"
          onClick={closeSignupModal}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-lg bg-white/85 border border-white/60 shadow-2xl rounded-3xl px-7 pt-10 pb-8
              space-y-6 relative backdrop-blur-xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo & Headline */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0.92, rotate: 6 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 14 }}
                className="bg-gradient-to-tl from-green-400 via-blue-300 to-purple-300 shadow-lg rounded-full p-3"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.6}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-gray-900 tracking-tight"
              >
                Create Your Account
              </motion.h2>
            </div>
            <form
              className="space-y-4"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <input
                  name="street"
                  placeholder="Street Address"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <input
                  name="zone"
                  placeholder="Delivery Zone (e.g., FC Road)"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <input
                  name="zipCode"
                  placeholder="Zip Code"
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                    focus:outline-none shadow placeholder:text-gray-700 text-base text-black"
                />
                <select
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                  className="rounded-xl px-4 py-3 bg-white/80 focus:ring-4 focus:ring-green-300 
                   focus:outline-none shadow text-base text-gray-700"
                >
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {error && (
                <motion.p
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-sm text-center text-red-600 font-medium"
                >
                  {error}
                </motion.p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-400
                  text-white text-lg shadow-xl font-bold hover:from-green-600 hover:via-emerald-600 hover:to-blue-500
                  hover:scale-[1.03] transition-all duration-200
                  disabled:bg-gray-300 disabled:text-gray-500"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
            {/* Switch to login */}
            <div className="text-center text-base text-gray-700">
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="font-semibold text-green-600 underline underline-offset-2 hover:text-emerald-700 transition"
              >
                Log In
              </button>
            </div>
            {/* Close */}
            <button
              aria-label="Close"
              onClick={closeSignupModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-purple-600 p-2
                rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SignupModal;
