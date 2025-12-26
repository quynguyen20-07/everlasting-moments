import { DashboardHeader } from "@/components/dashboard/DashboardSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  headerActions?: ReactNode;
  showStats?: boolean;
  fullWidth?: boolean;
}

export const MainLayout = ({
  children,
  title = "Dashboard",
  description,
  headerActions,
  showStats = false,
  fullWidth = false,
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Header */}
        <DashboardHeader />

        {/* Content Container */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Stats Section (optional) */}
          {showStats && (
            <div className="mb-8">
              {/* Stats grid sẽ được thêm sau nếu cần */}
            </div>
          )}

          {/* Main Content */}
          <div className={cn("space-y-6", !fullWidth && "max-w-7xl mx-auto")}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
