import { motion } from "framer-motion";
import type { Wedding } from "@/types/graphql";

interface FooterSectionProps {
  wedding: Wedding;
}

export function FooterSection({ wedding }: FooterSectionProps) {
  const bride = wedding.weddingDetail?.bride;
  const groom = wedding.weddingDetail?.groom;
  const mainEvent = wedding.weddingDetail?.weddingEvents?.find(
    (e) => e.type === "ceremony" || e.type === "reception"
  );

  return (
    <footer className="py-16 px-4 bg-gradient-to-b from-background to-muted/30 invitation-pattern">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Heart decoration */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-champagne" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-8 h-8 text-dusty-rose" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-champagne" />
          </div>

          {/* Couple names */}
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            {groom?.fullName || "Chú Rể"} & {bride?.fullName || "Cô Dâu"}
          </h2>

          {/* Date */}
          {mainEvent?.eventDate && (
            <p className="font-elegant text-lg text-muted-foreground mb-2">
              {new Date(mainEvent.eventDate).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {/* Location */}
          {mainEvent?.address && (
            <p className="font-elegant text-muted-foreground/80 mb-8">
              {mainEvent.address}
            </p>
          )}

          {/* Thank you message */}
          <p className="font-elegant text-lg text-foreground mb-2">
            Cảm ơn bạn đã ghé thăm!
          </p>
          <p className="font-elegant text-muted-foreground italic">
            "Hai trái tim một cuộc đời"
          </p>

          {/* Divider */}
          <div className="my-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground/60">
            Được tạo với 💕 bởi WeddingInvite
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
