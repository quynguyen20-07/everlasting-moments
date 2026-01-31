import { formatDateStr, formatLunarVietnamese } from "@/lib/utils";
import { Bride, ColorScheme, Countdown, Groom } from "@/types";
import { ChevronDown } from "lucide-react";
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
    <>
      <section
        className="
      relative min-h-screen flex items-center justify-center overflow-hidden
      bg-cover
      bg-[position:calc(50%+3.5rem)_center]
      md:bg-center
    "
        style={{
          backgroundImage: `
        linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
        url('https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769856287/Vowly/uawkfojulqisc555gaqt.jpg')
      `,
        }}
      >
        <div className="absolute bottom-0  container  mx-auto px-4  z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-['Great_Vibes'] font-normal text-[55px] leading-[64px] tracking-[0px] text-center text-white mb-4">
              Save The Day
            </h1>

            {/* Names - Modern Typography */}
            <h1
              className="
            font-['Aleo']
            font-normal
            text-[22px]
            leading-[48px]
            tracking-[0px]
            align-middle
            text-center
          "
            >
              <span
                className="inline-block align-middle"
                style={{ color: "#fff" }}
              >
                {coupleData.bride?.fullName}
              </span>

              <span className="mx-4 align-middle" style={{ color: "#fff" }}>
                &
              </span>

              <span
                className="inline-block align-middle"
                style={{ color: "#fff" }}
              >
                {coupleData.groom?.fullName}
              </span>
            </h1>

            <p
              className="
              font-['Aleo']
              font-normal
              text-[18px]
              tracking-[0px]
              align-middle
            "
              style={{ color: "#fff" }}
            >
              {formatDateStr(date)}
            </p>
            <p
              className="
              font-['Aleo']
              font-normal
              text-[11px]
              md:text-[20px]
              tracking-[0px]
              align-middle
              italic
            "
              style={{ color: "#efc7ba" }}
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
      <section
        className="
        relative
        w-full
        h-[520px]
        md:w-[446px]
        md:h-[476px]
        md:left-[-12px]
        md:top-[801px]
        bg-cover
        overflow-hidden
        pt-10
      "
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
          url('https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769858874/Vowly/xotpnc3jqzvyjiuzn3g8.png')
        `,
        }}
      >
        <div className="absolute bottom-0  container mx-auto px-4  z-10 text-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="
              font-['Aleo']
              font-normal
              text-[20px]
              leading-[48px]
              tracking-[0px]
              text-center
              text-[#000000]
              mb-4
              mt-8
            "
            >
              WHEN TWO HEARTS BEAT AS ONE
            </h1>

            <span
              className="inline-block align-middle mb-4"
              style={{ color: "#000000" }}
            >
              They create a soul strong enough to last forever
            </span>

            <div className="px-4 mt-4 mb-12">
              <div className="flex items-center justify-center gap-3 md:gap-6">
                {/* Bride */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="
                  relative
                  w-[calc(50vw-1rem)]
                  h-[calc(65vw-1rem)]
                  max-w-[190px]
                  max-h-[260px]
                  md:w-56 md:h-80
                  rounded-t-[2.5rem]
                  rounded-b-lg
                  shadow-xl
                  overflow-hidden
                  flex-shrink-0
                  bg-white
                "
                >
                  <motion.img
                    src="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769859331/Vowly/cenqoxr172ilzqrzjwsz.jpg"
                    alt="Cô dâu"
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Groom */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="
                  relative
                  w-[calc(50vw-1rem)]
                  h-[calc(65vw-1rem)]
                  max-w-[190px]
                  max-h-[260px]
                  md:w-56 md:h-80
                  rounded-t-[2.5rem]
                  rounded-b-lg
                  shadow-xl
                  overflow-hidden
                  flex-shrink-0
                  bg-white
                "
                >
                  <motion.img
                    src="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769859331/Vowly/ql1zux8ckf7nhtxd5ckm.jpg"
                    alt="Chú Rể"
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
