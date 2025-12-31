import {
  Heart,
  Calendar,
  Users,
  Camera,
  MessageCircle,
  Gift,
  MapPin,
  Share2,
  Palette,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Heart,
    title: "Câu Chuyện Tình Yêu",
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
  {
    icon: Gift,
    title: "Danh Sách Quà Tặng",
    description: "Chia sẻ chi tiết ngân hàng và sở thích quà tặng với mã QR",
  },
  {
    icon: MapPin,
    title: "Bản Đồ Địa Điểm",
    description: "Giúp khách mời tìm đường bằng bản đồ vị trí tích hợp",
  },
  {
    icon: Share2,
    title: "Chia Sẻ Dễ Dàng",
    description: "Chia sẻ qua mạng xã hội, WhatsApp hoặc liên kết tùy chỉnh",
  },
  {
    icon: Palette,
    title: "Chủ Đề Tùy Chỉnh",
    description: "Chọn từ các mẫu thanh lịch và tùy chỉnh màu sắc",
  },
  {
    icon: Globe,
    title: "Đa Ngôn Ngữ",
    description: "Hỗ trợ tiếng Việt, tiếng Anh và nhiều ngôn ngữ khác",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-cream-dark/50">
      <div className="container mx-auto px-4">
        {/* Tiêu Đề Phần */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Tính Năng
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Mọi Thứ Bạn Cần Cho
            <span className="text-gradient-gold"> Thiệp Mời Hoàn Hảo</span>
          </h2>
          <p className="text-muted-foreground font-elegant text-lg">
            Nền tảng của chúng tôi cung cấp tất cả các công cụ để tạo ra một
            trải nghiệm thiệp mời cưới kỹ thuật số đáng nhớ
          </p>
        </motion.div>

        {/* Lưới Tính Năng */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
