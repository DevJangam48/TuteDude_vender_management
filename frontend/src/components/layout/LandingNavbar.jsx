import React from "react";
import { useUI } from "../../context/UIContext";

const LandingNavbar = () => {
  const { openLoginModal, openSignupModal } = useUI();

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <span className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-green-400 drop-shadow-lg animate-bounce"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="absolute inset-0 animate-ping rounded-full bg-green-200/40" />
            </span>
            <span className="text-3xl font-black text-gray-800 tracking-tight">
              Mandi
              <span className="text-green-600 drop-shadow-md">Pool</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={openLoginModal}
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-2 rounded-full font-bold shadow-xl hover:from-blue-600 hover:to-blue-500 focus:ring-2 focus:ring-blue-400 transition-all transform hover:scale-110"
            >
              Login
            </button>
            <button
              onClick={openSignupModal}
              className="bg-gradient-to-r from-green-500 to-green-400 text-white px-6 py-2 rounded-full font-bold shadow-xl hover:from-green-600 hover:to-green-500 focus:ring-2 focus:ring-green-400 transition-all transform hover:scale-110"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
