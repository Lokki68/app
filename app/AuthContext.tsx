"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children, initialAuth }) {
  const [isAuthenticated, setIsAuthenticated] = useState({
    loading: false,
    isConnected: initialAuth.success,
    userId: initialAuth.userId,
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
