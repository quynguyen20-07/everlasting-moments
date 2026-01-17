import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const testimonials = [
  {
    name: "Phương & Tùng",
    date: "Tháng 10 năm 2024",
    avatar: "P",
    quote:
      "Trang thiệp cưới online đẹp quá! Dễ sử dụng và tiết kiệm chi phí. Cảm ơn team rất nhiều!",
    rating: 5,
  },
  {
    name: "Hương & Tùng",
    date: "Tháng 11 năm 2024",
    avatar: "H",
    quote:
      "Trang thiệp đẹp tuyệt vời! Mọi người đều khen ngợi, Có nhiều thiết kế để lựa chọn và dễ dàng!",
    rating: 5,
  },
  {
    name: "Phương & Tùng",
    date: "Tháng 12 năm 2024",
    avatar: "P",
    quote:
      "Trang thiệp cưới online đẹp quá! Dễ sử dụng và tiết kiệm chi phí. Cảm ơn team rất nhiều!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#fdfaf8]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-[#c4a99b] font-elegant text-sm tracking-widest uppercase mb-3">
            Yêu thích bởi
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4a3f3a]">
            Các cặp đôi hạnh phúc
          </h2>
          <p className="text-[#7a6b64] font-elegant text-base mt-4">
            Xem những gì các cặp đôi đang nói về trải nghiệm của họ
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-white rounded-2xl shadow-sm border border-[#e8d4c8]/50 hover:shadow-md transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-4 h-4 fill-[#c4a99b] text-[#c4a99b]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#4a3f3a] mb-6 font-elegant text-base leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f8f1ed] flex items-center justify-center font-display text-base font-semibold text-[#c4a99b]">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-[#4a3f3a]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#7a6b64]">{testimonial.date}</p>
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
