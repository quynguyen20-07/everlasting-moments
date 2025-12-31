import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Wedding } from "@/types/graphql";

interface CountdownSectionProps {
  wedding: Wedding;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownSection({ wedding }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Find the main ceremony event date
  const mainEvent = wedding.weddingDetail?.weddingEvents?.find(
    (e) => e.type === "ceremony" || e.type === "reception"
  );
  const targetDate = mainEvent?.eventDate ? new Date(mainEvent.eventDate) : null;

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) return null;

  const timeUnits = [
    { value: timeLeft.days, label: "Ngày" },
    { value: timeLeft.hours, label: "Giờ" },
    { value: timeLeft.minutes, label: "Phút" },
    { value: timeLeft.seconds, label: "Giây" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-blush-light/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Đếm Ngược Đến Ngày Trọng Đại
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mb-12">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl shadow-soft"
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="font-elegant text-lg text-muted-foreground mt-2">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 font-elegant text-lg text-muted-foreground"
        >
          {targetDate.toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </motion.p>
      </div>
    </section>
  );
}
