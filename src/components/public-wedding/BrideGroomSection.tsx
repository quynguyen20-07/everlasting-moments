import { motion } from "framer-motion";
import type { Wedding } from "@/types/graphql";

interface BrideGroomSectionProps {
  wedding: Wedding;
}

export function BrideGroomSection({ wedding }: BrideGroomSectionProps) {
  const bride = wedding.weddingDetail?.bride;
  const groom = wedding.weddingDetail?.groom;

  if (!bride && !groom) return null;

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Cô Dâu & Chú Rể
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        {/* Couple cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-champagne-light shadow-elegant mx-auto">
                {groom?.avatar ? (
                  <img
                    src={groom.avatar}
                    alt={groom.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-champagne-light to-muted flex items-center justify-center">
                    <svg className="w-20 h-20 text-champagne" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 border-2 border-champagne/30 rounded-full" />
              <div className="absolute -inset-4 border border-champagne/20 rounded-full" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              {groom?.fullName || "Chú Rể"}
            </h3>
            
            {groom?.shortBio && (
              <p className="font-elegant text-muted-foreground mb-4 max-w-sm mx-auto">
                {groom.shortBio}
              </p>
            )}

            {groom?.familyInfo && (
              <div className="text-sm text-muted-foreground/80 italic">
                {groom.familyInfo}
              </div>
            )}
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blush shadow-elegant mx-auto">
                {bride?.avatar ? (
                  <img
                    src={bride.avatar}
                    alt={bride.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blush-light to-muted flex items-center justify-center">
                    <svg className="w-20 h-20 text-dusty-rose" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 border-2 border-blush/30 rounded-full" />
              <div className="absolute -inset-4 border border-blush/20 rounded-full" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              {bride?.fullName || "Cô Dâu"}
            </h3>
            
            {bride?.shortBio && (
              <p className="font-elegant text-muted-foreground mb-4 max-w-sm mx-auto">
                {bride.shortBio}
              </p>
            )}

            {bride?.familyInfo && (
              <div className="text-sm text-muted-foreground/80 italic">
                {bride.familyInfo}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
