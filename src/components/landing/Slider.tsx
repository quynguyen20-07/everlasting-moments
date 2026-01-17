import { useState, useEffect, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface SliderProps {
  children: ReactNode[];
  itemsPerView?: number;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
}

const Slider = ({
  children,
  itemsPerView = 4,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Cập nhật chiều cao của tất cả items
  useEffect(() => {
    const updateHeights = () => {
      const heights = itemRefs.current
        .filter(Boolean)
        .map((ref) => ref?.offsetHeight || 0);

      if (heights.length > 0) {
        setItemHeights(heights);
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, [children]);

  // Lấy chiều cao lớn nhất
  const maxHeight = itemHeights.length > 0 ? Math.max(...itemHeights) : 0;

  // Tự động chuyển slide
  useEffect(() => {
    if (autoPlayInterval > 0) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, autoPlayInterval]);

  const nextSlide = () => {
    if (isAnimating || totalItems <= itemsPerView) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating || totalItems <= itemsPerView) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex(Math.min(index, maxIndex));
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      {showNavigation && totalItems > itemsPerView && (
        <>
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Slider Container */}
      <div className="overflow-hidden px-2 py-8">
        <motion.div
          className="flex gap-6"
          initial={false}
          animate={{
            x: `-${currentIndex * (100 / itemsPerView)}%`,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="flex-shrink-0"
              style={{
                width: `${100 / itemsPerView}%`,
                height: maxHeight > 0 ? `${maxHeight}px` : "auto",
                minHeight: "280px", // Chiều cao tối thiểu
              }}
            >
              <div className="h-full">{child}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      {showIndicators && totalItems > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
