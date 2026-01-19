import {
  TEMPLATE_LAYOUTS,
  TEMPLATES_THEME_LIST,
} from "@/lib/templates/wedding-templates";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";
import { ITimeCountdown } from "@/types";
import { motion } from "framer-motion";

import TemplateHeroCard from "./TemplateHeroCard";

const GridTemplate = () => {
  const navigate = useNavigate();

  const targetTime = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);

  const [countdown, setCountdown] = useState<ITimeCountdown>(
    getCountdown(targetTime),
  );

  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setActiveThemeIndex((prev) => (prev + 1) % TEMPLATES_THEME_LIST.length);
    }, 5000);

    return () => clearInterval(autoPlayInterval);
  }, []);

  const handleTemplateClick = (templateId: string) => {
    navigate(`/templates/${templateId}`);
  };

  const displayLayouts = TEMPLATE_LAYOUTS.slice(0, 6);

  const coupleData = {
    bride: { name: "Ngọc Linh" },
    groom: { name: "Minh Tuấn" },
  };

  const weddingDate = new Date(
    new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const getCurrentTheme = (layoutIndex: number) => {
    const themeIndex =
      (activeThemeIndex + layoutIndex) % TEMPLATES_THEME_LIST.length;
    return TEMPLATES_THEME_LIST[themeIndex];
  };

  return (
    <section id="templates" className="py-20 bg-[#F5EBE8] relative">
      {/* Wave Top */}
      <svg
        className="z-50 absolute top-0 left-0 w-full h-20 -translate-y-1"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="#f8f1ed"
          d="
        M0,40 
        C200,0 400,80 600,40 
        C800,0 1000,80 1200,40 
        C1400,0 1440,20 1440,20 
        L1440,0 
        L0,0 
        Z
      "
        />
      </svg>

      {/* Header */}
      <div className="container mx-auto px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 pt-8"
        >
          <p className="text-[#c4a99b] font-elegant text-sm tracking-widest uppercase mb-3">
            Bộ sưu tập thiệp cưới
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4a3f3a] mb-4">
            <span className="italic text-[#D4A8A8]">Cao cấp</span>
          </h2>
        </motion.div>

        {/* Grid Layout: 2 rows x 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayLayouts.map((layout, index) => {
            const theme = getCurrentTheme(index);
            const colors = {
              primary: `hsl(${theme.colors.primary})`,
              secondary: `hsl(${theme.colors.secondary})`,
              background: `hsl(${theme.colors.background})`,
              foreground: `hsl(${theme.colors.foreground})`,
              accent: `hsl(${theme.colors.accent})`,
              muted: `hsl(${theme.colors.muted})`,
              text: `hsl(${theme.colors.foreground})`,
            };

            return (
              <motion.div
                key={layout.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <TemplateHeroCard
                  colors={colors}
                  template={{ name: layout.name }}
                  coupleData={coupleData}
                  countdown={countdown}
                  date={weddingDate}
                  onClick={() => handleTemplateClick(layout.id)}
                  setShowShareModal={(show: boolean) => {
                    console.log("Share modal state:", show);
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GridTemplate;
