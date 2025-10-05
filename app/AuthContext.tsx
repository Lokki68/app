"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthState = {
  loading: boolean;
  isConnected: boolean;
  userId: string | null;
};

export type AuthContextType = {
  isAuthenticated: AuthState;
  setIsAuthenticated: Dispatch<SetStateAction<AuthState>>;
};

type InitialAuth = {
  success: boolean;
  userId: string | null;
};

type AuthProviderProps = {
  children: ReactNode;
  initialAuth: InitialAuth;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialAuth }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<AuthState>({
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
