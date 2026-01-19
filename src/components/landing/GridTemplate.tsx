import { getCountdown } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITimeCountdown } from "@/types";
import { motion } from "framer-motion";
import {
  TEMPLATE_LAYOUTS,
  TEMPLATES_THEME_LIST,
} from "@/lib/templates/wedding-templates";
import TemplateHeroCard from "./TemplateHeroCard";

const GridTemplate = () => {
  const navigate = useNavigate();

  const targetTime = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);

  const [countdown, setCountdown] = useState<ITimeCountdown>(
    getCountdown(targetTime)
  );

  // Auto-play: cycle through themes every 5 seconds
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

  // Get first 6 layouts for the grid (2 rows x 3 columns)
  const displayLayouts = TEMPLATE_LAYOUTS.slice(0, 6);

  const coupleData = {
    bride: { name: "Ngọc Linh" },
    groom: { name: "Minh Tuấn" },
  };

  const weddingDate = new Date(
    new Date().getTime() + 15 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Get the current theme based on auto-play index
  const getCurrentTheme = (layoutIndex: number) => {
    // Each card can have a different starting offset for variety
    const themeIndex = (activeThemeIndex + layoutIndex) % TEMPLATES_THEME_LIST.length;
    return TEMPLATES_THEME_LIST[themeIndex];
  };

  return (
    <section id="templates" className="py-20 bg-[#fdfaf8]">
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
                  template={{
                    name: layout.name,
                    category: layout.style,
                  } as any}
                  coupleData={coupleData}
                  countdown={countdown}
                  date={weddingDate}
                  onClick={() => handleTemplateClick(layout.id)}
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
