import { motion } from "framer-motion";

type WeddingFooterQuoteProps = {
  text: string;
};

const WeddingFooterQuote = ({ text }: WeddingFooterQuoteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="
        absolute
        bottom-0
        left-0
        px-4
        pb-[28px]
        text-left
      "
    >
      <motion.p
        animate={{
          y: [-2, 2],
          opacity: [0.92, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          textShadow: `
          0 1px 2px rgba(255,255,255,0.9),
          0 2px 6px rgba(0,0,0,0.12)
        `,
        }}
        className="
        font-['Allura']
        font-normal
        text-[24px] md:text-[42px] md:mb-2rem
        md:mr-2rem
        leading-[42px]
        text-black
        whitespace-pre-line
        mb-0
      "
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default WeddingFooterQuote;
