import { getCountdown } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <section id="templates" className="py-20 bg-[#fdfaf8]">
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

      {/* Header */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-[#c4a99b] font-elegant text-sm tracking-widest uppercase mb-3">
            Bộ sưu tập thiệp cưới
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4a3f3a] mb-4">
            Cao cấp
          </h2>
        </motion.div>

        {/* Template Rows - Each layout = 1 row with theme slider */}
        <div className="space-y-16">
          {TEMPLATE_LAYOUTS.slice(0, 2).map((layout, index) => (
            <motion.div
              key={layout.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
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
      </div>
    </section>
  );
};

export default Templates;
