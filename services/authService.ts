import { AdminUser } from "@/types";

const ADMIN_EMAIL = "bikigodswill25@gmail.com";
const ADMIN_PASSWORD = "password123";
const AUTH_KEY = "gp_admin_auth";

export const authService = {
  login: (email: string, password: string): AdminUser | null => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: AdminUser = { email, role: "admin" };
      if (typeof window !== "undefined") {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }
      return user;
    }
    return null;
  },

  logout: (): void => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(AUTH_KEY);
    }
  },

  getUser: (): AdminUser | null => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AdminUser;
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return authService.getUser() !== null;
  },
};
