import { ColorScheme, Countdown, CoupleData, TemplateInfo } from "@/types";
import { formatDateStr, formatLunarVietnamese } from "@/lib/utils";
import { Heart, Share2, ShoppingCart, Users } from "lucide-react";
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
};

const TemplateHeroCard: React.FC<CardHeroProps> = ({
  colors,
  coupleData,
  countdown,
  setShowShareModal,
  date,
  onClick,
}) => {
  const formattedDate = formatDateStr(date);
  const lunarDate = formatLunarVietnamese(date);
  const shortDate = formattedDate.split(",")[0];

  return (
    <motion.div
      className="w-[245px] relative overflow-hidden rounded-[3.6rem] hover:rounded-3xl  shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group p-3 m-2"
      style={{
        background: `linear-gradient(135deg, ${colors?.background} 0%, ${colors?.accent}15 100%)`,

        width: "100%",
        maxWidth: "297px",
        height: "607px",
        margin: "0 auto",
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
    >
      {/* Mobile Frame - Visible by default, hidden on hover */}
      <img
        src="/images/mobile-frame.png"
        alt="Mobile Frame"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-20"
      />

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

      <div className="relative z-10 h-full flex flex-col justify-between pt-12 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Names */}
          <h2
            className="font-display text-xl md:text-2xl font-bold  mt-10 mb-3"
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
          <div className="mb-4 flex flex-col gap-1">
            <p
              className="font-serif text-xs tracking-widest"
              style={{ color: colors?.muted }}
            >
              CÙNG BẠN ĐẾN TRỌN ĐỜI
            </p>

            <p
              className="font-display text-md font-semibold"
              style={{ color: colors?.text }}
            >
              {shortDate}
            </p>

            <p
              className="font-display text-md font-normal italic"
              style={{ color: colors?.muted }}
            >
              {`Tức ${lunarDate}`}
            </p>
          </div>

          {/* Avatar Pair */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {/* Bride */}
            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 shadow-lg overflow-hidden"
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
                className="w-4 h-4 md:w-6 md:h-6"
                style={{ color: colors?.primary, fill: colors?.primary }}
              />
            </motion.div>

            {/* Groom */}
            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 shadow-lg overflow-hidden"
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

          {/*Countdown */}
          <div
            className="
            grid grid-cols-4
            gap-1 md:gap-3
            mb-6 "
          >
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
                  className="p-1 rounded-lg backdrop-blur-sm border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${colors?.accent}15 0%, transparent 100%)`,
                    borderColor: `${colors?.primary}15`,
                  }}
                >
                  <div
                    className="font-display text-xs md:text-md  font-bold mb-0.5"
                    style={{ color: colors?.text }}
                  >
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div
                    className="text-[8px] md:text-[10px] font-medium tracking-wide"
                    style={{ color: colors?.muted }}
                  >
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 ">
            <Button
              size="sm"
              className="text-xs gap-3 px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
              size="sm"
              className="text-xs gap-3 px-4 py-3 rounded-full font-semibold backdrop-blur-sm hover:shadow-lg transition-all duration-300"
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

          {/* Hover Buttons */}
          <div
            className="
            absolute bottom-4 left-0 right-0 z-30
            flex justify-center

            opacity-100
            md:opacity-0 md:translate-y-4
            md:group-hover:opacity-100 md:group-hover:translate-y-0

            transition-all duration-300 ease-out
          "
          >
            <div
              className="
              w-full
              relative
              flex items-center justify-center gap-2
              p-2
              bg-white/10
              backdrop-blur-xl
              rounded-2xl
              border border-white/20
              shadow-[0_12px_30px_rgba(0,0,0,0.15),
                      20px_0_40px_rgba(0,0,0,0.12),
                    -20px_0_40px_rgba(0,0,0,0.12)]
            "
            >
              <Button
                variant="secondary"
                size="sm"
                className="
                px-5 py-2.5
                rounded-full font-medium
                transition-all duration-200
                transform hover:-translate-y-1
              "
                onClick={() =>
                  document
                    .getElementById("rsvp")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Users className="w-4 h-4" />
                Xem chi tiết
              </Button>

              <Button
                variant="gold"
                size="sm"
                className="
                text-xs
                gap-2
                px-5 py-2.5
                rounded-full
                font-medium
                transition-all duration-200
                transform hover:-translate-y-1
              "
                onClick={() => setShowShareModal?.(true)}
              >
                <ShoppingCart className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-105" />
                Mua Ngay
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );
};

export default TemplateHeroCard;
