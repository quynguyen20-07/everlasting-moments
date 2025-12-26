import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Linh & Minh",
    date: "December 2024",
    avatar: "L",
    quote: "The invitation was absolutely stunning! Our guests couldn't stop talking about how beautiful and easy it was to RSVP. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah & John",
    date: "November 2024",
    avatar: "S",
    quote: "We loved how we could customize everything. The countdown feature and photo gallery made our invitation truly special.",
    rating: 5,
  },
  {
    name: "Hương & Tùng",
    date: "October 2024",
    avatar: "H",
    quote: "Trang thiệp cưới online đẹp quá! Dễ sử dụng và tiết kiệm chi phí. Cảm ơn team rất nhiều!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background invitation-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Loved by
            <span className="text-gradient-gold"> Happy Couples</span>
          </h2>
          <p className="text-muted-foreground font-elegant text-lg">
            See what couples are saying about their experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
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
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 mb-6 font-elegant text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
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
