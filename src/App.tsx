import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useUIStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import UserDetails from "@/pages/UserDetails";
import Posts from "@/pages/Posts";
import AcademicStructure from "@/pages/AcademicStructure";
import Reports from "@/pages/Reports";
import Questions from "@/pages/Questions";
import Tags from "@/pages/Tags";
import Analytics from "@/pages/Analytics";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const { theme } = useUIStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserDetails />} />
            <Route path="posts" element={<Posts />} />
            <Route path="academic" element={<AcademicStructure />} />
            <Route path="reports" element={<Reports />} />
            <Route path="questions" element={<Questions />} />
            <Route path="tags" element={<Tags />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
