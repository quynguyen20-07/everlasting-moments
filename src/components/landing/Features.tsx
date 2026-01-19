import { Heart, Calendar, Users, Camera, MessageCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import Slider from "./Slider";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
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
          background: "linear-gradient(180deg, #D4A8A8 0%, #E8D1C5 100%)",
        }}
      />

      {/* Wave Top */}
      <svg
        className="absolute top-0 left-0 w-full h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="#F5EBE8"
          d="
        M0,40 
        C200,0 400,80 600,40 
        C800,0 1000,80 1200,40 
        C1400,0 1440,20 1440,20 
        L1440,0 
        L0,0 
        Z
      "
        />
      </svg>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Mọi thứ bạn cần cho
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl">
              Thiệp mời hoàn hảo
            </span>
          </h2>
          <p className="text-white/90 font-elegant text-lg mt-6 max-w-2xl mx-auto">
            Nền tảng của chúng tôi cung cấp tất cả các công cụ để tạo ra một
            trải nghiệm thiệp mời cưới kỹ thuật số đáng nhớ
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="max-w-6xl mx-auto">
          <Slider itemsPerView={4} autoPlayInterval={5000}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="bg-[#FFFCF9] rounded-3xl border border-[#E8DCD4] p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#EEDBD2] flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-[#C58B7A]" />
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-xl font-semibold text-[#1F1F1F] mb-3">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[#6B7280] font-elegant text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Wave Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="#F5EBE8"
          d="
        M0,40 
        C200,80 400,0 600,40 
        C800,80 1000,0 1200,40 
        C1400,80 1440,60 1440,60 
        L1440,80 
        L0,80 
        Z
      "
        />
      </svg>
    </section>
  );
};

export default Features;
