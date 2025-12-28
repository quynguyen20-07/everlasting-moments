import { ProtectedRoute, PublicOnlyRoute } from "@/components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLoading } from "@/components/LoadingSpinner";
import { useAuthStore } from "@/stores/authStore";
import { Toaster } from "@/components/ui/toaster";
import WeddingList from "@/pages/WeddingList";
import WeddingEdit from "@/pages/WeddingEdit";
import NotFound from "@/pages/NotFound";
// Pages
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import { useEffect } from "react";
import Demo from "@/pages/Demo";
import Auth from "@/pages/Auth";

import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// App initialization wrapper to check auth on mount
const AppContent = () => {
  const { isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading while checking auth status
  if (isLoading) {
    return <PageLoading text="Đang khởi tạo..." />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route
        path="/auth"
        element={
          <PublicOnlyRoute>
            <Auth />
          </PublicOnlyRoute>
        }
      />
      <Route path="/demo" element={<Demo />} />

      {/* Dashboard Routes with Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="weddings" element={<WeddingList />} />
        <Route path="weddings/:id/edit" element={<WeddingEdit />} />

        <Route
          path="guests"
          element={
            <div className="bg-card rounded-xl border p-6">
              <h1 className="text-2xl font-bold mb-4">Guest Management</h1>
              <p className="text-muted-foreground">
                Guest management coming soon...
              </p>
            </div>
          }
        />

        <Route
          path="gallery"
          element={
            <div className="bg-card rounded-xl border p-6">
              <h1 className="text-2xl font-bold mb-4">Media Gallery</h1>
              <p className="text-muted-foreground">
                Media gallery coming soon...
              </p>
            </div>
          }
        />

        <Route
          path="settings"
          element={
            <div className="bg-card rounded-xl border p-6">
              <h1 className="text-2xl font-bold mb-4">Settings</h1>
              <p className="text-muted-foreground">Settings coming soon...</p>
            </div>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <DashboardLayout isAdmin={true} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Admin />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
