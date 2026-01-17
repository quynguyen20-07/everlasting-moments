import {
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { formatDateStr } from "@/lib/utils";
import { ColorScheme, Wish } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type WishFormData = {
  guestName: string;
  message: string;
};

export type GuestWishesSectionProps = {
  colors: ColorScheme;
  wishes: Wish[];
  weddingId: string;
  onSubmit: (data: WishFormData) => Promise<void>;
};

const GuestWishesSection: React.FC<GuestWishesSectionProps> = ({
  colors,
  wishes,
  weddingId,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<WishFormData>({
    guestName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.guestName.trim() || !formData.message.trim()) {
      setErrorMessage("Vui lòng nhập đầy đủ tên và lời chúc");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      // Reset form after success
      setFormData({
        guestName: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra. Vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof WishFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  // Filter only approved wishes
  const approvedWishes = wishes.filter((wish) => wish.isApproved);

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
          {/* Success Message */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div
                className="p-6 rounded-2xl flex items-center gap-4"
                style={{
                  background: `linear-gradient(135deg, #10b98120 0%, #10b98110 100%)`,
                  border: "1px solid #10b98140",
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-emerald-700">
                    Đã Gửi Lời Chúc!
                  </h3>
                  <p className="text-emerald-600 text-sm">
                    Cảm ơn bạn! Lời chúc sẽ được hiển thị sau khi được duyệt.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div
                className="p-6 rounded-2xl flex items-center gap-4"
                style={{
                  background: `linear-gradient(135deg, #ef444420 0%, #ef444410 100%)`,
                  border: "1px solid #ef444440",
                }}
              >
                <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-700">Có Lỗi Xảy Ra</h3>
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Wish Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
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
                  value={formData.guestName}
                  onChange={(e) => handleChange("guestName", e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="rounded-2xl border-2 p-4"
                  style={{
                    borderColor: `${colors?.primary}30`,
                    background: "white",
                  }}
                />
                <Textarea
                  placeholder="Viết lời chúc từ trái tim của bạn..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="rounded-2xl border-2 p-4 resize-none"
                  style={{
                    borderColor: `${colors?.primary}30`,
                    background: "white",
                  }}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-2xl px-8 disabled:opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`,
                    color: "white",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Gửi Lời Chúc
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Wishes List */}
          {approvedWishes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {approvedWishes.map((wish, index) => (
                <motion.div
                  key={wish.id || index}
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
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`,
                          color: "white",
                        }}
                      >
                        <span className="font-bold">
                          {wish.guestName[0]?.toUpperCase()}
                        </span>
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
          ) : (
            <div className="text-center py-8">
              <p style={{ color: colors?.muted }}>
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestWishesSection;
