import { Heart, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Linh & Minh",
    date: "Tháng 12 năm 2024",
    avatar: "L",
    quote:
      "Thiệp mời thật sự tuyệt vời! Khách mời của chúng tôi không ngừng nói về sự đẹp đẽ và dễ dàng khi RSVP. Rất đáng được khuyên!",
    rating: 5,
  },
  {
    name: "Sarah & John",
    date: "Tháng 11 năm 2024",
    avatar: "S",
    quote:
      "Chúng tôi rất thích cách mà chúng tôi có thể tùy chỉnh mọi thứ. Tính năng đếm ngược và thư viện ảnh đã làm cho thiệp mời của chúng tôi thật sự đặc biệt.",
    rating: 5,
  },
  {
    name: "Hương & Tùng",
    date: "Tháng 10 năm 2024",
    avatar: "H",
    quote:
      "Trang thiệp cưới online đẹp quá! Dễ sử dụng và tiết kiệm chi phí. Cảm ơn team rất nhiều!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background invitation-pattern">
      <div className="container mx-auto px-4">
        {/* Tiêu đề phần */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Lời chứng thực
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Yêu thích bởi
            <span className="text-gradient-gold"> Các cặp đôi hạnh phúc</span>
          </h2>
          <p className="text-muted-foreground font-elegant text-lg">
            Xem những gì các cặp đôi đang nói về trải nghiệm của họ
          </p>
        </motion.div>

        {/* Lưới lời chứng thực */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              {/* Biểu tượng trích dẫn */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Đánh giá */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Trích dẫn */}
              <p className="text-foreground/80 mb-6 font-elegant text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Tác giả */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display text-lg font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
