import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Trang trí nền */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-blush-light" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-champagne-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blush/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Yếu tố trang trí */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border shadow-elegant mb-8"
          >
            <Heart className="w-10 h-10 text-primary animate-heartbeat" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Sẵn sàng tạo ra
            <span className="text-gradient-gold"> Thiệp Mời Hoàn Hảo?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-elegant mb-10 max-w-xl mx-auto">
            Tham gia cùng hàng ngàn cặp đôi hạnh phúc đã chia sẻ câu chuyện tình
            yêu của họ với những thiệp mời kỹ thuật số đẹp mắt của chúng tôi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <Link to="/auth">
                <Sparkles className="w-5 h-5" />
                Bắt đầu miễn phí
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Không cần thẻ tín dụng
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
