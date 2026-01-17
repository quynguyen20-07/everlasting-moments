import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with palm tree overlay */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f1ed] via-[#fdfaf8] to-[#f8f1ed]" />

        {/* Decorative palm leaves - left */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 800'%3E%3Cpath d='M-50,0 Q100,200 50,400 Q0,600 -50,800' stroke='%23c4a99b' fill='none' stroke-width='2'/%3E%3Cpath d='M0,50 Q150,250 100,450 Q50,650 0,850' stroke='%23c4a99b' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Decorative palm leaves - right */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 800'%3E%3Cpath d='M450,0 Q300,200 350,400 Q400,600 450,800' stroke='%23c4a99b' fill='none' stroke-width='2'/%3E%3Cpath d='M400,50 Q250,250 300,450 Q350,650 400,850' stroke='%23c4a99b' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
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
              size="lg"
              className="bg-[#4a3f3a] hover:bg-[#3a2f2a] text-white rounded-2xl px-8 py-6 text-base font-medium"
              asChild
            >
              <Link to="/auth">
                Bắt Đầu Tạo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#c4a99b] text-[#c4a99b] hover:bg-[#c4a99b]/10 rounded-2xl px-8 py-6 text-base font-medium"
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
