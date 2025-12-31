import { motion } from "framer-motion";
import type { Wedding } from "@/types/graphql";

interface HeroSectionProps {
  wedding: Wedding;
}

export function HeroSection({ wedding }: HeroSectionProps) {
  const bride = wedding.weddingDetail?.bride;
  const groom = wedding.weddingDetail?.groom;
  
  // Find the main ceremony event date
  const mainEvent = wedding.weddingDetail?.weddingEvents?.find(
    (e) => e.type === "ceremony" || e.type === "reception"
  );
  const eventDate = mainEvent?.eventDate 
    ? new Date(mainEvent.eventDate) 
    : null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden invitation-pattern">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blush/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-champagne-light/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-gold/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-elegant text-lg md:text-xl text-muted-foreground mb-4"
        >
          Trân trọng kính mời
        </motion.p>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground">
            <span className="text-gradient-gold">{groom?.fullName || "Chú Rể"}</span>
          </h1>
          
          {/* Heart divider */}
          <div className="flex items-center justify-center my-4 gap-4">
            <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-champagne" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-8 h-8 text-dusty-rose" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
            <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-champagne" />
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground">
            <span className="text-gradient-gold">{bride?.fullName || "Cô Dâu"}</span>
          </h1>
        </motion.div>

        {/* Wedding title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-elegant text-xl md:text-2xl text-muted-foreground mb-8"
        >
          {wedding.title}
        </motion.p>

        {/* Date */}
        {eventDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block"
          >
            <div className="glass-card px-8 py-4 rounded-2xl">
              <p className="font-display text-2xl md:text-3xl text-primary font-medium">
                {eventDate.toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm font-elegant">Cuộn xuống</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
