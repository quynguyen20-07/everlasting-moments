import { ProtectedRoute, PublicOnlyRoute } from "@/components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLoading } from "@/components/LoadingSpinner";
import { setLogoutCallback } from "@/lib/graphql/client";
import { setApiLogoutCallback } from "@/lib/api/client";
import { DashboardLayout } from "@/layouts/MainLayout";
import GuestManagement from "@/pages/GuestManagement";
import WishManagement from "@/pages/WishManagement";
import AdminDashboard from "@/pages/AdminDashboard";
import PublicWedding from "@/pages/PublicWedding";
import { Toaster } from "@/components/ui/toaster";
import WeddingList from "@/pages/WeddingList";
import WeddingEdit from "@/pages/WeddingEdit";
import { UIProvider } from "@/hooks/useUI";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import { useEffect } from "react";
import Demo from "@/pages/Demo";
import Auth from "@/pages/Auth";

import TemplatesPage from "./components/landing/TemplatesPage";
import TemplateDetailPage from "./pages/TemplateDetailPage";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// App initialization wrapper to check auth on mount
const AppContent = () => {
  const { isLoading, logout } = useAuth();

  // Set up logout callbacks for API clients
  useEffect(() => {
    setLogoutCallback(logout);
    setApiLogoutCallback(logout);
  }, [logout]);

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
      <Route path="/demo/:slug" element={<Demo />} />
      <Route path="/weddings/:slug" element={<PublicWedding />} />

      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/templates/:slug" element={<TemplateDetailPage />} />

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
          path="weddings/:weddingId/guests"
          element={<GuestManagement />}
        />
        <Route path="weddings/:weddingId/wishes" element={<WishManagement />} />
        <Route
          path="gallery"
          element={
            <div className="bg-card rounded-2xl border p-6">
              <h1 className="text-2xl font-bold mb-4">Thư viện Ảnh</h1>
              <p className="text-muted-foreground">
                Tính năng đang được phát triển...
              </p>
            </div>
          }
        />
        <Route
          path="settings"
          element={
            <div className="bg-card rounded-2xl border p-6">
              <h1 className="text-2xl font-bold mb-4">Cài đặt</h1>
              <p className="text-muted-foreground">
                Tính năng đang được phát triển...
              </p>
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
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UIProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </UIProvider>
  </QueryClientProvider>
);

export default App;
