import { PageLoading } from "@/components/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <PageLoading text="Đang xác thực..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const PublicOnlyRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isAuthenticated && user) {
    return <Navigate to={user.role === "admin" ? "/dashboard" : "/"} replace />;
  }

  return <>{children}</>;
};
