import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Mẫu Thiệp", href: "/templates" },
  { name: "Giá Cả", href: "/pricing" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav className="rounded-[20px] bg-black/20 backdrop-blur-[3.25px] px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#c4a99b] fill-[#c4a99b]" />
              <span className="font-display text-lg font-semibold text-white">
                True loves
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors font-display"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {user.role === "admin" && (
                    <Button
                      className="bg-[#c4a99b] hover:bg-[#b39888] text-white rounded-2xl px-4 py-2 text-sm"
                      asChild
                    >
                      <Link to="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Bảng Điều Khiển
                      </Link>
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-2xl hover:bg-white/10"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-[#c4a99b] text-white text-sm">
                            {getInitials(user?.fullName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-white"
                      align="end"
                      forceMount
                    >
                      <div className="flex flex-col space-y-1 px-2 py-1.5">
                        <p className="text-sm font-medium text-[#4a3f3a]">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-[#7a6b64]">{user?.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      {user.role === "admin" && (
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Bảng Điều Khiển
                          </Link>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/profile">
                          <User className="w-4 h-4 mr-2" />
                          Hồ sơ
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  className="bg-[#c4a99b] hover:bg-[#b39888] text-white rounded-2xl px-6 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/auth">Đăng Nhập</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4 pt-4 border-t border-white/20"
              >
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-3 py-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#c4a99b] text-white text-sm">
                              {getInitials(user?.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user?.fullName}
                            </p>
                            <p className="text-xs text-white/60">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link to="/dashboard">
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-white/80 hover:text-white hover:bg-white/10"
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Đăng xuất
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="bg-[#c4a99b] hover:bg-[#b39888] text-white rounded-2xl"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/auth">Đăng Nhập</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
