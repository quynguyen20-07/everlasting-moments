import { Users, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ColorScheme } from "@/types";
import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export type RSVPFormData = {
  fullName: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  attendanceStatus: "confirmed" | "declined";
  dietaryRestrictions: string;
  message: string;
};

export type RSVPSectionProps = {
  colors: ColorScheme;
  weddingId: string;
  onSubmit: (data: RSVPFormData) => Promise<void>;
};

const RSVPSection: React.FC<RSVPSectionProps> = ({
  colors,
  weddingId,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: "",
    email: "",
    phone: "",
    numberOfGuests: 1,
    attendanceStatus: "confirmed",
    dietaryRestrictions: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      setErrorMessage("Vui lòng nhập tên của bạn");
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
        fullName: "",
        email: "",
        phone: "",
        numberOfGuests: 1,
        attendanceStatus: "confirmed",
        dietaryRestrictions: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof RSVPFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <section
      id="rsvp"
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
          <Users
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors?.primary }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors?.text }}
          >
            Xác Nhận Tham Dự
          </h2>
          <p className="text-lg" style={{ color: colors?.muted }}>
            Vui lòng cho chúng tôi biết bạn có thể tham dự hay không
          </p>
        </motion.div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-8"
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
                <h3 className="font-semibold text-emerald-700">Đã Xác Nhận Thành Công!</h3>
                <p className="text-emerald-600 text-sm">
                  Cảm ơn bạn đã phản hồi. Chúng tôi rất mong được gặp bạn!
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
            className="max-w-2xl mx-auto mb-8"
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

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors?.text }}
              >
                Tên của bạn *
              </label>
              <Input
                placeholder="Nhập tên đầy đủ"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
                disabled={isSubmitting}
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors?.primary}30`,
                  background: "white",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors?.text }}
              >
                Email
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={isSubmitting}
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors?.primary}30`,
                  background: "white",
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors?.text }}
              >
                Số điện thoại
              </label>
              <Input
                type="tel"
                placeholder="0912 345 678"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={isSubmitting}
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors?.primary}30`,
                  background: "white",
                }}
              />
            </div>

            {/* Number of Guests */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors?.text }}
              >
                Số người tham dự *
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.numberOfGuests}
                onChange={(e) => handleChange("numberOfGuests", parseInt(e.target.value) || 1)}
                required
                disabled={isSubmitting}
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors?.primary}30`,
                  background: "white",
                }}
              />
            </div>

            {/* Dietary Restrictions */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors?.text }}
              >
                Yêu cầu ăn uống đặc biệt
              </label>
              <Input
                placeholder="VD: Ăn chay, dị ứng hải sản..."
                value={formData.dietaryRestrictions}
                onChange={(e) => handleChange("dietaryRestrictions", e.target.value)}
                disabled={isSubmitting}
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: `${colors?.primary}30`,
                  background: "white",
                }}
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: colors?.text }}
              >
                Lời nhắn
              </label>
              <Textarea
                placeholder="Gửi lời nhắn đến cô dâu chú rể..."
                rows={3}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                disabled={isSubmitting}
                className="rounded-xl border-2 p-4 resize-none"
                style={{
                  borderColor: `${colors?.primary}30`,
                  background: "white",
                }}
              />
            </div>
          </div>

          {/* Attendance Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              type="button"
              size="lg"
              disabled={isSubmitting}
              className={`flex-1 rounded-xl py-6 text-lg font-semibold transition-all ${
                formData.attendanceStatus === "confirmed" ? "shadow-lg scale-105" : ""
              }`}
              style={{
                background: formData.attendanceStatus === "confirmed"
                  ? `linear-gradient(135deg, ${colors?.primary} 0%, ${colors?.secondary} 100%)`
                  : `${colors?.accent}20`,
                color: formData.attendanceStatus === "confirmed" ? "white" : colors?.text,
                border: `2px solid ${
                  formData.attendanceStatus === "confirmed" ? colors?.primary : `${colors?.primary}30`
                }`,
              }}
              onClick={() => handleChange("attendanceStatus", "confirmed")}
            >
              💖 Sẽ Tham Dự
            </Button>
            <Button
              type="button"
              size="lg"
              disabled={isSubmitting}
              className={`flex-1 rounded-xl py-6 text-lg font-semibold transition-all ${
                formData.attendanceStatus === "declined" ? "shadow-lg scale-105" : ""
              }`}
              style={{
                background: formData.attendanceStatus === "declined"
                  ? `linear-gradient(135deg, ${colors?.muted} 0%, ${colors?.text}80 100%)`
                  : `${colors?.accent}20`,
                color: formData.attendanceStatus === "declined" ? "white" : colors?.text,
                border: `2px solid ${
                  formData.attendanceStatus === "declined" ? colors?.muted : `${colors?.primary}30`
                }`,
              }}
              onClick={() => handleChange("attendanceStatus", "declined")}
            >
              😔 Không Tham Dự
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
                Gửi Xác Nhận
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
