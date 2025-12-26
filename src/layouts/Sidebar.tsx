import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Gift,
  Globe,
  Heart,
  Image,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Music,
  Palette,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
  children?: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  // Main navigation items
  const navItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Calendar,
      label: "My Weddings",
      href: "/dashboard/weddings",
      badge: 3,
    },
    {
      icon: Users,
      label: "Guest Management",
      href: "/dashboard/guests",
      children: [
        { icon: Users, label: "Guest List", href: "/dashboard/guests/list" },
        { icon: Calendar, label: "RSVPs", href: "/dashboard/guests/rsvps" },
        { icon: Gift, label: "Gifts", href: "/dashboard/guests/gifts" },
      ],
    },
    {
      icon: Image,
      label: "Media Gallery",
      href: "/dashboard/media",
    },
    {
      icon: MessageCircle,
      label: "Wishes & Messages",
      href: "/dashboard/wishes",
      badge: 12,
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/dashboard/analytics",
    },
    {
      icon: Palette,
      label: "Theme & Design",
      href: "/dashboard/design",
      children: [
        { icon: Palette, label: "Colors", href: "/dashboard/design/colors" },
        { icon: Music, label: "Music", href: "/dashboard/design/music" },
        {
          icon: Globe,
          label: "Languages",
          href: "/dashboard/design/languages",
        },
      ],
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
      children: [
        {
          icon: CreditCard,
          label: "Subscription",
          href: "/dashboard/settings/subscription",
        },
        {
          icon: Bell,
          label: "Notifications",
          href: "/dashboard/settings/notifications",
        },
        { icon: Users, label: "Team", href: "/dashboard/settings/team" },
      ],
    },
  ];

  const isActive = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col",
          "lg:static lg:translate-x-0 lg:z-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="relative">
              <Heart className="w-7 h-7 text-primary fill-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-wedding-gold rounded-full border-2 border-card" />
            </div>
            <div>
              <span className="font-display text-xl font-semibold bg-gradient-to-r from-primary to-wedding-gold bg-clip-text text-transparent">
                WeddingElegance
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Premium Invitations
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all",
                      "hover:bg-secondary hover:text-foreground",
                      active
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="h-5 px-1.5 text-xs min-w-5 justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>

                  {/* Sub-items */}
                  {item.children && active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="ml-9 mt-1 space-y-1 border-l border-border pl-3"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg",
                            "hover:bg-secondary/50 hover:text-foreground",
                            isActive(child.href)
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pro Upgrade Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 mx-3 p-3 rounded-lg bg-gradient-to-r from-wedding-gold/10 to-primary/10 border border-wedding-gold/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-wedding-gold flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock premium features and templates
            </p>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-wedding-gold to-primary hover:opacity-90"
              asChild
            >
              <Link to="/dashboard/settings/subscription" onClick={onClose}>
                Upgrade Now
              </Link>
            </Button>
          </motion.div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {user?.name || "User Name"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              asChild
            >
              <Link to="/dashboard/settings" onClick={onClose}>
                Settings
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              asChild
            >
              <Link to="/help" onClick={onClose}>
                Help
              </Link>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Close Button (Mobile only) */}
      {isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-64 z-50 lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};
