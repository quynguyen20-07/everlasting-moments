import { motion } from "framer-motion";

type WeddingGiftCardProps = {
  image: string;
  onClick?: () => void;
};

const WeddingGiftCard = ({ image, onClick }: WeddingGiftCardProps) => {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #EBD6D1 26.92%, #EBD6D1 82.21%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            font-['Great_Vibes']
            font-normal
            text-[55px]
            leading-[56px]
            text-[#C48A7A]
            mb-8
          "
        >
          Mừng Cưới
        </motion.h2>

        {/* Image */}
        <motion.img
          onClick={onClick}
          src={image}
          alt="Wedding gift"
          className="w-[260px] md:w-[320px] h-auto cursor-pointer"
          animate={{
            rotate: [0, -6, 6, -4, 4, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>
    </section>
  );
};

export default WeddingGiftCard;
