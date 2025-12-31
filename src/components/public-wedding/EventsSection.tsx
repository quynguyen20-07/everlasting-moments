import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import type { Wedding } from "@/types/graphql";

interface EventsSectionProps {
  wedding: Wedding;
}

const eventTypeLabels: Record<string, string> = {
  ceremony: "Lễ Cưới",
  reception: "Tiệc Cưới",
  engagement: "Lễ Đính Hôn",
  pre_wedding: "Tiệc Pre-Wedding",
  tea_ceremony: "Lễ Vu Quy",
  other: "Sự Kiện",
};

const eventTypeIcons: Record<string, string> = {
  ceremony: "💒",
  reception: "🎉",
  engagement: "💍",
  pre_wedding: "🥂",
  tea_ceremony: "🍵",
  other: "✨",
};

export function EventsSection({ wedding }: EventsSectionProps) {
  const events = wedding.weddingDetail?.weddingEvents || [];

  if (events.length === 0) return null;

  // Sort events by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );

  return (
    <section className="py-20 px-4 bg-background invitation-pattern">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Sự Kiện Cưới
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-shadow duration-300"
            >
              {/* Event type badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{eventTypeIcons[event.type] || "✨"}</span>
                <span className="px-3 py-1 bg-champagne/10 rounded-full text-sm font-medium text-primary">
                  {eventTypeLabels[event.type] || event.type}
                </span>
              </div>

              {/* Event title */}
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">
                {event.title}
              </h3>

              {/* Event details */}
              <div className="space-y-3 text-muted-foreground">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-elegant">
                    {new Date(event.eventDate).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Time */}
                {(event.startTime || event.endTime) && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-elegant">
                      {event.startTime}
                      {event.endTime && ` - ${event.endTime}`}
                    </span>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-elegant">{event.address}</span>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <p className="mt-4 pt-4 border-t border-border/50 font-elegant text-sm text-muted-foreground/80">
                  {event.description}
                </p>
              )}

              {/* Map embed */}
              {event.mapEmbedUrl && (
                <div className="mt-4 rounded-xl overflow-hidden h-40">
                  <iframe
                    src={event.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map - ${event.title}`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
