import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ImageLightboxProps = {
  images: { url: string; id: string }[];
  activeIndex: number | null;
  onClose: () => void;
};

const ImageLightbox = ({
  images,
  activeIndex,
  onClose,
}: ImageLightboxProps) => {
  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          className="
            fixed inset-0 z-[100]
            bg-black/80
            flex items-center justify-center
            px-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition"
            onClick={onClose}
          >
            <X className="w-7 h-7" />
          </button>

          {/* Image */}
          <motion.img
            src={images[activeIndex].url}
            alt={images[activeIndex].id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
              max-h-[85vh]
              max-w-full
              rounded-xl
              shadow-2xl
              object-contain
            "
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
