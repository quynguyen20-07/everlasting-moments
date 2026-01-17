import { UserPlus, Edit3, Heart } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Tạo Tài Khoản",
    description:
      "Đăng ký trong vài giây và bắt đầu hành trình tạo thiệp mời đám cưới của bạn",
  },
  {
    icon: Edit3,
    step: "02",
    title: "Tùy Chỉnh Thiết Kế",
    description:
      "Chọn một mẫu và cá nhân hóa mọi chi tiết để phù hợp với phong cách của bạn",
  },
  {
    icon: Heart,
    step: "03",
    title: "Cùng Chia Sẻ Niềm Vui",
    description:
      "Nhận xác nhận tham dự, lời chúc, và tận hưởng ngày đặc biệt của bạn",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#fdfaf8]">
      <div className="container mx-auto px-4">
        {/* Decorative Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-8 mb-8"
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-2xl bg-[#f8f1ed] flex items-center justify-center"
            >
              <step.icon className="w-5 h-5 text-[#c4a99b]" />
            </div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[#c4a99b] font-elegant text-sm tracking-widest uppercase mb-3">
            Bốn bước đơn giản
          </p>
          <p className="text-[#c4a99b] font-elegant text-sm tracking-widest uppercase mb-3">
            để tạo
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4a3f3a]">
            Thiệp mời mơ ước của bạn
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="text-6xl font-display font-light text-[#e8d4c8] mb-4">
                {step.step}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold text-[#4a3f3a] mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#7a6b64] text-sm max-w-xs mx-auto leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
