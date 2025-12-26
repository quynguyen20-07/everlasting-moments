import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Layout
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import WeddingList from "@/pages/WeddingList";
import WeddingEdit from "@/pages/WeddingEdit";
import NotFound from "@/pages/NotFound";
// Pages
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import Demo from "@/pages/Demo";
import Auth from "@/pages/Auth";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  return token && userRole === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
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
            <Route
              index
              element={
                <div className="space-y-6">
                  {/* Dashboard home content */}
                  <div className="bg-card rounded-xl border p-6">
                    <h1 className="text-2xl font-bold mb-2">
                      Welcome to Wedding Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                      Manage your wedding invitations
                    </p>
                  </div>
                </div>
              }
            />

            <Route path="weddings" element={<WeddingList />} />
            {/* <Route path="weddings/create" element={<CreateWedding />} /> */}
            <Route path="weddings/:id/edit" element={<WeddingEdit />} />

            {/* Add other dashboard routes here */}
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
                  <p className="text-muted-foreground">
                    Settings coming soon...
                  </p>
                </div>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <DashboardLayout isAdmin={true} />
              </AdminRoute>
            }
          >
            <Route
              index
              element={
                <div className="bg-card rounded-xl border p-6">
                  <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                  <p className="text-muted-foreground">
                    Admin dashboard coming soon...
                  </p>
                </div>
              }
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
