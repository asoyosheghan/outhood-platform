import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/types";
import { api } from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("outhood_access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("outhood_access_token");
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("outhood_access_token", res.data.accessToken);
    setUser(res.data.user);
  }

  async function register(data: { firstName: string; lastName: string; email: string; password: string }) {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("outhood_access_token", res.data.accessToken);
    setUser(res.data.user);
  }

  function logout() {
    localStorage.removeItem("outhood_access_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
