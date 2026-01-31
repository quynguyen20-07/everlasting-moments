import { ChevronDown, Flower2, Gem, Heart, Share2, Users } from "lucide-react";
import { Bride, ColorScheme, Countdown, Groom, TemplateInfo } from "@/types";
import { formatDateStr, formatLunarVietnamese } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type CoupleData = {
  bride: Bride;
  groom: Groom;
};

export type HeroProps = {
  colors: ColorScheme;
  coupleData: CoupleData;
  countdown: Countdown;
  date: string;
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Hero: React.FC<HeroProps> = ({
  colors,
  coupleData,
  countdown,
  setShowShareModal,
  date,
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors?.background} 0%, ${colors?.accent}20 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-2xl opacity-20 blur-3xl"
          style={{ background: colors?.primary }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-2xl opacity-10 blur-3xl"
          style={{ background: colors?.secondary }}
        />

        {/* Floral Elements */}
        <div className="absolute top-5 left-5 md:top-10 md:left-10 opacity-10">
          <Flower2
            className="w-20 h-20 md:w-32 md:h-32"
            style={{ color: colors?.primary }}
          />
        </div>
        <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 opacity-10">
          <Gem
            className="w-20 h-20 md:w-32 md:h-32"
            style={{ color: colors?.secondary }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Names - Modern Typography */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="inline-block" style={{ color: colors?.primary }}>
              {coupleData.bride?.fullName}
            </span>
            <span className="mx-4 md:mx-8" style={{ color: colors?.muted }}>
              &
            </span>
            <span className="inline-block" style={{ color: colors?.primary }}>
              {coupleData.groom?.fullName}
            </span>
          </h1>

          {/* Date with elegant typography */}
          <div className="mb-12">
            <p
              className="font-serif text-xl md:text-2xl tracking-widest mb-2"
              style={{ color: colors?.muted }}
            >
              CÙNG BẠN ĐẾN TRỌN ĐỜI
            </p>
            <p
              className="font-display text-3xl md:text-4xl font-semibold"
              style={{ color: colors?.text }}
            >
              {formatDateStr(date)}
            </p>
            <p
              className="font-display text-base md:text-lg font-normal italic"
              style={{ color: colors?.text }}
            >
              {`Tức Ngày ${formatLunarVietnamese(date)}`}
            </p>
          </div>

          {/* Decorative Hearts */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              className="
                relative
                w-32 h-32
                md:w-48 md:h-48
                rounded-full
                border-4
                shadow-xl
                overflow-hidden
                flex-shrink-0
                "
              style={{ borderColor: `${colors?.primary}30` }}
            >
              {/* Gradient UNDER image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, ${colors?.accent}25 0%, white 60%)`,
                }}
              />

              {/* Image */}
              <motion.img
                src={coupleData.bride?.avatar || "/heart.svg"}
                alt="Cô dâu"
                className="absolute inset-0 w-full h-full object-cover z-10"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>

            {/* Heart */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-10 h-10 md:w-14 md:h-14"
                style={{ color: colors?.primary, fill: colors?.primary }}
              />
            </motion.div>

            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              className="
                relative
                w-32 h-32
                md:w-48 md:h-48
                rounded-full
                border-4
                shadow-xl
                overflow-hidden
                flex-shrink-0
              "
              style={{ borderColor: `${colors?.primary}30` }}
            >
              {/* Gradient UNDER image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(135deg, white 0%, ${colors?.accent}25 100%)`,
                }}
              />

              {/* Image */}
              <motion.img
                src={coupleData.groom?.avatar || "/heart.svg"}
                alt="Chú Rể"
                className="absolute inset-0 w-full h-full object-cover z-10"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
            </motion.div>
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
                    background: `linear-gradient(135deg, ${colors?.accent}20 0%, white/10 100%)`,
                    borderColor: `${colors?.primary}20`,
                  }}
                >
                  <div
                    className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                    style={{ color: colors?.text }}
                  >
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div
                    className="text-xs md:text-sm font-medium tracking-wider"
                    style={{ color: colors?.muted }}
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
              className="gap-3 px-8 py-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`,
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
              className="gap-3 px-8 py-6 rounded-2xl font-semibold backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              style={{
                borderColor: colors?.primary,
                color: colors?.primary,
                background: `${colors?.accent}10`,
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
              style={{ color: colors?.primary }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
