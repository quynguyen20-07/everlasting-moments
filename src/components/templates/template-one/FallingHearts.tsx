import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorType } from "@/types";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
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

/* ---------- helpers ---------- */
const generateColorPalette = (baseColor?: string) => {
  if (!baseColor || !baseColor.startsWith("#")) {
    return ["#ff3366", "#ff6b9d", "#ff99c2", "#ff4d94", "#ff3380"];
  }
  return [baseColor, "#ff6b9d", "#ff99c2", "#ff4d94"];
};

const isLowEndDevice = () => {
  if (typeof navigator === "undefined") return false;
  return window.innerWidth < 768 || navigator.hardwareConcurrency <= 4;
};

/* ---------- component ---------- */
export default function FallingHearts({
  colors,
  isPlaying = true,
}: FallingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [lowEnd, setLowEnd] = useState(false);

  const heartColors = useMemo(
    () => generateColorPalette(colors?.primary),
    [colors?.primary],
  );

  useEffect(() => {
    setLowEnd(isLowEndDevice());
  }, []);

  const createHeart = useCallback((): Heart => {
    const width = window.innerWidth;

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 80) + 40,
      size: lowEnd ? 18 + Math.random() * 10 : 26 + Math.random() * 22,
      duration: lowEnd ? 5 + Math.random() * 3 : 6 + Math.random() * 5,
      opacity: lowEnd
        ? 0.25 + Math.random() * 0.35
        : 0.35 + Math.random() * 0.45,
      rotation: Math.random() * 360,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      sway: (Math.random() - 0.5) * (lowEnd ? 40 : 80),
      scale: lowEnd ? 0.9 + Math.random() * 0.3 : 1 + Math.random() * 0.35,
    };
  }, [heartColors, lowEnd]);

  /* spawn loop */
  useEffect(() => {
    if (!isPlaying) return;

    const maxHearts = lowEnd ? 8 : 16;
    const interval = setInterval(
      () => {
        setHearts((prev) => {
          if (prev.length >= maxHearts) return prev;
          return [...prev, createHeart()];
        });
      },
      lowEnd ? 800 : 550,
    );

    return () => clearInterval(interval);
  }, [isPlaying, createHeart, lowEnd]);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute will-change-transform"
            initial={{
              x: heart.x,
              y: -heart.size,
              rotate: heart.rotation,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: heart.x + heart.sway,
              y: window.innerHeight + 120,
              rotate: heart.rotation + 360,
              opacity: heart.opacity,
              scale: heart.scale,
            }}
            transition={{
              duration: heart.duration,
              ease: "linear",
            }}
            onAnimationComplete={() => {
              setHearts((prev) => prev.filter((h) => h.id !== heart.id));
            }}
            style={{
              width: heart.size,
              height: heart.size,
            }}
          >
            {/* SVG giữ nguyên – KHÔNG drop-shadow */}
            <svg
              viewBox="0 0 24 24"
              fill={heart.color}
              className="w-full h-full"
              style={{ opacity: heart.opacity }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
