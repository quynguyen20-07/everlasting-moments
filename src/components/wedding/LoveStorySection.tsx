import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LoveStorySectionProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
}

const LoveStorySection = ({ colors }: LoveStorySectionProps) => {
  const story = `Trong một chiều mưa Đà Nẵng, tại quán cà phê nhỏ ven sông Hàn, 
  chúng tôi đã gặp nhau một cách tình cờ. Một cuốn sách rơi, một ánh mắt giao nhau, 
  và thế là hành trình yêu thương bắt đầu. 
  Từ những buổi hoàng hôn trên biển Mỹ Khê đến những đêm trò chuyện dài dưới ánh sao, 
  mỗi khoảnh khắc đều là một mảnh ghép hoàn hảo cho tình yêu của chúng tôi. 
  Hôm nay, chúng tôi chính thức bước tiếp hành trình ấy bên nhau, 
  với lời hứa về một tương lai tràn đầy yêu thương và hạnh phúc.`;

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <Heart
            className="w-14 h-14 mx-auto mb-8 animate-pulse"
            style={{ color: colors.primary, fill: `${colors.primary}20` }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-8"
            style={{ color: colors.text }}
          >
            Câu Chuyện Của Chúng Tôi
          </h2>
          <div className="relative">
            <div
              className="absolute -top-4 -left-4 w-8 h-8 rounded-full opacity-30"
              style={{ background: colors.accent }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full opacity-30"
              style={{ background: colors.accent }}
            />
            <p
              className="font-serif text-lg md:text-xl leading-relaxed text-justify p-8 rounded-2xl backdrop-blur-sm"
              style={{
                color: colors.text,
                background: `${colors.accent}10`,
                border: `1px solid ${colors.primary}20`,
              }}
            >
              {story}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveStorySection;
