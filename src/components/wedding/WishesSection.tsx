import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface WishesSectionProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  wishData: {
    name: string;
    message: string;
  };
  setWishData: (data: unknown) => void;
  onWish: (e: React.FormEvent) => void;
}

const WishesSection = ({
  colors,
  wishData,
  setWishData,
  onWish,
}: WishesSectionProps) => {
  const wishes = [
    {
      name: "Anh Khoa",
      message:
        "Chúc hai bạn trăm năm hạnh phúc! Tình yêu luôn nồng ấm như ngày đầu 💕",
      date: "2 ngày trước",
    },
    {
      name: "Hương Giang",
      message:
        "Mong rằng cuộc sống của hai bạn sẽ tràn ngập tiếng cười và yêu thương!",
      date: "3 ngày trước",
    },
    {
      name: "Minh Đức",
      message:
        "Chúc mừng hai bạn! Thật hạnh phúc khi chứng kiến tình yêu của các bạn nở hoa ✨",
      date: "1 ngày trước",
    },
    {
      name: "Lan Anh",
      message:
        "Chúc hai bạn luôn hạnh phúc bên nhau, cùng nhau xây dựng tổ ấm tràn đầy yêu thương! 🌸",
      date: "Hôm nay",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <MessageCircle
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors.primary }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Lời Chúc Từ Trái Tim
          </h2>
          <p className="text-lg" style={{ color: colors.muted }}>
            Chia sẻ tình yêu và những lời chúc tốt đẹp nhất
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Wish Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onWish}
            className="mb-12"
          >
            <div
              className="p-8 rounded-2xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}10 0%, white 100%)`,
                border: `1px solid ${colors.primary}20`,
              }}
            >
              <h3
                className="font-display text-2xl font-semibold mb-6"
                style={{ color: colors.text }}
              >
                Gửi lời chúc của bạn
              </h3>
              <div className="space-y-6">
                <Input
                  placeholder="Tên của bạn"
                  value={wishData.name}
                  onChange={(e) =>
                    setWishData({ ...wishData, name: e.target.value })
                  }
                  required
                  className="rounded-xl border-2 p-4"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: "white",
                  }}
                />
                <Textarea
                  placeholder="Viết lời chúc từ trái tim của bạn..."
                  rows={4}
                  value={wishData.message}
                  onChange={(e) =>
                    setWishData({ ...wishData, message: e.target.value })
                  }
                  required
                  className="rounded-xl border-2 p-4 resize-none"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: "white",
                  }}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl px-8"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: "white",
                  }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Gửi Lời Chúc
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Wishes List */}
          <div className="grid md:grid-cols-2 gap-6">
            {wishes.map((wish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="p-6 rounded-2xl backdrop-blur-sm border shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}05 0%, white 100%)`,
                    borderColor: `${colors.primary}20`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        color: "white",
                      }}
                    >
                      <span className="font-bold">{wish.name[0]}</span>
                    </div>
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: colors.text }}
                      >
                        {wish.name}
                      </p>
                      <p className="text-sm" style={{ color: colors.muted }}>
                        {wish.date}
                      </p>
                    </div>
                  </div>
                  <p className="italic" style={{ color: colors.text }}>
                    "{wish.message}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
