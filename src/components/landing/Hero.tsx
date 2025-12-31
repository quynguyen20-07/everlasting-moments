import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden invitation-pattern">
      {/* Các yếu tố trang trí */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-10 w-64 h-64 bg-blush/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-champagne-light/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-gold/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Huy hiệu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">
              Tạo Thiệp Cưới Đẹp Mắt
            </span>
          </motion.div>

          {/* Tiêu đề chính */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-6"
          >
            <span className="text-foreground">
              Câu Chuyện Tình Yêu Của Bạn,
            </span>
            <br />
            <span className="text-gradient-gold">Kể Một Cách Đẹp Đẽ</span>
          </motion.h1>

          {/* Phụ đề */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-elegant"
          >
            Tạo những thiệp cưới kỹ thuật số tuyệt đẹp, nắm bắt được bản chất
            của ngày đặc biệt của bạn. Chia sẻ câu chuyện tình yêu của bạn, quản
            lý RSVPs, và làm hài lòng khách mời với một trải nghiệm khó quên.
          </motion.p>

          {/* Nút kêu gọi hành động */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/auth">
                Bắt Đầu Tạo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline-elegant" size="xl" asChild>
              <Link to="/demo">
                Xem Demo
                <Heart className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Chỉ số tin cậy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">
              Được tin tưởng bởi hơn 10,000 cặp đôi trên toàn thế giới
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chỉ báo cuộn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
