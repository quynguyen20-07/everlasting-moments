import { MessageCircle, Send } from "lucide-react";
import { formatDateStr } from "@/lib/utils";
import { ColorScheme, Wish } from "@/types";
// import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type WishFormData = {
  name: string;
  message: string;
};

export type GuestWishesSectionProps = {
  colors: ColorScheme;
  wishes: Wish[];
  wishData: WishFormData;
  setWishData: React.Dispatch<React.SetStateAction<WishFormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const GuestWishesSection: React.FC<GuestWishesSectionProps> = ({
  colors,
  wishes,
  wishData,
  setWishData,
  onSubmit,
}) => {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(
          to bottom,
          ${colors?.accent}CC 0%,   
          ${colors?.accent}80 40%,   
          ${colors?.accent}00 75%,   
          ${colors?.accent}CC 100%   
        )`,
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <MessageCircle
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors?.primary }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors?.text }}
          >
            Lời Chúc Từ Trái Tim
          </h2>
          <p className="text-lg" style={{ color: colors?.muted }}>
            Chia sẻ tình yêu và những lời chúc tốt đẹp nhất
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Wish Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="mb-12"
          >
            <div
              className="p-8 rounded-2xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors?.accent}10 0%, white 100%)`,
                border: `1px solid ${colors?.primary}20`,
              }}
            >
              <h3
                className="font-display text-2xl font-semibold mb-6"
                style={{ color: colors?.text }}
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
                    borderColor: `${colors?.primary}30`,
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
                    borderColor: `${colors?.primary}30`,
                    background: "white",
                  }}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl px-8"
                  style={{
                    background: `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`,
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
                    background: `linear-gradient(135deg, ${colors?.accent}05 0%, white 100%)`,
                    borderColor: `${colors?.primary}20`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`,
                        color: "white",
                      }}
                    >
                      <span className="font-bold">{wish.guestName[0]}</span>
                    </div>
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: colors?.text }}
                      >
                        {wish.guestName}
                      </p>
                      <p className="text-sm" style={{ color: colors?.muted }}>
                        {formatDateStr(wish.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="italic" style={{ color: colors?.text }}>
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

export default GuestWishesSection;
