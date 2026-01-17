import { Facebook, Instagram, LinkIcon, X } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "../ui/button";

type Props = {
  title: ReactNode;
  colorsText: string;
  colorsPrimary: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ShareModal = ({
  title,
  colorsText,
  colorsPrimary,
  open,
  setOpen,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3
                className="font-display text-2xl font-semibold"
                style={{ color: colorsText }}
              >
                Chia Sẻ Thiệp Mời
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="hover:bg-red-50"
                style={{ color: colorsPrimary }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Facebook, label: "Facebook", color: "#1877F2" },
                { icon: Instagram, label: "Instagram", color: "#E4405F" },
                {
                  icon: LinkIcon,
                  label: "Sao Chép",
                  color: colorsPrimary,
                  action: () => {
                    navigator.clipboard.writeText(window.location.href);
                    toast(
                      <div className="space-y-1">
                        <div className="font-semibold">{title}</div>
                        <div className="text-sm text-muted-foreground">
                          Liên kết đã được sao chép vào bộ nhớ tạm.
                        </div>
                      </div>,
                    );
                  },
                },
              ].map((item, index) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    background: `${item.color}10`,
                    border: `1px solid ${item.color}30`,
                  }}
                  onClick={item.action}
                >
                  <item.icon
                    className="w-8 h-8"
                    style={{ color: item.color }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
