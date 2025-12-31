import { ChevronDown, Heart, Sparkles, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

import ShareModal from "./ShareModal";

interface HeroSectionProps {
  template: unknown;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  coupleData: {
    bride: { name: string; fullName: string };
    groom: { name: string; fullName: string };
  };
}

const HeroSection = ({
  template,
  colors,
  countdown,
  coupleData,
}: HeroSectionProps) => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent}20 100%)`,
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: colors.primary }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: colors.secondary }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Template Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-12 shadow-lg"
            >
              <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
              <span
                className="text-sm font-semibold tracking-wider"
                style={{ color: colors.text }}
              >
                {(template as { name: string }).name}
              </span>
            </motion.div>

            {/* Names */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="inline-block" style={{ color: colors.primary }}>
                {coupleData.bride.name}
              </span>
              <span className="mx-4 md:mx-8" style={{ color: colors.muted }}>
                &
              </span>
              <span className="inline-block" style={{ color: colors.primary }}>
                {coupleData.groom.name}
              </span>
            </h1>

            {/* Date */}
            <div className="mb-12">
              <p
                className="font-serif text-xl md:text-2xl tracking-widest mb-2"
                style={{ color: colors.muted }}
              >
                CÙNG BẠN ĐẾN TRỌN ĐỜI
              </p>
              <p
                className="font-display text-3xl md:text-4xl font-semibold"
                style={{ color: colors.text }}
              >
                14 Tháng 2, 2025
              </p>
            </div>

            {/* Decorative Hearts */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-xl"
                style={{
                  borderColor: `${colors.primary}30`,
                  background: `linear-gradient(135deg, ${colors.accent} 0%, white 100%)`,
                }}
              />
              <Heart
                className="w-10 h-10 md:w-14 md:h-14 animate-pulse"
                style={{ color: colors.primary, fill: colors.primary }}
              />
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-xl"
                style={{
                  borderColor: `${colors.primary}30`,
                  background: `linear-gradient(135deg, white 0%, ${colors.accent} 100%)`,
                }}
              />
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-16">
              {[
                { value: countdown.days, label: "NGÀY" },
                { value: countdown.hours, label: "GIỜ" },
                { value: countdown.minutes, label: "PHÚT" },
                { value: countdown.seconds, label: "GIÂY" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <div
                    className="p-4 md:p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}20 0%, white/10 100%)`,
                      borderColor: `${colors.primary}20`,
                    }}
                  >
                    <div
                      className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div
                      className="text-xs md:text-sm font-medium tracking-wider"
                      style={{ color: colors.muted }}
                    >
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="gap-3 px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  color: "white",
                }}
                onClick={() =>
                  document
                    .getElementById("rsvp")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Users className="w-5 h-5" />
                Xác Nhận Tham Dự
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-3 px-8 py-6 rounded-full font-semibold backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: `${colors.accent}10`,
                }}
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-5 h-5" />
                Chia Sẻ
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown
                className="w-8 h-8"
                style={{ color: colors.primary }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ShareModal
        colors={colors}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
};

export default HeroSection;
