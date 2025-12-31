import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface GallerySectionProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  onGalleryClick: (index: number) => void;
  currentImageIndex: number;
}

const GallerySection = ({ colors, onGalleryClick }: GallerySectionProps) => {
  const galleryImages = useMemo(
    () => [
      { id: 1, alt: "Khoảnh khắc đầu tiên" },
      { id: 2, alt: "Buổi hẹn hò đầu tiên" },
      { id: 3, alt: "Cầu hôn lãng mạn" },
      { id: 4, alt: "Chụp ảnh tiền cưới" },
      { id: 5, alt: "Lễ ăn hỏi" },
      { id: 6, alt: "Khoảnh khắc hiện tại" },
    ],
    []
  );

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Camera
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors.primary }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Khoảnh Khắc Yêu Thương
          </h2>
          <p className="text-lg" style={{ color: colors.muted }}>
            Những bức ảnh đẹp nhất trong hành trình của chúng tôi
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`aspect-square rounded-2xl overflow-hidden cursor-pointer group relative ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => onGalleryClick(index)}
            >
              <div
                className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 30%, white 100%)`,
                }}
              >
                <div className="text-center p-4">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `${colors.primary}20`,
                      border: `2px dashed ${colors.primary}40`,
                    }}
                  >
                    <Camera
                      className="w-8 h-8"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <span
                    className="font-medium block"
                    style={{ color: colors.text }}
                  >
                    {image.alt}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === 0
                  ? "w-8 bg-primary"
                  : "bg-gray-300 hover:bg-primary/50"
              }`}
              style={{
                backgroundColor: index === 0 ? colors.primary : undefined,
              }}
              onClick={() => onGalleryClick(index)}
              aria-label={`Xem ảnh ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
