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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="
        absolute
        bottom-0
        left-0
        -translate-x-1/2
        px-2
        py-1
        backdrop-blur-[1px]
        text-center
        rounded-xl
      "
    >
      <p
        className="
          font-['Allura']
          font-normal
          text-[36px]
          leading-[48px]
          tracking-[0px]
          align-middle
          text-black
          whitespace-pre-line
        "
      >
        {text}
      </p>
    </motion.div>
  );
};

export default WeddingFooterQuote;
