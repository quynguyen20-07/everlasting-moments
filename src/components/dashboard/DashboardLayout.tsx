import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useUIStore } from "@/stores/uiStore";
// src/components/dashboard/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

import { DashboardSidebar, DashboardHeader } from "./DashboardSidebar";

interface DashboardLayoutProps {
  isAdmin?: boolean;
  title?: string;
  description?: string;
  showCreateButton?: boolean;
  showSearch?: boolean;
}

export const DashboardLayout = ({
  isAdmin = false,
  title,
  description,
  showCreateButton = false,
  showSearch = false,
}: DashboardLayoutProps) => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar isAdmin={isAdmin} />
        <main
          className={cn(
            "flex-1 min-h-[calc(100vh-3.5rem)] lg:min-h-screen",
            "transition-all duration-300"
          )}
        >
          <ErrorBoundary>
            <div className="container max-w-7xl py-6 px-4 lg:px-8">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};
