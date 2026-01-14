import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
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
}

const TemplateRowSlider = ({
  layout,
  themes,
  countdown,
  onTemplateClick,
}: TemplateRowSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);

  // Card dimensions
  const CARD_WIDTH = 280;
  const CARD_GAP = 24;
  const SIDE_SCALE = 0.75;

  // Motion values for smooth dragging
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  // Get normalized index with infinite loop
  const normalizeIndex = useCallback((index: number) => {
    const total = themes.length;
    return ((index % total) + total) % total;
  }, [themes.length]);

  // Get visible indices (5 items: -2, -1, 0, 1, 2 positions)
  const getVisibleIndices = useCallback(() => {
    const total = themes.length;
    return [-2, -1, 0, 1, 2].map(offset => normalizeIndex(activeIndex + offset));
  }, [activeIndex, normalizeIndex, themes.length]);

  const handleSlide = useCallback((direction: number) => {
    setActiveIndex(prev => normalizeIndex(prev + direction));
  }, [normalizeIndex]);

  // Click on side items to center them
  const handleItemClick = useCallback((clickedIndex: number) => {
    const visibleIndices = getVisibleIndices();
    const positions = [-2, -1, 0, 1, 2];
    
    const positionIndex = visibleIndices.indexOf(clickedIndex);
    if (positionIndex !== -1) {
      const offset = positions[positionIndex];
      if (offset !== 0) {
        setActiveIndex(prev => normalizeIndex(prev + offset));
      } else {
        // Center item clicked - trigger template click
        onTemplateClick(getTemplate(themes[clickedIndex]).id);
      }
    }
  }, [getVisibleIndices, normalizeIndex, themes, onTemplateClick]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragStartIndex.current = activeIndex;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    x.set(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    x.set(deltaX);
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const currentX = x.get();
    const threshold = CARD_WIDTH / 3;
    
    if (Math.abs(currentX) > threshold) {
      const direction = currentX > 0 ? -1 : 1;
      const steps = Math.round(Math.abs(currentX) / (CARD_WIDTH + CARD_GAP));
      const actualSteps = Math.max(1, Math.min(steps, 2));
      setActiveIndex(prev => normalizeIndex(prev + direction * actualSteps));
    }
    
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  const visibleIndices = getVisibleIndices();
  const positions = [-2, -1, 0, 1, 2];

  const getColors = (theme: TemplateTheme) => {
    return COLOR_SCHEMES[theme.id as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;
  };

  const getTemplate = (theme: TemplateTheme) => {
    return createWeddingTemplate(layout, theme);
  };

  // Calculate position and scale for each item
  const getItemStyle = (position: number) => {
    const isCenter = position === 0;
    const scale = isCenter ? 1 : SIDE_SCALE;
    const offsetX = position * (CARD_WIDTH * SIDE_SCALE + CARD_GAP);
    const zIndex = 10 - Math.abs(position);
    const opacity = Math.abs(position) <= 1 ? (isCenter ? 1 : 0.7) : 0.4;
    
    return { scale, offsetX, zIndex, opacity };
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
          onClick={() => handleSlide(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Cards Container with Drag */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center overflow-hidden px-12 md:px-16 py-8 cursor-grab active:cursor-grabbing select-none"
          style={{ 
            width: '100%',
            minHeight: '500px'
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Cards */}
          <div className="relative flex items-center justify-center" style={{ width: CARD_WIDTH, height: 'auto' }}>
            {positions.map((position, idx) => {
              const themeIndex = visibleIndices[idx];
              const theme = themes[themeIndex];
              const { scale, offsetX, zIndex, opacity } = getItemStyle(position);
              const isCenter = position === 0;
              
              // Hide far items on mobile
              const hideOnMobile = Math.abs(position) > 1;
              
              return (
                <motion.div
                  key={`${layout.id}-${theme.id}-${position}`}
                  className={`absolute ${hideOnMobile ? 'hidden md:block' : ''}`}
                  style={{
                    x: springX,
                    zIndex,
                  }}
                  initial={false}
                  animate={{
                    x: offsetX,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDragging.current) {
                      handleItemClick(themeIndex);
                    }
                  }}
                >
                  <div 
                    className={`transition-shadow duration-300 ${isCenter ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}
                    style={{ 
                      pointerEvents: isCenter ? 'auto' : 'auto',
                    }}
                  >
                    <TemplateHeroCard
                      colors={getColors(theme)}
                      template={getTemplate(theme)}
                      coupleData={coupleData}
                      countdown={countdown}
                      date="2026-01-08T10:00:00Z"
                      onClick={() => {
                        if (isCenter) {
                          onTemplateClick(getTemplate(theme).id);
                        } else {
                          handleItemClick(themeIndex);
                        }
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-30 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
          onClick={() => handleSlide(1)}
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
              const diff = index - activeIndex;
              if (diff !== 0) {
                setActiveIndex(index);
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
            backgroundColor: `hsl(${themes[activeIndex].primaryHsl} / 0.15)`,
            color: `hsl(${themes[activeIndex].primaryHsl})`,
          }}
        >
          {themes[activeIndex].name}
        </span>
      </div>
    </div>
  );
};

export default TemplateRowSlider;
