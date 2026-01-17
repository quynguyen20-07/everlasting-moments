import {
  Heart,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
  Image,
  Calendar,
  Gift,
  MessageSquare,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Eye,
  Music,
  Palette,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/uiStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: { title: string; href: string }[];
}

const userNavItems: NavItem[] = [
  {
    title: "Tổng quan",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Tiệc cưới",
    icon: Heart,
    href: "/dashboard/weddings",
  },
  {
    title: "Khách mời",
    icon: Users,
    href: "/dashboard/guests",
  },
  {
    title: "Thư viện ảnh",
    icon: Image,
    href: "/dashboard/gallery",
  },
  {
    title: "Sự kiện",
    icon: Calendar,
    href: "/dashboard/events",
  },
  {
    title: "Mừng cưới",
    icon: Gift,
    href: "/dashboard/gifts",
  },
  {
    title: "Lời chúc",
    icon: MessageSquare,
    href: "/dashboard/wishes",
  },
  {
    title: "Giao diện",
    icon: Palette,
    href: "/dashboard/theme",
  },
  {
    title: "Cài đặt",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "Tổng quan",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Người dùng",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Tiệc cưới",
    icon: Heart,
    href: "/admin/weddings",
  },
  {
    title: "Cài đặt hệ thống",
    icon: Settings,
    href: "/admin/settings",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems = user.phone === "admin" ? adminNavItems : userNavItems;

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-card border-r border-border",
          "flex flex-col h-screen lg:h-auto",
          "lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-primary fill-primary" />
            <span className="font-display text-xl font-semibold">
              True loves
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">
                {user?.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm",
                        "hover:bg-muted transition-colors",
                        isChildActive(item.children) && "bg-muted",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          expandedItems.includes(item.title) && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedItems.includes(item.title) && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-8 mt-1 space-y-1"
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                className={cn(
                                  "block px-3 py-2 rounded-lg text-sm",
                                  "hover:bg-muted transition-colors",
                                  isActive(child.href) &&
                                    "bg-primary/10 text-primary font-medium",
                                )}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
                      "hover:bg-muted transition-colors",
                      isActive(item.href!) &&
                        "bg-primary/10 text-primary font-medium",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          {user.role !== "admin" && (
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/demo/blush-romance">
                <Eye className="w-4 h-4 mr-2" />
                Xem thiệp mẫu
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </motion.aside>
    </>
  );
};
