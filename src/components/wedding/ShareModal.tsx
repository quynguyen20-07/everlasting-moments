import {
  Facebook,
  Instagram,
  Link as LinkIcon,
  X,
  MessageCircle,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ colors, isOpen, onClose }: ShareModalProps) => {
  const { toast } = useToast();

  const shareOptions = [
    {
      icon: Facebook,
      label: "Facebook",
      color: "#1877F2",
      action: () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("🎉 Thiệp cưới của chúng tôi!");
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
          "_blank"
        );
      },
    },
    {
      icon: Instagram,
      label: "Instagram",
      color: "#E4405F",
      action: () => {
        toast({
          title: "Chia sẻ lên Instagram",
          description: "Vui lòng mở ứng dụng Instagram để chia sẻ thiệp cưới.",
        });
      },
    },
    {
      icon: MessageCircle,
      label: "Zalo",
      color: "#0068FF",
      action: () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(
          "🎉 Mời bạn xem thiệp cưới của chúng tôi!"
        );
        window.open(`https://zalo.me/share?text=${text}&url=${url}`, "_blank");
      },
    },
    {
      icon: Mail,
      label: "Email",
      color: colors.primary,
      action: () => {
        const subject = encodeURIComponent("Thiệp cưới của chúng tôi");
        const body = encodeURIComponent(
          `Xin chào! Mời bạn xem thiệp cưới của chúng tôi:\n${window.location.href}\n\nTrân trọng!`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      },
    },
    {
      icon: LinkIcon,
      label: "Sao chép",
      color: colors.secondary,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Đã Sao Chép!",
          description: "Liên kết đã được sao chép vào bộ nhớ tạm.",
          duration: 2000,
        });
      },
    },
  ];

  const downloadOptions = [
    { label: "Tải thiệp PDF", format: "PDF" },
    { label: "Tải hình ảnh", format: "PNG" },
    { label: "Lưu vào thiết bị", format: "Save" },
  ];

  const handleDownload = (format: string) => {
    toast({
      title: "Đang tải xuống...",
      description: `Thiệp cưới sẽ được tải về dạng ${format}`,
      duration: 1500,
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Tải xuống hoàn tất!",
        description: `Thiệp cưới đã được lưu thành công.`,
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
            style={{ maxWidth: "500px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3
                  className="font-display text-2xl font-bold"
                  style={{ color: colors.text }}
                >
                  Chia Sẻ Thiệp Cưới
                </h3>
                <p className="text-sm mt-1" style={{ color: colors.muted }}>
                  Chia sẻ hạnh phúc với mọi người
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-red-50 transition-colors"
                style={{ color: colors.primary }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Share Options */}
            <div className="mb-8">
              <h4 className="font-medium mb-4" style={{ color: colors.text }}>
                Chia sẻ qua
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl hover:shadow-lg transition-all duration-200"
                    style={{
                      background: `${option.color}08`,
                      border: `1px solid ${option.color}20`,
                    }}
                    onClick={() => {
                      option.action();
                      onClose();
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: `${option.color}15` }}
                    >
                      <option.icon
                        className="w-6 h-6"
                        style={{ color: option.color }}
                      />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: option.color }}
                    >
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Download Options */}
            <div>
              <h4 className="font-medium mb-4" style={{ color: colors.text }}>
                Tải thiệp về
              </h4>
              <div className="space-y-2">
                {downloadOptions.map((option, index) => (
                  <motion.button
                    key={option.format}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:shadow-md transition-all"
                    style={{
                      background: `${colors.accent}10`,
                      border: `1px solid ${colors.primary}20`,
                    }}
                    onClick={() => handleDownload(option.format)}
                  >
                    <span
                      className="font-medium"
                      style={{ color: colors.text }}
                    >
                      {option.label}
                    </span>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `${colors.primary}15`,
                        color: colors.primary,
                      }}
                    >
                      {option.format}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* QR Code Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t text-center"
              style={{ borderColor: `${colors.primary}20` }}
            >
              <p className="text-sm mb-3" style={{ color: colors.muted }}>
                Hoặc quét mã QR để xem
              </p>
              <div className="flex justify-center">
                <div
                  className="w-32 h-32 rounded-lg flex items-center justify-center border-2"
                  style={{
                    background: `${colors.accent}20`,
                    borderColor: `${colors.primary}30`,
                  }}
                >
                  <div className="text-center">
                    <div className="grid grid-cols-3 gap-1 mb-1">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm"
                          style={{ background: colors.primary }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: colors.text }}
                    >
                      QR Code
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
