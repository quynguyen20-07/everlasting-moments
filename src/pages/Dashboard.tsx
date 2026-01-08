import { Eye, Heart, Menu, MessageCircle, Plus, Users } from "lucide-react";
import { WeddingCard } from "@/components/wedding/WeddingCard";
import { useWeddingStore } from "@/stores/weddingStore";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Dashboard = () => {
  const { weddings } = useWeddingStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Tổng số thiệp", value: "2", icon: Heart },
    { label: "Lượt xem", value: "245", icon: Eye },
    { label: "Khách xác nhận", value: "89", icon: Users },
    { label: "Lời chúc mới", value: "12", icon: MessageCircle },
  ];

  return (
    <div>
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
              Bảng điều khiển
            </h1>
          </div>
          <Button variant="gold" asChild>
            <Link to="/dashboard/weddings">
              <Plus className="w-4 h-4" />
              Tạo thiệp mới
            </Link>
          </Button>
        </div>
      </header>

      <div className="p-6">
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
              </div>
              <p className="text-3xl font-display font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-soft">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold">Thiệp cưới</h2>
          </div>
          <div className="p-6">
            {weddings.map((wedding, index) => (
              <WeddingCard
                key={wedding.id}
                wedding={wedding}
                index={index}
                onPublishToggle={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-blush-light border border-border"
          >
            <h3 className="font-display text-lg font-semibold mb-2">
              Bạn cần giúp đỡ?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Xem hướng dẫn và các mẫu thiệp đẹp để tạo thiệp cưới hoàn hảo.
            </p>
            <Button variant="outline" size="sm">
              Xem hướng dẫn
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-champagne-light/20 to-cream border border-border"
          >
            <h3 className="font-display text-lg font-semibold mb-2">
              Nâng cấp Pro
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Mở khóa toàn bộ mẫu thiệp cao cấp và xóa hình mờ.
            </p>
            <Button variant="gold" size="sm">
              Xem gói dịch vụ
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="font-display text-lg font-semibold mb-2">
              Liên hệ hỗ trợ
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Có câu hỏi? Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn.
            </p>
            <Button variant="outline" size="sm">
              Liên hệ ngay
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
