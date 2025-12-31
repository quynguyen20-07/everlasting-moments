import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addWishApi } from "@/lib/api/wish";
import { Loader2, Send, MessageCircleHeart, Quote } from "lucide-react";
import type { Wedding, Wish } from "@/types/graphql";

interface WishesSectionProps {
  wedding: Wedding;
  wishes?: Wish[];
}

const wishSchema = z.object({
  guestName: z.string().min(2, "Vui lòng nhập tên").max(100),
  message: z.string().min(10, "Lời chúc ít nhất 10 ký tự").max(500, "Lời chúc tối đa 500 ký tự"),
});

type WishFormData = z.infer<typeof wishSchema>;

export function WishesSection({ wedding, wishes = [] }: WishesSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WishFormData>({
    resolver: zodResolver(wishSchema),
  });

  const approvedWishes = wishes.filter((w) => w.isApproved && w.isActive);

  const onSubmit = async (data: WishFormData) => {
    setIsSubmitting(true);
    try {
      await addWishApi(wedding.id, {
        guestName: data.guestName,
        message: data.message,
      });

      setIsSubmitted(true);
      reset();
      toast({
        title: "Gửi lời chúc thành công! 💕",
        description: "Cảm ơn bạn đã gửi lời chúc mừng đến cô dâu và chú rể.",
      });
    } catch {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-blush-light/20 to-background">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dusty-rose/20 flex items-center justify-center">
            <MessageCircleHeart className="w-8 h-8 text-dusty-rose" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Sổ Lưu Bút
          </h2>
          <p className="font-elegant text-muted-foreground max-w-md mx-auto">
            Gửi lời chúc mừng hạnh phúc đến cô dâu và chú rể
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        {/* Wishes display */}
        {approvedWishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {approvedWishes.slice(0, 6).map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 rounded-xl shadow-soft"
                >
                  <Quote className="w-6 h-6 text-champagne/40 mb-2" />
                  <p className="font-elegant text-foreground/90 mb-3 italic">
                    "{wish.message}"
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{wish.guestName}</span>
                    <span>•</span>
                    <span>
                      {new Date(wish.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Wish form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="glass-card p-8 rounded-2xl shadow-elegant text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-champagne/20 flex items-center justify-center">
                <MessageCircleHeart className="w-8 h-8 text-champagne" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">
                Cảm ơn bạn! 💕
              </h3>
              <p className="font-elegant text-muted-foreground mb-4">
                Lời chúc của bạn sẽ được hiển thị sau khi được duyệt.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
              >
                Gửi lời chúc khác
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card p-6 md:p-8 rounded-2xl shadow-elegant space-y-6 max-w-lg mx-auto"
            >
              <div className="space-y-2">
                <Label htmlFor="guestName" className="font-elegant">
                  Tên của bạn <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="guestName"
                  placeholder="Nhập tên của bạn"
                  {...register("guestName")}
                  className="bg-background/50"
                />
                {errors.guestName && (
                  <p className="text-sm text-destructive">{errors.guestName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-elegant">
                  Lời chúc <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Viết lời chúc mừng hạnh phúc..."
                  rows={4}
                  {...register("message")}
                  className="bg-background/50 resize-none"
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient text-primary-foreground font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Gửi Lời Chúc
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
