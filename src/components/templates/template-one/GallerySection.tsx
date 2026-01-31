import { ColorScheme, Image } from "@/types";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export type GallerySectionProps = {
  colors: ColorScheme;
  images: Image[];
  onImageClick: (index: number) => void;
};

const GallerySection: React.FC<GallerySectionProps> = ({
  colors,
  images,
  onImageClick,
}) => {
  return (
    <section className="py-16 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-2"
        >
          <Camera
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors?.primary }}
          />

          <h2
            className="
            font-['Allura']
            font-normal
            text-[55px]
            leading-[60px]
            text-center
            mb-4
          "
            style={{ color: colors?.text }}
          >
            Khoảnh Khắc Yêu Thương
          </h2>

          <p
            className="
            font-['Playfair_Display']
            text-[16px]
            md:text-[18px]
            text-center
          "
            style={{ color: colors?.muted }}
          >
            Những bức ảnh đẹp nhất trong hành trình của chúng tôi
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {images?.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                index === 0 ? "md:col-span-2 md:row-span-2" : "aspect-square"
              }`}
              onClick={() => onImageClick(index)}
            >
              {/* IMAGE WRAPPER (chống bể) */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <motion.img
                  src={image.url}
                  alt={image.id}
                  className="w-full h-full object-cover"
                  style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>

              {/* Gradient overlay (sống động hơn) */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
                }}
              />

              {/* Caption */}
              <motion.div
                className="absolute inset-0 flex items-end p-5 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <span className="text-white text-sm md:text-base font-medium tracking-wide drop-shadow-xl">
                  {image.id}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
