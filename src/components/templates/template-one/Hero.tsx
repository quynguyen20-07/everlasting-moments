import { formatDateStr, formatLunarVietnamese } from "@/lib/utils";
import ImageLightbox from "@/components/ui/image-lightbox";
import { ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Bride, Groom } from "@/types";

export type CoupleData = {
  bride: Bride;
  groom: Groom;
};

export type HeroProps = {
  coupleData: CoupleData;
  date: string;
};

const Hero: React.FC<HeroProps> = ({ coupleData, date }) => {
  /** =============================
   *  LIGHTBOX STATE (THÊM)
   *  ============================= */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(
    () => [
      {
        id: "Chú Rể",
        url:
          coupleData.groom?.avatar ||
          "https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769859331/Vowly/ql1zux8ckf7nhtxd5ckm.jpg",
      },
      {
        id: "Cô Dâu",
        url:
          coupleData.bride?.avatar ||
          "https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769859331/Vowly/cenqoxr172ilzqrzjwsz.jpg",
      },
    ],
    [coupleData],
  );

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="
        relative min-h-screen flex items-center justify-center overflow-hidden
        bg-cover
        bg-[position:calc(50%+1.5rem)_center]
        md:bg-center
      "
        style={{
          backgroundImage: `url('https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769889755/Vowly/cfxvg8jghatc0wnugocy.jpg')`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-white to-transparent" />

        <div className="absolute bottom-0 container mx-auto px-4 z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-['Great_Vibes'] text-[48px] leading-[64px] mb-4"
              style={{
                color: "#000",
                textShadow: "0 2px 8px rgba(255,255,255,0.85)",
              }}
            >
              Ngày Chung Đôi
            </h1>

            <h1
              className="font-['Aleo'] text-[22px] leading-[48px]"
              style={{
                color: "#000",
                textShadow: "0 2px 8px rgba(255,255,255,0.8)",
              }}
            >
              <span>{coupleData.bride?.fullName}</span>
              <span className="mx-4">&</span>
              <span>{coupleData.groom?.fullName}</span>
            </h1>

            <p
              className="font-['Aleo'] text-[24px] leading-[48px]"
              style={{
                color: "#000",
                textShadow: "0 2px 8px rgba(255,255,255,0.8)",
              }}
            >
              {formatDateStr(date)}
            </p>

            <p
              className="font-['Aleo'] italic text-[14px] md:text-[20px]"
              style={{ color: "#667085" }}
            >
              {`Tức Ngày ${formatLunarVietnamese(date)}`}
            </p>
          </motion.div>

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
              <ChevronDown className="w-8 h-8" style={{ color: "#efc7ba" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= COUPLE ================= */}
      <section
        className="
        relative w-full min-h-[520px]
        bg-cover bg-center overflow-hidden
        py-16 md:py-24 flex items-center justify-center
      "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12), rgba(255,255,255,0.12)),
            url('https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769858874/Vowly/xotpnc3jqzvyjiuzn3g8.png')
          `,
        }}
      >
        <div className="absolute bottom-0 container mx-auto px-4 z-10 text-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-['Aleo'] text-[20px] mb-4 mt-8">
              KHI HAI TRÁI TIM CHUNG MỘT NHỊP ĐẬP
            </h1>

            <span className="inline-block mb-4 text-[14px]">
              Họ cùng nhau tạo nên một tâm hồn vĩnh cửu
            </span>

            <div className="px-4 mt-4 mb-12">
              <div className="flex items-center justify-center gap-3 md:gap-6">
                {/* Groom */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
                  transition={{
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 },
                    y: { duration: 4, repeat: Infinity },
                  }}
                  whileHover={{ scale: 1.05, y: 0 }}
                  onClick={() => setActiveIndex(0)}
                  className="
                  relative cursor-pointer
                  w-[calc(50vw-1rem)] h-[calc(65vw-1rem)]
                  max-w-[176px] max-h-[250px]
                  md:w-56 md:h-80
                  rounded-t-[2.5rem] rounded-b-lg
                  shadow-xl overflow-hidden bg-white
                "
                >
                  <img
                    src={images[0].url}
                    alt="Chú Rể"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>

                {/* Bride */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 },
                    y: { duration: 4, repeat: Infinity },
                  }}
                  whileHover={{ scale: 1.05, y: 0 }}
                  onClick={() => setActiveIndex(1)}
                  className="
                  relative cursor-pointer
                  w-[calc(50vw-1rem)] h-[calc(65vw-1rem)]
                  max-w-[176px] max-h-[250px]
                  md:w-56 md:h-80
                  rounded-t-[2.5rem] rounded-b-lg
                  shadow-xl overflow-hidden bg-white
                "
                >
                  <img
                    src={images[1].url}
                    alt="Cô Dâu"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ✅ IMAGE LIGHTBOX */}
        <ImageLightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      </section>
    </>
  );
};

export default Hero;
