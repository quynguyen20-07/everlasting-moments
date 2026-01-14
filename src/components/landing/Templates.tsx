import { getCountdown } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ITimeCountdown } from "@/types";
import { motion } from "framer-motion";
import {
  TEMPLATE_LAYOUTS,
  TEMPLATES_THEME_LIST,
} from "@/lib/templates/wedding-templates";
import TemplateRowSlider from "./TemplateRowSlider";

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

        {/* Template Rows - Each layout = 1 row with theme slider */}
        <div className="space-y-16">
          {TEMPLATE_LAYOUTS.map((layout, index) => (
            <motion.div
              key={layout.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TemplateRowSlider
                layout={layout}
                themes={TEMPLATES_THEME_LIST}
                countdown={countdown}
                onTemplateClick={handleTemplateClick}
              />
            </motion.div>
          ))}
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
