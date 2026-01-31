import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";
import { motion } from "framer-motion";

export type ITimeCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownProps = {
  targetTime: string;
  colors?: {
    primary?: string;
    accent?: string;
    text?: string;
    muted?: string;
  };
};

const WeddingCountdown = ({ targetTime, colors }: CountdownProps) => {
  const targetDate = new Date(targetTime);

  const [countdown, setCountdown] = useState<ITimeCountdown>(() =>
    getCountdown(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto my-6 px-6">
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
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <div
            className="
              p-2 md:p-4
              rounded-2xl
              backdrop-blur-md
              border
              shadow-lg
              transition-all duration-300
              hover:scale-105
            "
            style={{
              background: `linear-gradient(135deg, ${
                colors?.accent ?? "#ffffff"
              }20 0%, white/10 100%)`,
              borderColor: `${colors?.primary ?? "#ffffff"}20`,
            }}
          >
            {/* Number */}
            <div
              className="
                font-['Playfair_Display']
                font-normal
                text-[32px]
                leading-[52px]
                text-center
                mb-1
              "
              style={{ color: colors?.text ?? "#000" }}
            >
              {item.value.toString().padStart(2, "0")}
            </div>

            {/* Label */}
            <div
              className="
                font-['Playfair_Display']
                font-normal
                text-[13px]
                leading-[14px]
                text-center
              "
              style={{ color: colors?.muted ?? "#666" }}
            >
              {item.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeddingCountdown;
