import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import { AdminUser } from "@/types";

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/login", { email, password });
          const { user, token } = response.data.data;

          localStorage.setItem("admin_token", token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("admin_token");
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        // try {
        //   const response = await api.get('/auth/me');
        //   const user = response.data.data;
        //   set({ user, token, isAuthenticated: true });
        // } catch (error) {
        //   localStorage.removeItem('admin_token');
        //   set({ user: null, token: null, isAuthenticated: false });
        // }
      },
    }),
    {
      name: "admin-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
