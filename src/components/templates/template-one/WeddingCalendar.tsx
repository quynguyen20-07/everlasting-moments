import { motion } from "framer-motion";
import { Heart } from "lucide-react";

type WeddingCalendarProps = {
  date: Date;
};

const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const WeddingCalendar = ({ date }: WeddingCalendarProps) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const activeDay = date.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday start (chuẩn VN)
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  return (
    <div
      className="
        w-full
        max-w-[420px]
        mx-auto
        bg-white
        px-6
        pt-12
        pb-6
        text-center
        font-['Playfair_Display']
      "
    >
      {/* Month */}
      <div className="mb-6">
        <h2
          className="
          font-['Aleo']
          font-normal
          text-[16px]
          leading-[22px]
          tracking-[0.1em]
          text-gray-800
          uppercase
        "
        >
          Tháng {month + 1}
        </h2>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 text-sm mb-3">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className={`font-medium ${
              d === "CN" ? "text-red-500" : "text-gray-700"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-b mb-4" />

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-4 text-base">
        {/* Empty cells */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isActive = day === activeDay;

          return (
            <div key={day} className="flex justify-center items-center">
              {isActive ? (
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center justify-center"
                >
                  <Heart className="w-7 h-7 text-red-500 fill-red-500 translate-y-[2px]" />
                  <span className="absolute text-white text-xs font-semibold">
                    {day}
                  </span>
                </motion.div>
              ) : (
                <span className="text-gray-800">{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeddingCalendar;
