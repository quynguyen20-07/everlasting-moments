import { motion } from "framer-motion";

const CTA = () => {
  const testimonials = {
    quote:
      "Âm nhạc chính là linh hồn của đám cưới, và DJ Austo đã tạo nên bầu không khí hoàn hảo, giúp ngày cưới của chúng tôi trở thành một trải nghiệm đáng nhớ",
    author: "Cô dâu, Thị phiến",
    product: "SẢN PHẨM: TRUE LOVE",
  };

  return (
    <section className="py-20 relative bg-[#F9F6F3] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-6 mb-4">
          <div className="h-px w-12 bg-[#D4A8A8]/50"></div>
          <span className="text-[#c4a99b] font-elegant text-sm tracking-widest uppercase mb-3">
            Cảm nhận khách hàng
          </span>
          <div className="h-px w-12 bg-[#D4A8A8]/50"></div>
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#4A3F3A]">
          Lời chia sẻ yêu thương
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 flex justify-center"
      >
        <motion.div className="w-2/3 md:w-1/3 overflow-hidden bg-transparent flex items-center justify-center">
          <motion.img
            src="/images/love-words.png"
            alt="Love words"
            className="w-full h-auto object-contain"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
