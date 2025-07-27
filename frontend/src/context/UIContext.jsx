import React, { createContext, useState, useContext } from "react";

export const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Add state for signup modal

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true); // Add function for signup modal
  const closeSignupModal = () => setIsSignupModalOpen(false); // Add function for signup modal

  // Helper to switch from login to signup
  const switchToSignup = () => {
    closeLoginModal();
    openSignupModal();
  };

  // Helper to switch from signup to login
  const switchToLogin = () => {
    closeSignupModal();
    openLoginModal();
  };

  const value = {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isSignupModalOpen,
    openSignupModal,
    closeSignupModal,
    switchToSignup,
    switchToLogin,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
};
