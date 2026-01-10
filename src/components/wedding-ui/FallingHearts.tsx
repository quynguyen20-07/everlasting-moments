import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorType } from "@/types";

interface Heart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  rotation: number;
  color: string;
  sway: number;
  scale: number;
}

interface FallingHeartsProps {
  colors?: ColorType;
  isPlaying?: boolean;
}

// Helper function đơn giản để tạo màu
const generateColorPalette = (baseColor?: string) => {
  if (!baseColor || !baseColor.startsWith("#")) {
    return ["#ff3366", "#ff6b9d", "#ff99c2", "#ff4d94", "#ff3380"];
  }

  try {
    // Tạo các biến thể đơn giản bằng cách thay đổi độ sáng
    const colors = [baseColor];

    // Thêm màu sáng hơn
    colors.push(
      baseColor.replace(/\d+/g, (match) => {
        const num = parseInt(match);
        return Math.min(255, num + 40).toString();
      })
    );

    // Thêm màu tối hơn
    colors.push(
      baseColor.replace(/\d+/g, (match) => {
        const num = parseInt(match);
        return Math.max(0, num - 40).toString();
      })
    );

    return [...colors, "#ff99c2", "#ff4d94"];
  } catch {
    return ["#ff3366", "#ff6b9d", "#ff99c2", "#ff4d94", "#ff3380"];
  }
};

const FallingHearts = ({ colors, isPlaying = true }: FallingHeartsProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Tạo palette màu đơn giản
  const heartColors = useMemo(() => {
    return generateColorPalette(colors?.primary);
  }, [colors?.primary]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const createHeart = useCallback(
    (id: number, customX?: number): Heart => {
      const screenWidth = window.innerWidth;
      return {
        id,
        x: customX ?? Math.random() * (screenWidth - 100) + 50,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 6,
        size: isMobile ? 16 + Math.random() * 12 : 24 + Math.random() * 24,
        opacity: 0.15 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        sway: (Math.random() - 0.5) * 100,
        scale: 0.8 + Math.random() * 0.4,
      };
    },
    [isMobile, heartColors]
  );

  useEffect(() => {
    if (!isPlaying) return;

    // Initial hearts
    const initialHearts = Array.from({ length: isMobile ? 6 : 12 }, (_, i) =>
      createHeart(i)
    );
    setHearts(initialHearts);

    // Add hearts interval
    const interval = setInterval(() => {
      if (!isPlaying) return;

      const newId = Date.now() + Math.random();
      const newHeart = createHeart(newId);
      setHearts((prev) => {
        const maxHearts = isMobile ? 15 : 25;
        if (prev.length >= maxHearts) {
          return [...prev.slice(1), newHeart];
        }
        return [...prev, newHeart];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, createHeart, isMobile]);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            initial={{
              x: heart.x,
              y: -heart.size,
              rotate: heart.rotation,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: heart.x + heart.sway,
              y: window.innerHeight + 100,
              rotate: heart.rotation + 720,
              opacity: [0, heart.opacity, heart.opacity, 0],
              scale: [0, heart.scale, heart.scale * 0.9, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              x: {
                duration: heart.duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
              y: {
                duration: heart.duration,
                ease: "linear",
                repeat: Infinity,
              },
              rotate: {
                duration: heart.duration * 0.8,
                ease: "linear",
                repeat: Infinity,
              },
              opacity: {
                times: [0, 0.1, 0.8, 1],
                duration: heart.duration,
                repeat: Infinity,
              },
              scale: {
                times: [0, 0.2, 0.8, 1],
                duration: heart.duration,
                repeat: Infinity,
              },
            }}
            style={{
              left: 0,
              width: heart.size,
              height: heart.size,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={heart.color}
              style={{ opacity: heart.opacity }}
              className="w-full h-full"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingHearts;
