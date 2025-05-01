"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  full_name: string;
  email?: string;
  phone_number: string;
  role: string;
  status: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Kiểm tra xem người dùng đã đăng nhập chưa khi component mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setLoading(true);
        const success = await checkAuth();
        setLoading(false);

        // Nếu không đăng nhập, không cần redirect ở đây
        // để cho phép truy cập các trang không cần xác thực
      } catch (error) {
        console.error("Auth check failed:", error);
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Hàm kiểm tra xác thực - gọi API để kiểm tra token/session
  const checkAuth = async (): Promise<boolean> => {
    try {
      // Thực hiện kiểm tra xác thực bằng cách gọi API
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setUser(data.data);
          return true;
        }
      }

      setUser(null);
      return false;
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      return false;
    }
  };

  // Hàm đăng nhập
  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.data);
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    try {
      setLoading(true);

      // Gọi API để đăng xuất và xóa session
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook để sử dụng AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
