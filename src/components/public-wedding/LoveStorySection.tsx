import { motion } from "framer-motion";
import type { Wedding } from "@/types/graphql";

interface LoveStorySectionProps {
  wedding: Wedding;
}

export function LoveStorySection({ wedding }: LoveStorySectionProps) {
  const stories = wedding.weddingDetail?.loveStories || [];

  if (stories.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-blush-light/20 to-background">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Chuyện Tình Yêu
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-champagne via-dusty-rose to-champagne" />

          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-champagne rounded-full border-4 border-background shadow-soft z-10" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="glass-card p-6 rounded-2xl shadow-soft">
                  {/* Date badge */}
                  {story.storyDate && (
                    <div className={`inline-block mb-3 px-3 py-1 bg-champagne/10 rounded-full ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                      <span className="text-sm font-elegant text-primary">
                        {new Date(story.storyDate).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  )}

                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                    {story.title}
                  </h3>

                  <p className="font-elegant text-muted-foreground leading-relaxed">
                    {story.content}
                  </p>

                  {/* Story image */}
                  {story.imageUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Spacer for timeline alignment */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
