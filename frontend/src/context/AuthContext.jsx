import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

// Create the context
export const AuthContext = createContext(null);

// Create and EXPORT the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (token) {
        try {
          const response = await apiClient.get("/auth/me");
          setUser(response.data.data);
        } catch (error) {
          console.error("Session expired or token invalid", error);
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };
    checkLoggedInUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(data);
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vendor/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const signup = async (userData) => {
    try {
      // The userData object will contain name, email, password, etc.
      const response = await apiClient.post("/auth/register", userData);
      const { token, data } = response.data;

      // After successful registration, automatically log the user in
      localStorage.setItem("token", token);
      setToken(token);
      setUser(data);

      // Redirect to the appropriate dashboard
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vendor/dashboard");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // Re-throw the error so the form component can catch it and display a message
      throw error;
    }
  };

  const value = { user, token, loading, login, logout, signup };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
