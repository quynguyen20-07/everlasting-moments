import { motion } from "framer-motion";

export default function FogRevealHero({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Content */}
      <div className="relative z-30">{children}</div>

      {/* Fog LEFT */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100vw" }}
        transition={{ duration: 2.8, ease: "easeInOut" }}
        className="
          pointer-events-none
          absolute inset-y-0 left-0 w-1/2
          bg-gradient-to-r from-pink-300 via-pink-200 to-transparent
          blur-[120px] z-20
        "
      />

      {/* Fog RIGHT */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100vw" }}
        transition={{ duration: 2.8, ease: "easeInOut" }}
        className="
          pointer-events-none
          absolute inset-y-0 right-0 w-1/2
          bg-gradient-to-l from-pink-300 via-pink-200 to-transparent
          blur-[120px] z-20
        "
      />
    </div>
  );
}
