import { ArrowLeft, Eye, EyeOff, Heart, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register, isAuthenticated, user } = useAuthStore();

  const [mode, setMode] = useState<"signin" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup") {
      setMode("signup");
    } else {
      setMode("signin");
    }
  }, [searchParams]);

  // Chuyển hướng nếu đã xác thực
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        await register({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast({
          title: "Tạo tài khoản thành công!",
          description: "Đang chuyển hướng...",
        });
      } else {
        await login({ email: formData.email, password: formData.password });
        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng bạn trở lại!",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex invitation-pattern">
      {/* Phía bên trái - Biểu mẫu */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Liên kết quay lại */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <span className="font-display text-2xl font-semibold">
              WeddingCard
            </span>
          </div>

          {/* Tiêu đề */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold mb-2">
              {mode === "signup"
                ? "Tạo tài khoản của bạn"
                : "Chào mừng trở lại"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "signup"
                ? "Bắt đầu tạo lời mời đám cưới xinh đẹp của bạn"
                : "Đăng nhập để tiếp tục tới bảng điều khiển của bạn"}
            </p>
          </div>

          {/* Biểu mẫu */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tên của bạn"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === "signin" && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Vui lòng chờ..."
                : mode === "signup"
                ? "Tạo tài khoản"
                : "Đăng nhập"}
            </Button>
          </form>

          {/* Chuyển đổi chế độ */}
          <p className="mt-8 text-center text-muted-foreground">
            {mode === "signup" ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
            <button
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-primary hover:underline font-medium"
            >
              {mode === "signup" ? "Đăng nhập" : "Đăng ký"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Phía bên phải - Trang trí */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary via-blush-light to-cream-dark items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-card shadow-elegant flex items-center justify-center">
            <Heart className="w-16 h-16 text-primary fill-primary animate-heartbeat" />
          </div>
          <h2 className="font-display text-4xl font-semibold mb-4">
            Câu chuyện tình yêu của bạn đang chờ đợi
          </h2>
          <p className="text-muted-foreground font-elegant text-lg">
            Tham gia hàng ngàn cặp đôi đã tạo những lời mời đám cưới kỹ thuật số
            xinh đẹp để chia sẻ ngày đặc biệt của họ.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
