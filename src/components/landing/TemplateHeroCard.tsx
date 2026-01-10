import {
  ChevronDown,
  Flower2,
  Gem,
  Heart,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { ColorScheme, Countdown, CoupleData, TemplateInfo } from "@/types";
import { formatDateStr, formatLunarVietnamese } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type CardHeroProps = {
  colors: ColorScheme;
  template: TemplateInfo;
  coupleData: CoupleData;
  countdown: Countdown;
  date: string;
  setShowShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
  compact?: boolean;
};

const TemplateHeroCard: React.FC<CardHeroProps> = ({
  colors,
  template,
  coupleData,
  countdown,
  setShowShareModal,
  date,
  onClick,
  compact = false,
}) => {
  const formattedDate = formatDateStr(date);
  const lunarDate = formatLunarVietnamese(date);

  const shortDate = formattedDate.split(",")[0];

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group"
      style={{
        background: `linear-gradient(135deg, ${colors?.background} 0%, ${colors?.accent}15 100%)`,
        height: compact ? "400px" : "500px",
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: colors?.primary }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: colors?.secondary }}
        />
      </div>

      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Template Name Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-4 border border-white/30">
            <Sparkles className="w-3 h-3" style={{ color: colors?.primary }} />
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: colors?.text }}
            >
              {template.name}
            </span>
          </div>

          {/* Names */}
          <h2
            className="font-display text-2xl md:text-3xl font-bold mb-3"
            style={{ color: colors?.text }}
          >
            <span style={{ color: colors?.primary }}>
              {coupleData.bride.name}
            </span>
            <span className="mx-2" style={{ color: colors?.muted }}>
              &
            </span>
            <span style={{ color: colors?.primary }}>
              {coupleData.groom.name}
            </span>
          </h2>

          {/* Date Display */}
          <div className="mb-4">
            <p
              className="font-serif text-xs tracking-widest mb-1"
              style={{ color: colors?.muted }}
            >
              CÙNG BẠN ĐẾN TRỌN ĐỜI
            </p>
            <p
              className="font-display text-lg font-semibold mb-1"
              style={{ color: colors?.text }}
            >
              {shortDate}
            </p>
            <p
              className="font-display text-sm font-normal italic"
              style={{ color: colors?.muted }}
            >
              {`Tức ${lunarDate}`}
            </p>
          </div>

          {/* Avatar Pair */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Bride */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 shadow-lg overflow-hidden"
              style={{ borderColor: `${colors?.primary}30` }}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, ${colors?.accent}25 0%, white 60%)`,
                }}
              />
              <motion.img
                src="/images/co-dau.webp"
                alt="Cô dâu"
                className="absolute inset-0 w-full h-full object-cover z-10"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Heart */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-5 h-5 md:w-6 md:h-6"
                style={{ color: colors?.primary, fill: colors?.primary }}
              />
            </motion.div>

            {/* Groom */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 shadow-lg overflow-hidden"
              style={{ borderColor: `${colors?.primary}30` }}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, white 0%, ${colors?.accent}25 100%)`,
                }}
              />
              <motion.img
                src="/images/chu-re.webp"
                alt="Chú Rể"
                className="absolute inset-0 w-full h-full object-cover z-10"
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Compact Countdown - Ẩn trên mobile khi compact */}
          {!compact && (
            <div className="hidden md:grid grid-cols-4 gap-2 mb-4">
              {[
                { value: countdown.days, label: "NGÀY" },
                { value: countdown.hours, label: "GIỜ" },
                { value: countdown.minutes, label: "PHÚT" },
                { value: countdown.seconds, label: "GIÂY" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="p-2 rounded-xl backdrop-blur-sm border border-white/20"
                    style={{
                      background: `linear-gradient(135deg, ${colors?.accent}15 0%, transparent 100%)`,
                      borderColor: `${colors?.primary}15`,
                    }}
                  >
                    <div
                      className="font-display text-lg font-bold mb-0.5"
                      style={{ color: colors?.text }}
                    >
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div
                      className="text-[10px] font-medium tracking-wide"
                      style={{ color: colors?.muted }}
                    >
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Button */}
          <Button
            size="sm"
            className="gap-2 px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 w-full"
            style={{
              background: `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`,
              color: "white",
            }}
          >
            <Users className="w-3.5 h-3.5" />
            Xem Mẫu
          </Button>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );
};

export default TemplateHeroCard;
