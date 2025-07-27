import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // This import is critical
import { useAuth } from "./hooks/useAuth";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";

import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashBoard";
import LandingPage from "./pages/LandingPage";
import LoginModal from "./pages/LoginModal";
import SignupModal from "./pages/SignupModal"; // Make sure this exists
import { useUI } from "./context/UIContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/vendor/dashboard"}
        replace
      />
    );
  }
  return children;
};

const AppContent = () => {
  const { isLoginModalOpen, isSignupModalOpen } = useUI();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isLoginModalOpen && <LoginModal />}
      {isSignupModalOpen && <SignupModal />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
