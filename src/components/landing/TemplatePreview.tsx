import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  accent: string;
}

interface TemplatePreviewProps {
  template: Template | undefined;
  onClose: () => void;
}

const TemplatePreview = ({ template, onClose }: TemplatePreviewProps) => {
  if (!template) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                {template.name}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {template.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Template Preview */}
          <div className="p-8 flex flex-col items-center justify-center gap-8">
            {/* Large Preview Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-full max-w-sm aspect-[3/4] rounded-2xl bg-gradient-to-b ${template.color} border border-border p-8 flex flex-col items-center justify-center`}
            >
              {/* Header Photo Circle */}
              <div
                className={`w-32 h-32 rounded-full ${template.accent} mb-8 flex items-center justify-center`}
              >
                <div className="w-20 h-20 rounded-full bg-card/80 backdrop-blur-sm" />
              </div>

              {/* Dummy Content */}
              <div className="w-full space-y-4 text-center">
                <div className="w-48 h-4 rounded bg-foreground/10 mx-auto" />
                <div className="w-40 h-3 rounded bg-foreground/5 mx-auto" />
              </div>

              {/* Dummy Text Blocks */}
              <div className="mt-12 w-full space-y-3">
                <div className="w-full h-3 rounded bg-foreground/5" />
                <div className="w-5/6 h-3 rounded bg-foreground/5 mx-auto" />
                <div className="w-4/5 h-3 rounded bg-foreground/5 mx-auto" />
              </div>

              {/* Dummy Footer */}
              <div className="mt-auto w-full flex gap-4 justify-center">
                <div className="w-12 h-12 rounded-full bg-foreground/5" />
                <div className="w-12 h-12 rounded-full bg-foreground/5" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center max-w-md"
            >
              <h3 className="font-display text-xl font-semibold mb-2">
                Kết Hợp Hoàn Hảo
              </h3>
              <p className="text-muted-foreground text-sm">
                Mẫu thiết kế này kết hợp {template.description.toLowerCase()} để
                tạo ra một giao diện độc đáo và đẹp mắt cho kỷ niệm của bạn.
              </p>
            </motion.div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border p-6 flex gap-4 justify-center">
            <Button variant="outline" size="lg" className="gap-2">
              <Heart className="w-4 h-4" />
              Yêu Thích
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Share2 className="w-4 h-4" />
              Chia Sẻ
            </Button>
            <Button variant="gold" size="lg">
              Sử Dụng Mẫu Này
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplatePreview;
