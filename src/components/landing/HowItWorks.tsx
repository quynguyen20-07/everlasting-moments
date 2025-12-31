import { UserPlus, Edit3, Send, PartyPopper } from "lucide-react";
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
    icon: Send,
    step: "03",
    title: "Chia Sẻ với Khách Mời",
    description:
      "Gửi thiệp mời đẹp của bạn qua liên kết, mạng xã hội hoặc mã QR",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Cùng Chia Sẻ Niềm Vui",
    description:
      "Nhận xác nhận tham dự, lời chúc, và tận hưởng ngày đặc biệt của bạn",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Tiêu đề Phần */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Cách Thức Hoạt Động
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Bốn Bước Đơn Giản để Tạo
            <span className="text-gradient-gold">
              {" "}
              Thiệp Mời Mơ Ước của Bạn
            </span>
          </h2>
        </motion.div>

        {/* Các Bước */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Đường Nối */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative text-center">
                {/* Số Bước */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl font-display font-bold text-primary/10">
                  {step.step}
                </div>

                {/* Biểu Tượng */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary/20 mb-6 shadow-soft">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Nội Dung */}
                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
