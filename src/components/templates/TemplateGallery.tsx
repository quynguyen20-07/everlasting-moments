import {
  weddingTemplates,
  styleLabels,
  type WeddingTemplate,
  type LayoutStyle,
} from "@/lib/templates/wedding-templates";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { TemplateCard } from "./TemplateCard";

interface TemplateGalleryProps {
  selectedId?: string;
  onSelect?: (template: WeddingTemplate) => void;
}

export function TemplateGallery({
  selectedId,
  onSelect,
}: TemplateGalleryProps) {
  const [filter, setFilter] = useState<LayoutStyle | "all">("all");

  const filteredTemplates =
    filter === "all"
      ? weddingTemplates
      : weddingTemplates.filter((t) => t.style === filter);

  const styles: Array<LayoutStyle | "all"> = [
    "all",
    "classic",
    "romantic",
    "minimalist",
    "luxury",
    "rustic",
    "modern",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-elegant text-sm">Các Mẫu Thiệp Premium</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-3"
        >
          Chọn Mẫu Thiệp Cưới
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-elegant text-lg text-muted-foreground max-w-xl mx-auto"
        >
          Mỗi mẫu thiệp được thiết kế tinh tế với bố cục riêng biệt, có thể kết hợp với nhiều bảng màu khác nhau
        </motion.p>
      </div>

      {/* Style Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setFilter(style)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                filter === style
                  ? "gold-gradient text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }
            `}
          >
            {style === "all" ? "Tất cả" : styleLabels[style]}
          </button>
        ))}
      </motion.div>

      {/* Template Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <TemplateCard
              template={template}
              isSelected={selectedId === template.id}
              onSelect={onSelect}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Không có mẫu thiệp nào phù hợp với bộ lọc
          </p>
        </div>
      )}
    </div>
  );
}
