import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  Search,
  Shield,
  BarChart3,
  Bell,
  FileText,
  Palette,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Lock,
  Unlock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock admin data
const mockStats = {
  totalUsers: 1247,
  totalWeddings: 856,
  activeInvitations: 423,
  monthlyRevenue: 12500,
};

const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    weddings: 2,
    status: "active",
    plan: "Pro",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "thib@example.com",
    weddings: 1,
    status: "active",
    plan: "Free",
    joinedAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "vanc@example.com",
    weddings: 3,
    status: "locked",
    plan: "Pro",
    joinedAt: "2023-12-10",
  },
];

const mockWeddings = [
  {
    id: "1",
    couple: "Linh & Tuấn",
    user: "Nguyễn Văn A",
    date: "2025-02-14",
    status: "published",
    views: 1234,
    flagged: false,
  },
  {
    id: "2",
    couple: "Hương & Minh",
    user: "Trần Thị B",
    date: "2025-03-20",
    status: "draft",
    views: 0,
    flagged: false,
  },
  {
    id: "3",
    couple: "Mai & Hùng",
    user: "Lê Văn C",
    date: "2025-04-15",
    status: "published",
    views: 567,
    flagged: true,
  },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Heart, label: "Weddings", href: "/admin/weddings" },
  { icon: Palette, label: "Templates", href: "/admin/templates" },
  { icon: FileText, label: "Content", href: "/admin/content" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Shield, label: "Security", href: "/admin/security" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const Admin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "weddings">("users");

  const stats = [
    { label: "Total Users", value: mockStats.totalUsers.toLocaleString(), icon: Users, trend: "+12%" },
    { label: "Total Weddings", value: mockStats.totalWeddings.toLocaleString(), icon: Heart, trend: "+8%" },
    { label: "Active Invitations", value: mockStats.activeInvitations.toLocaleString(), icon: CheckCircle, trend: "+15%" },
    { label: "Monthly Revenue", value: `$${mockStats.monthlyRevenue.toLocaleString()}`, icon: CreditCard, trend: "+23%" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-semibold">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {adminNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Admin User */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-display font-semibold text-primary-foreground">
                A
              </div>
              <div>
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => navigate("/auth")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="font-display text-2xl font-semibold">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-display font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={activeTab === "users" ? "gold" : "outline"}
              onClick={() => setActiveTab("users")}
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>
            <Button
              variant={activeTab === "weddings" ? "gold" : "outline"}
              onClick={() => setActiveTab("weddings")}
            >
              <Heart className="w-4 h-4 mr-2" />
              Weddings
            </Button>
          </div>

          {/* Content */}
          {activeTab === "users" ? (
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                  User Management
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium">User</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Weddings</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Plan</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Joined</th>
                      <th className="text-right px-6 py-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-secondary/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-medium">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{user.weddings}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.plan === "Pro" ? "bg-primary/10 text-primary" : "bg-secondary"
                          }`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                            {user.status === "active" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {user.status === "active" ? (
                                  <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Lock Account
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="w-4 h-4 mr-2" />
                                    Unlock Account
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                  Wedding Management
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search weddings..." className="pl-10 w-64" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium">Couple</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Created By</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Date</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
                      <th className="text-left px-6 py-3 text-sm font-medium">Views</th>
                      <th className="text-right px-6 py-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockWeddings.map((wedding) => (
                      <tr key={wedding.id} className="hover:bg-secondary/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{wedding.couple}</span>
                              {wedding.flagged && (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{wedding.user}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(wedding.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            wedding.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {wedding.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{wedding.views.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Wedding
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="w-4 h-4 mr-2" />
                                Unpublish
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
