import {
  Heart,
  Calendar,
  Users,
  Camera,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Heart,
    title: "Chuyện Tình Yêu",
    description:
      "Chia sẻ hành trình đẹp của bạn với một dòng thời gian được cá nhân hóa",
  },
  {
    icon: Calendar,
    title: "Lịch Trình Sự Kiện",
    description:
      "Hiển thị lễ cưới, tiệc cưới và tất cả các sự kiện một cách thanh lịch",
  },
  {
    icon: Users,
    title: "Quản Lý RSVP",
    description: "Thu thập phản hồi và quản lý danh sách khách mời dễ dàng",
  },
  {
    icon: Camera,
    title: "Thư Viện Ảnh",
    description: "Trưng bày những khoảnh khắc đẹp nhất với album ảnh tuyệt đẹp",
  },
  {
    icon: MessageCircle,
    title: "Lời Chúc Khách Mời",
    description: "Cho phép khách để lại những lời chúc tốt đẹp và phúc lành",
  },
];

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #c4a99b 0%, #d4b9ab 50%, #e8d4c8 100%)'
        }}
      />
      
      {/* Decorative wave at top */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#fdfaf8]" style={{
        clipPath: 'ellipse(60% 100% at 50% 0%)'
      }} />

      <div className="container mx-auto px-4 relative z-10 pt-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2">
            Mọi thứ bạn cần
          </h2>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2">
            cho
          </h3>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Thiệp mời hoàn hảo
          </h3>
          <p className="text-white/80 font-elegant text-base mt-4 max-w-xl mx-auto">
            Nền tảng của chúng tôi cung cấp tất cả các công cụ để tạo ra một
            trải nghiệm thiệp mời cưới kỹ thuật số đáng nhớ
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display text-base font-semibold text-white">
                  {feature.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#fdfaf8]" style={{
        clipPath: 'ellipse(60% 100% at 50% 100%)'
      }} />
    </section>
  );
};

export default Features;
