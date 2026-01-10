import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ColorScheme, ILoveStory } from "@/types";
import { Heart, Calendar } from "lucide-react";
import { formatDateVN } from "@/lib/utils";

export type LoveStorySectionProps = {
  colors: ColorScheme;
  stories: ILoveStory[];
};

const LoveStorySection: React.FC<LoveStorySectionProps> = ({
  colors,
  stories,
}) => {
  const sortedStories = [...stories].sort(
    (a, b) => Number(a.storyDate) - Number(b.storyDate)
  );

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(
          to bottom,
          ${colors?.accent}00 0%,
          ${colors?.accent}40 40%,
          ${colors?.accent}80 75%
        )`,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Heart
            className="w-14 h-14 mx-auto mb-8 animate-pulse"
            style={{
              color: colors?.primary,
              fill: `${colors?.primary}20`,
            }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: colors?.text }}
          >
            Câu Chuyện Của Chúng Tôi
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{ background: `${colors?.primary}40` }}
          />

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {sortedStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-14"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-6 w-5 h-5 rounded-full border-4 shadow-sm"
                    style={{
                      background: colors?.primary,
                      borderColor: colors?.background ?? "#fff",
                    }}
                  />

                  <Card
                    className="backdrop-blur-sm"
                    style={{
                      background: `${colors?.accent}10`,
                      borderColor: `${colors?.primary}20`,
                    }}
                  >
                    <CardContent className="p-6">
                      {story.storyDate && (
                        <div
                          className="text-xs mb-2 flex items-center gap-1"
                          style={{ color: `${colors?.text}80` }}
                        >
                          <Calendar className="w-3 h-3" />
                          {formatDateVN(story.storyDate)}
                        </div>
                      )}

                      <h3
                        className="font-display text-xl font-semibold mb-2"
                        style={{ color: colors?.text }}
                      >
                        {story.title}
                      </h3>

                      <p
                        className="font-serif leading-relaxed text-justify"
                        style={{ color: `${colors?.text}CC` }}
                      >
                        {story.content}
                      </p>

                      {story.imageUrl && (
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="mt-4 rounded-xl max-h-64 object-cover"
                        />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
