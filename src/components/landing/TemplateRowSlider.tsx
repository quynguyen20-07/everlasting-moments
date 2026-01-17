import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  TemplateLayout,
  TemplateTheme,
  createWeddingTemplate,
} from "@/lib/templates/wedding-templates";
import { COLOR_SCHEMES, coupleData, DEFAULT_COLORS } from "@/lib/utils";
import { ITimeCountdown } from "@/types";
import TemplateHeroCard from "./TemplateHeroCard";

interface TemplateRowSliderProps {
  layout: TemplateLayout;
  themes: TemplateTheme[];
  countdown: ITimeCountdown;
  onTemplateClick: (templateId: string) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const TemplateRowSlider = ({
  layout,
  themes,
  countdown,
  onTemplateClick,
  autoPlay = false,
  autoPlayInterval = 5000,
}: TemplateRowSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Get visible indices (prev, current, next) with infinite loop
  const getVisibleIndices = useCallback(() => {
    const total = themes.length;
    const prev = (activeIndex - 1 + total) % total;
    const next = (activeIndex + 1) % total;
    return { prev, current: activeIndex, next };
  }, [activeIndex, themes.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + themes.length) % themes.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, themes.length]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % themes.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, themes.length]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, isPaused, handleNext]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const { prev, current, next } = getVisibleIndices();

  const getColors = (theme: TemplateTheme) => {
    return COLOR_SCHEMES[theme.id as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;
  };

  const getTemplate = (theme: TemplateTheme) => {
    return createWeddingTemplate(layout, theme);
  };

  return (
    <div 
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Container */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 md:left-4 z-30 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-[#c4a99b]/30"
          onClick={handlePrev}
          disabled={isAnimating}
        >
          <ChevronLeft className="w-5 h-5 text-[#4a3f3a]" />
        </Button>

        {/* Cards Container */}
        <div className="flex items-center justify-center gap-2 md:gap-6 overflow-hidden px-12 md:px-20 py-4">
          {/* Previous Card (Left) */}
          <motion.div
            key={`prev-${themes[prev].id}`}
            className="hidden md:block flex-shrink-0 opacity-50 transition-opacity duration-300"
            initial={{ x: -50, opacity: 0, scale: 0.75 }}
            animate={{ x: 0, opacity: 0.5, scale: 0.8 }}
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
            className="hidden md:block flex-shrink-0 opacity-50 transition-opacity duration-300"
            initial={{ x: 50, opacity: 0, scale: 0.75 }}
            animate={{ x: 0, opacity: 0.5, scale: 0.8 }}
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
          className="absolute right-2 md:right-4 z-30 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-[#c4a99b]/30"
          onClick={handleNext}
          disabled={isAnimating}
        >
          <ChevronRight className="w-5 h-5 text-[#4a3f3a]" />
        </Button>
      </div>

      {/* Theme Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-[#c4a99b]"
                : "bg-[#c4a99b]/30 hover:bg-[#c4a99b]/50"
            }`}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateRowSlider;
