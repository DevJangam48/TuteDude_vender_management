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
  exit: { opacity: 0, y: 60, scale: 0.95, transition: { duration: 0.25 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, switchToSignup } = useUI();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      closeLoginModal();
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 bg-gradient-to-br from-green-100/30 via-white/30 to-blue-100/30 
          backdrop-blur-[6px] flex items-center justify-center p-3"
        onClick={closeLoginModal}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-sm md:max-w-md bg-white/80 border border-white/60 shadow-2xl
           rounded-3xl p-8 md:p-10 space-y-7 relative backdrop-blur-xl 
           flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated Icon/Header */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ scale: 0.94, rotate: -4 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 190, damping: 11 }}
              className="bg-gradient-to-br from-green-400 via-teal-400 to-blue-300 shadow-lg rounded-full p-3"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm5 8a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-2xl font-bold text-black-850 tracking-tight text-black"
            >
              Welcome Back
            </motion.h2>
          </div>

          {/* Form */}
          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
              <input
                id="email-modal"
                type="email"
                autoFocus
                required
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-none bg-white/80 focus:ring-4 focus:ring-green-300
                  focus:outline-none text-base shadow transition-all placeholder:text-gray-700 text-black"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password-modal"
                type="password"
                required
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-none bg-white/80 focus:ring-4 focus:ring-green-300
                  focus:outline-none text-base shadow transition-all placeholder:text-gray-700 text-black"
                placeholder="Password"
              />
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
              className="mt-1 w-full py-3 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-400
                text-white text-lg shadow-xl font-bold hover:from-green-600 hover:via-emerald-600 hover:to-blue-500
                hover:scale-[1.03] transition-all duration-200
                disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* Switch to signup */}
          <div className="text-center text-gray-700 text-base">
            Don&apos;t have an account?{" "}
            <button
              onClick={switchToSignup}
              className="font-semibold text-green-600 underline underline-offset-2 hover:text-emerald-700 transition bg-transparent"
            >
              Sign Up
            </button>
          </div>
          {/* Close */}
          <button
            aria-label="Close"
            onClick={closeLoginModal} // or closeSignupModal
            className="absolute top-3 right-3 text-gray-400 hover:text-green-500 p-2 rounded-full
    bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
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
    </AnimatePresence>
  );
};
export default LoginModal;
