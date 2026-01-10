import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDateFromTimestamp } from "@/lib/utils";
import { ColorScheme, IWeddingEvent } from "@/types";
import { motion } from "framer-motion";

export type EventsTimelineSectionProps = {
  colors: ColorScheme;
  events: IWeddingEvent[];
};

const EventsTimelineSection: React.FC<EventsTimelineSectionProps> = ({
  colors,
  events,
}) => {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(
          to bottom,
          ${colors?.accent}CC 0%,   
          ${colors?.accent}80 40%,   
          ${colors?.accent}00 75%,   
          ${colors?.accent}CC 100%   
        )`,
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Calendar
            className="w-14 h-14 mx-auto mb-6"
            style={{ color: colors?.primary }}
          />
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors?.text }}
          >
            Lịch Trình Ngày Cưới
          </h2>
          <p className="text-lg" style={{ color: colors?.muted }}>
            Những khoảnh khắc đáng nhớ trong ngày trọng đại
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div
            className="absolute left-2 top-0 bottom-0 w-0.5"
            style={{
              background: `linear-gradient(to bottom, ${colors?.primary}, ${colors?.secondary})`,
            }}
          />

          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:pr-1/2 md:pl-8 md:text-right"
                  : "md:pl-1/2 md:pr-8 md:text-left"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className="absolute left-[1px] top-1/2 w-4 h-4 rounded-full z-10 shadow-lg"
                style={{ background: colors?.primary }}
              />

              <div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <div
                  className="p-6 rounded-2xl backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, white 0%, ${colors?.accent}10 100%)`,
                    borderColor: `${colors?.primary}20`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md"
                      style={{ background: `${colors?.primary}10` }}
                    >
                      <Clock
                        className="w-6 h-6"
                        style={{ color: colors?.primary }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-display text-xl font-semibold mb-2"
                        style={{ color: colors?.text }}
                      >
                        {event.title}
                      </h3>
                      <p
                        className="font-medium mb-2"
                        style={{ color: colors?.primary }}
                      >
                        ⏰ {event.startTime}-{event.endTime} • 📅
                        {formatDateFromTimestamp(event.eventDate)}
                      </p>
                      <p className="mb-2" style={{ color: colors?.muted }}>
                        {event.description}
                      </p>
                      <p
                        className="text-sm flex items-start gap-2"
                        style={{ color: colors?.muted }}
                      >
                        <MapPin className="w-4 h-4 shrink-0 mt-1" />
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsTimelineSection;
