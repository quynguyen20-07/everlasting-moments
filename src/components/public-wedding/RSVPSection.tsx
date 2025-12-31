import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { submitRSVPApi } from "@/lib/api/guest";
import { Loader2, Send, CheckCircle2, PartyPopper, HeartHandshake } from "lucide-react";
import type { Wedding } from "@/types/graphql";

interface RSVPSectionProps {
  wedding: Wedding;
}

const rsvpSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên").max(100),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  phone: z.string().optional(),
  numberOfGuests: z.number().min(1, "Số người tham dự ít nhất là 1").max(10),
  attendanceStatus: z.enum(["confirmed", "declined"]),
  dietaryRestrictions: z.string().optional(),
  message: z.string().max(500).optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

export function RSVPSection({ wedding }: RSVPSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      numberOfGuests: 1,
      attendanceStatus: "confirmed",
    },
  });

  const attendanceStatus = watch("attendanceStatus");

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    try {
      await submitRSVPApi(wedding.id, {
        fullName: data.fullName,
        email: data.email || undefined,
        phone: data.phone || undefined,
        numberOfGuests: data.numberOfGuests,
        attendanceStatus: data.attendanceStatus,
        dietaryRestrictions: data.dietaryRestrictions || undefined,
        message: data.message || undefined,
      });

      setIsSubmitted(true);
      toast({
        title: "Gửi thành công! 🎉",
        description: "Cảm ơn bạn đã phản hồi. Chúng tôi rất vui được đón tiếp bạn!",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-blush-light/30 to-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center glass-card p-8 rounded-2xl shadow-elegant"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-champagne/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-champagne" />
          </div>
          <h3 className="font-display text-2xl text-foreground mb-3">
            Cảm ơn bạn! 💕
          </h3>
          <p className="font-elegant text-muted-foreground">
            Chúng tôi đã nhận được phản hồi của bạn. 
            Rất mong được gặp bạn trong ngày trọng đại!
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-blush-light/30 to-background">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Xác Nhận Tham Dự
          </h2>
          <p className="font-elegant text-muted-foreground max-w-md mx-auto">
            Vui lòng xác nhận sự tham dự của bạn để chúng tôi có thể chuẩn bị chu đáo nhất
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-6 md:p-8 rounded-2xl shadow-elegant space-y-6"
          >
            {/* Attendance Status */}
            <div className="space-y-3">
              <Label className="font-elegant text-foreground">Bạn sẽ tham dự chứ?</Label>
              <RadioGroup
                value={attendanceStatus}
                onValueChange={(value) => setValue("attendanceStatus", value as "confirmed" | "declined")}
                className="flex gap-4"
              >
                <div className="flex-1">
                  <RadioGroupItem
                    value="confirmed"
                    id="confirmed"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="confirmed"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      attendanceStatus === "confirmed"
                        ? "border-champagne bg-champagne/10"
                        : "border-border hover:border-champagne/50"
                    }`}
                  >
                    <PartyPopper className={`w-8 h-8 ${attendanceStatus === "confirmed" ? "text-champagne" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${attendanceStatus === "confirmed" ? "text-foreground" : "text-muted-foreground"}`}>
                      Sẽ tham dự
                    </span>
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem
                    value="declined"
                    id="declined"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="declined"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      attendanceStatus === "declined"
                        ? "border-dusty-rose bg-dusty-rose/10"
                        : "border-border hover:border-dusty-rose/50"
                    }`}
                  >
                    <HeartHandshake className={`w-8 h-8 ${attendanceStatus === "declined" ? "text-dusty-rose" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${attendanceStatus === "declined" ? "text-foreground" : "text-muted-foreground"}`}>
                      Không thể đến
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="font-elegant">
                Họ và tên <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Nguyễn Văn A"
                {...register("fullName")}
                className="bg-background/50"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            {/* Contact info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-elegant">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                  className="bg-background/50"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-elegant">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="0912 345 678"
                  {...register("phone")}
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Number of guests */}
            {attendanceStatus === "confirmed" && (
              <div className="space-y-2">
                <Label htmlFor="numberOfGuests" className="font-elegant">
                  Số người tham dự <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  min={1}
                  max={10}
                  {...register("numberOfGuests", { valueAsNumber: true })}
                  className="bg-background/50 w-32"
                />
                {errors.numberOfGuests && (
                  <p className="text-sm text-destructive">{errors.numberOfGuests.message}</p>
                )}
              </div>
            )}

            {/* Dietary restrictions */}
            {attendanceStatus === "confirmed" && (
              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions" className="font-elegant">
                  Yêu cầu về ăn uống (nếu có)
                </Label>
                <Input
                  id="dietaryRestrictions"
                  placeholder="Ví dụ: Ăn chay, dị ứng hải sản..."
                  {...register("dietaryRestrictions")}
                  className="bg-background/50"
                />
              </div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="font-elegant">
                Lời nhắn gửi đôi uyên ương
              </Label>
              <Textarea
                id="message"
                placeholder="Viết lời chúc mừng của bạn..."
                rows={3}
                {...register("message")}
                className="bg-background/50 resize-none"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gold-gradient text-primary-foreground font-medium h-12 text-lg"
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
          </form>
        </motion.div>
      </div>
    </section>
  );
}
