import {
  COLOR_SCHEMES,
  coupleData,
  DEFAULT_COLORS,
  getCountdown,
  TEMPLATES_LIST,
  formatDateStr,
  formatLunarVietnamese,
} from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Sparkles, Star } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ITimeCountdown } from "@/types";
import { motion } from "framer-motion";

import TemplateHeroCard from "./TemplateHeroCard";

const Templates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const targetTime = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);

  const [countdown, setCountdown] = useState<ITimeCountdown>(
    getCountdown(targetTime)
  );

  const isTemplatePage = location.pathname.startsWith("/templates");

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTemplateClick = (templateId: string) => {
    navigate(`/templates/${templateId}`);
  };

  return (
    <main className="min-h-screen bg-background">
      {isTemplatePage && (
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Quay Lại
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="font-elegant text-sm">Các Mẫu Thiệp Premium</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Bộ Sưu Tập Thiệp Cưới
            <span className="text-gradient-gold"> Cao Cấp</span>
          </h1>
          <p className="text-muted-foreground font-elegant text-base md:text-lg">
            Mỗi mẫu thiệp được thiết kế tinh tế với bảng màu và phong cách riêng
            biệt, phù hợp với mọi phong cách cưới
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TEMPLATES_LIST.map((template, index) => {
            const colors =
              COLOR_SCHEMES[template.id as keyof typeof COLOR_SCHEMES] ||
              DEFAULT_COLORS;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Template Card */}
                <TemplateHeroCard
                  colors={colors}
                  template={template}
                  coupleData={coupleData}
                  countdown={countdown}
                  date={"2026-01-08T10:00:00Z"}
                  onClick={() => handleTemplateClick(template.id)}
                  // compact
                />

                {/* Template Info */}
                <div className="mt-4 px-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {"1.2K"} lượt xem
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-xs"
                      onClick={() => handleTemplateClick(template.id)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border"
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            Chưa tìm thấy mẫu ưng ý?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để thiết kế mẫu thiệp độc quyền theo phong
            cách riêng của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-5 h-5" />
              Yêu cầu thiết kế riêng
            </Button>
            <Button variant="outline" size="lg">
              Xem tất cả mẫu
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Templates;
