import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Decorative palm tree - left */}
        <motion.div
          className="absolute top-10 -left-80 w-1/3 h-full pointer-events-auto"
          style={{ transformOrigin: "bottom center" }}
          animate={{
            rotate: [-1.5, 1.5, -1.5],
          }}
          whileHover={{
            rotate: [-6, 6, -6],
            transition: {
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src="/images/palm-tree.png"
            alt="Palm tree left"
            className="w-full h-full object-contain object-left"
            style={{ opacity: 0.15 }}
            animate={{ scaleX: -1 }}
          />
        </motion.div>

        {/* Decorative palm tree - right */}
        <motion.div
          className="absolute top-10 -right-60 w-1/3 h-full pointer-events-auto"
          style={{ transformOrigin: "bottom center" }}
          animate={{
            rotate: [1.5, -1.5, 1.5],
          }}
          whileHover={{
            rotate: [6, -6, 6],
            transition: {
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src="/images/palm-tree.png"
            alt="Palm tree right"
            className="w-full h-full object-contain object-right opacity-15"
          />
        </motion.div>

        {/* Gradient background - đặt sau cây dừa */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f1ed]/80 via-[#fdfaf8]/70 to-[#f8f1ed]/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4"
          >
            <span className="text-[#4a3f3a]">Câu chuyện tình yêu</span>
            <br />
            <span className="text-[#4a3f3a]">của bạn</span>
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
          >
            <span className="text-gradient-gold">Kể một cách đẹp đẽ</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-[#7a6b64] max-w-2xl mx-auto mb-8 font-elegant leading-relaxed"
          >
            Tạo những thiệp cưới kỹ thuật số tuyệt đẹp, nắm bắt được bản chất
            của ngày đặc biệt của bạn. Chia sẻ câu chuyện tình yêu của bạn, quản
            lý RSVPs, và làm hài lòng khách mời với một trải nghiệm khó quên.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              variant="blush"
              size="lg"
              className="rounded-2xl px-8 py-6 text-base font-medium"
              asChild
            >
              <Link to="/auth">
                Bắt Đầu Tạo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="hover:text-white rounded-2xl px-8 py-6 text-base font-medium"
              asChild
            >
              <Link to="/demo/blush-romance">Xem Demo</Link>
            </Button>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-sm text-[#7a6b64]">
              Được tin tưởng bởi hơn 10,000 cặp đôi trên toàn thế giới
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-5 h-5 fill-[#c4a99b] text-[#c4a99b]"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-2xl border-2 border-[#c4a99b]/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-2xl bg-[#c4a99b]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
