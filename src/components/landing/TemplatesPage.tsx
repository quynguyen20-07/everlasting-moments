import {
  TEMPLATE_LAYOUTS,
  TEMPLATES_THEME_LIST,
} from "@/lib/templates/wedding-templates";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";
import { ITimeCountdown } from "@/types";
import { motion } from "framer-motion";

import TemplateRowSlider from "./TemplateRowSlider";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TemplatesPage = () => {
  const navigate = useNavigate();

  const targetTime = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);

  const [countdown, setCountdown] = useState<ITimeCountdown>(
    getCountdown(targetTime),
  );

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
    <div className="min-h-screen bg-[#fdfaf8]">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#f8f1ed] text-[#c4a99b] mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-elegant text-sm">
                Các Mẫu Thiệp Premium
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#4a3f3a] mb-4">
              Bộ Sưu Tập Thiệp Cưới
              <span className="text-gradient-gold"> Cao Cấp</span>
            </h1>
            <p className="text-[#7a6b64] font-elegant text-base md:text-lg">
              Mỗi mẫu thiệp được thiết kế tinh tế với bảng màu và phong cách
              riêng biệt, phù hợp với mọi phong cách cưới
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
                {/* Layout Title */}
                <div className="text-center mb-6">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#4a3f3a]">
                    {layout.nameVi}
                  </h3>
                  <p className="text-[#7a6b64] font-elegant text-sm mt-1">
                    {layout.descriptionVi}
                  </p>
                </div>

                <TemplateRowSlider
                  layout={layout}
                  themes={TEMPLATES_THEME_LIST}
                  countdown={countdown}
                  onTemplateClick={handleTemplateClick}
                  autoPlay={true}
                  autoPlayInterval={5000}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16 p-8 rounded-2xl bg-[#f8f1ed] border border-[#e8d4c8]"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#4a3f3a] mb-4">
              Chưa tìm thấy mẫu ưng ý?
            </h2>
            <p className="text-[#7a6b64] mb-6 max-w-2xl mx-auto">
              Liên hệ với chúng tôi để thiết kế mẫu thiệp độc quyền theo phong
              cách riêng của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 bg-[#c4a99b] hover:bg-[#b39888] text-white rounded-2xl"
              >
                <Sparkles className="w-5 h-5" />
                Yêu cầu thiết kế riêng
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#c4a99b] text-[#c4a99b] hover:bg-[#c4a99b]/10 rounded-2xl"
              >
                Liên hệ tư vấn
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplatesPage;
