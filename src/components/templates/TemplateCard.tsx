import { motion } from "framer-motion";
import { Check, Heart } from "lucide-react";
import type { WeddingTemplate, TemplateTheme } from "@/lib/templates/wedding-templates";

interface TemplateCardProps {
  template: WeddingTemplate;
  isSelected?: boolean;
  onSelect?: (template: WeddingTemplate) => void;
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const theme = template.theme;
  const primaryHsl = theme.colors.primary;
  const secondaryHsl = theme.colors.secondary;
  const bgHsl = theme.colors.background;
  const fgHsl = theme.colors.foreground;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(template)}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300
        ${isSelected 
          ? 'border-primary shadow-elegant ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/30 hover:shadow-soft'
        }
      `}
    >
      {/* Template Preview */}
      <div
        className="aspect-[3/4] relative overflow-hidden"
        style={{ backgroundColor: `hsl(${bgHsl})` }}
      >
        {/* Mock Hero Section */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          style={{ color: `hsl(${fgHsl})` }}
        >
          {/* Decorative Top */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-px"
            style={{ background: theme.gradient }}
          />
          
          {/* Heart Icon */}
          <Heart
            className="w-8 h-8 mb-4"
            style={{ color: `hsl(${primaryHsl})` }}
            fill={`hsl(${primaryHsl})`}
          />

          {/* Names */}
          <div className="text-center">
            <p
              className="font-display text-lg mb-1"
              style={{ fontFamily: template.fonts.heading }}
            >
              Minh & Hương
            </p>
            <div
              className="w-12 h-px mx-auto my-2"
              style={{ background: theme.gradient }}
            />
            <p
              className="text-xs opacity-70"
              style={{ fontFamily: template.fonts.body }}
            >
              20.12.2024
            </p>
          </div>

          {/* Decorative Elements */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs"
            style={{
              background: `hsl(${secondaryHsl})`,
              color: `hsl(${primaryHsl})`,
            }}
          >
            Xác nhận tham dự
          </div>

          {/* Corner Decorations */}
          <div
            className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg"
            style={{ borderColor: `hsl(${primaryHsl} / 0.3)` }}
          />
          <div
            className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg"
            style={{ borderColor: `hsl(${primaryHsl} / 0.3)` }}
          />
          <div
            className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg"
            style={{ borderColor: `hsl(${primaryHsl} / 0.3)` }}
          />
          <div
            className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg"
            style={{ borderColor: `hsl(${primaryHsl} / 0.3)` }}
          />
        </div>

        {/* Selected Overlay */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/10 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-6 h-6 text-primary-foreground" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-4 bg-card">
        <h3 className="font-display text-lg text-foreground mb-1">
          {template.nameVi}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.descriptionVi}
        </p>
        
        {/* Color Swatches */}
        <div className="flex gap-1.5 mt-3">
          <div
            className="w-5 h-5 rounded-full border border-border/50"
            style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
            title="Màu chính"
          />
          <div
            className="w-5 h-5 rounded-full border border-border/50"
            style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
            title="Màu phụ"
          />
          <div
            className="w-5 h-5 rounded-full border border-border/50"
            style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
            title="Màu nhấn"
          />
        </div>
      </div>
    </motion.div>
  );
}
