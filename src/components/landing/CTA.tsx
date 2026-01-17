import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-16 bg-[#f8f1ed]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Background Image */}
          <div className="relative h-[500px] md:h-[600px]">
            <img
              src="/images/co-dau-chu-re.jfif"
              alt="Couple"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-white/80 font-elegant text-sm tracking-widest uppercase mb-4">
                TESTIMONIALS
              </p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white mb-2">
                The <span className="italic">love</span> in
              </h2>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white">
                their words
              </h2>
            </div>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <p className="text-[#4a3f3a] font-elegant text-center italic leading-relaxed">
                  "We have been to so many weddings with incredible energy and
                  so when planning our wedding we really prioritized the music.
                  Di Audio truly exceeded our expectations."
                </p>
                <div className="text-center mt-4">
                  <p className="font-display font-semibold text-[#4a3f3a]">
                    Phương & Tùng
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
