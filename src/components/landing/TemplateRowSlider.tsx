import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  TemplateLayout,
  TemplateTheme,
  TEMPLATES_THEME_LIST,
  createWeddingTemplate,
} from "@/lib/templates/wedding-templates";
import { COLOR_SCHEMES, coupleData, DEFAULT_COLORS, getCountdown } from "@/lib/utils";
import { ITimeCountdown } from "@/types";
import TemplateHeroCard from "./TemplateHeroCard";

interface TemplateRowSliderProps {
  layout: TemplateLayout;
  themes: TemplateTheme[];
  countdown: ITimeCountdown;
  onTemplateClick: (templateId: string) => void;
}

const TemplateRowSlider = ({
  layout,
  themes,
  countdown,
  onTemplateClick,
}: TemplateRowSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get visible indices (prev, current, next) with infinite loop
  const getVisibleIndices = useCallback(() => {
    const total = themes.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    return { prev, current: activeIndex, next };
  }, [activeIndex, themes.length]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + themes.length) % themes.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % themes.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const { prev, current, next } = getVisibleIndices();

  const getColors = (theme: TemplateTheme) => {
    return COLOR_SCHEMES[theme.id as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;
  };

  const getTemplate = (theme: TemplateTheme) => {
    return createWeddingTemplate(layout, theme);
  };

  return (
    <div className="w-full">
      {/* Layout Title */}
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
          {layout.nameVi}
        </h3>
        <p className="text-muted-foreground font-elegant text-sm mt-1">
          {layout.descriptionVi}
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-30 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
          onClick={handlePrev}
          disabled={isAnimating}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Cards Container */}
        <div className="flex items-center justify-center gap-4 md:gap-6 overflow-hidden px-12 md:px-16 py-4">
          {/* Previous Card (Left) */}
          <motion.div
            key={`prev-${themes[prev].id}`}
            className="hidden md:block flex-shrink-0 opacity-60 hover:opacity-80 transition-opacity duration-300"
            initial={{ x: -50, opacity: 0, scale: 0.75 }}
            animate={{ x: 0, opacity: 0.6, scale: 0.75 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "center right" }}
          >
            <TemplateHeroCard
              colors={getColors(themes[prev])}
              template={getTemplate(themes[prev])}
              coupleData={coupleData}
              countdown={countdown}
              date="2026-01-08T10:00:00Z"
              onClick={() => onTemplateClick(getTemplate(themes[prev]).id)}
            />
          </motion.div>

          {/* Center Card (Active) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`active-${themes[current].id}`}
              className="flex-shrink-0 z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TemplateHeroCard
                colors={getColors(themes[current])}
                template={getTemplate(themes[current])}
                coupleData={coupleData}
                countdown={countdown}
                date="2026-01-08T10:00:00Z"
                onClick={() => onTemplateClick(getTemplate(themes[current]).id)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Card (Right) */}
          <motion.div
            key={`next-${themes[next].id}`}
            className="hidden md:block flex-shrink-0 opacity-60 hover:opacity-80 transition-opacity duration-300"
            initial={{ x: 50, opacity: 0, scale: 0.75 }}
            animate={{ x: 0, opacity: 0.6, scale: 0.75 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "center left" }}
          >
            <TemplateHeroCard
              colors={getColors(themes[next])}
              template={getTemplate(themes[next])}
              coupleData={coupleData}
              countdown={countdown}
              date="2026-01-08T10:00:00Z"
              onClick={() => onTemplateClick(getTemplate(themes[next]).id)}
            />
          </motion.div>
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-30 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
          onClick={handleNext}
          disabled={isAnimating}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Theme Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {themes.map((theme, index) => (
          <button
            key={theme.id}
            onClick={() => {
              if (!isAnimating && index !== activeIndex) {
                setIsAnimating(true);
                setActiveIndex(index);
                setTimeout(() => setIsAnimating(false), 400);
              }
            }}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === activeIndex
                ? "border-primary scale-125"
                : "border-border hover:border-primary/50"
            }`}
            style={{
              backgroundColor:
                index === activeIndex
                  ? `hsl(${theme.primaryHsl})`
                  : "transparent",
            }}
            title={theme.name}
          />
        ))}
      </div>

      {/* Active Theme Name */}
      <div className="text-center mt-3">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `hsl(${themes[current].primaryHsl} / 0.15)`,
            color: `hsl(${themes[current].primaryHsl})`,
          }}
        >
          {themes[current].name}
        </span>
      </div>
    </div>
  );
};

export default TemplateRowSlider;
