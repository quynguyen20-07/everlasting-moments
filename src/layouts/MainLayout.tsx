import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUI } from "@/hooks";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

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
  const { sidebarOpen } = useUI();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={cn(
            "flex-1 min-h-[calc(100vh-3.5rem)] lg:min-h-screen",
            "transition-all duration-300",
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
