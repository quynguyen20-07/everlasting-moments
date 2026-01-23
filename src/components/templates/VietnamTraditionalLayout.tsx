import { motion } from "framer-motion";
import { Heart, MapPin, Calendar } from "lucide-react";
import type { IWeddingEvent, ILoveStory, BrideGroom } from "@/types/wedding";
import type { TemplateTheme } from "@/lib/templates/wedding-templates";
import type { ColorScheme, Wish } from "@/types";
import RSVPSection, { RSVPFormData } from "@/components/wedding-ui/RSVPSection";
import BankAccountSection, { BankAccountInfo } from "@/components/wedding-ui/BankAccountSection";
import GuestWishesSection, { WishFormData } from "@/components/wedding-ui/GuestWishesSection";

// Helper to format timestamp to Date
const formatTimestamp = (timestamp: string | number): Date => {
  const ts = typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;
  return new Date(ts);
};

// Format date parts
const formatDateParts = (timestamp: string | number) => {
  const date = formatTimestamp(timestamp);
  const dayOfWeek = date.toLocaleDateString("vi-VN", { weekday: "long" });
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { dayOfWeek, day, month, year };
};

// Format full date Vietnamese
const formatFullDateVi = (timestamp: string | number) => {
  const date = formatTimestamp(timestamp);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export interface VietnamTraditionalLayoutProps {
  theme: TemplateTheme;
  bride?: BrideGroom;
  groom?: BrideGroom;
  weddingDate?: string | number;
  weddingId?: string;
  events?: IWeddingEvent[];
  loveStories?: ILoveStory[];
  galleryImages?: { id: string; url: string; caption?: string }[];
  onImageClick?: (index: number) => void;
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>;
  brideAccount?: BankAccountInfo;
  groomAccount?: BankAccountInfo;
  wishes?: Wish[];
  onWishSubmit?: (data: WishFormData) => Promise<void>;
}

const VietnamTraditionalLayout: React.FC<VietnamTraditionalLayoutProps> = ({
  theme,
  bride,
  groom,
  weddingDate,
  weddingId,
  events = [],
  loveStories = [],
  galleryImages = [],
  onImageClick,
  onRSVPSubmit,
  brideAccount,
  groomAccount,
  wishes = [],
  onWishSubmit,
}) => {
  const colors = theme.colors;
  const primaryColor = `hsl(${colors.primary})`;
  const backgroundColor = `hsl(${colors.background})`;
  const foregroundColor = `hsl(${colors.foreground})`;
  const accentColor = `hsl(${colors.accent})`;
  const mutedColor = `hsl(${colors.muted})`;
  const cardColor = `hsl(${colors.card})`;

  // Create ColorScheme for RSVPSection compatibility
  const rsvpColors: ColorScheme = {
    primary: primaryColor,
    secondary: accentColor,
    accent: `hsl(${colors.accent})`,
    background: backgroundColor,
    text: foregroundColor,
    muted: mutedColor,
  };

  // Get main ceremony event
  const mainEvent = events.find((e) => e.type === "ceremony") || events[0];
  const dateParts = weddingDate ? formatDateParts(weddingDate) : null;

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor, color: foregroundColor }}
    >
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-12 px-4 text-center">
        {/* Floral decoration top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/images/wedding06.webp"
            alt="Couple"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 shadow-xl"
            style={{ borderColor: primaryColor }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="font-serif text-4xl md:text-5xl italic mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
          >
            Happy Wedding
          </h1>
          <p
            className="text-xl md:text-2xl font-light tracking-wide"
            style={{ color: foregroundColor }}
          >
            {bride?.fullName || "Cô Dâu"}{" "}
            <span style={{ color: primaryColor }}>&</span>{" "}
            {groom?.fullName || "Chú Rể"}
          </p>
        </motion.div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
          <Heart className="w-4 h-4" style={{ color: primaryColor, fill: primaryColor }} />
          <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
        </div>
      </section>

      {/* ===== DATE BLOCK SECTION ===== */}
      {dateParts && (
        <section className="py-8 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-xs mx-auto p-6 rounded-2xl shadow-lg"
            style={{ backgroundColor: cardColor }}
          >
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: mutedColor }}>
              {dateParts.dayOfWeek}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-right">
                <p className="text-sm" style={{ color: mutedColor }}>
                  {dateParts.month < 10 ? `0${dateParts.month}` : dateParts.month}
                </p>
                <p className="text-xs" style={{ color: mutedColor }}>{dateParts.year}</p>
              </div>
              <div
                className="text-5xl md:text-6xl font-bold px-4 border-x-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                {dateParts.day}
              </div>
              <div className="text-left">
                <p className="text-sm" style={{ color: mutedColor }}>
                  {mainEvent?.startTime || "10:00"}
                </p>
                <p className="text-xs" style={{ color: mutedColor }}>Giờ</p>
              </div>
            </div>
            {mainEvent && (
              <div className="mt-4 text-sm" style={{ color: foregroundColor }}>
                <p className="font-medium">Địa điểm tổ chức:</p>
                <p className="italic" style={{ color: primaryColor }}>{mainEvent.title}</p>
                <p className="text-xs mt-1" style={{ color: mutedColor }}>{mainEvent.address}</p>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ===== BRIDE & GROOM INTRODUCTION ===== */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2
            className="font-serif text-2xl md:text-3xl italic"
            style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
          >
            Giới Thiệu
          </h2>
          <p className="text-sm mt-1" style={{ color: mutedColor }}>
            Cô Dâu & Chú Rể
          </p>
        </motion.div>

        <div className="max-w-md mx-auto space-y-8">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <img
              src={bride?.avatar || "/images/co-dau.webp"}
              alt={bride?.fullName || "Cô Dâu"}
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
            <div>
              <p className="font-semibold text-lg" style={{ color: foregroundColor }}>
                {bride?.fullName || "Cô Dâu"}
              </p>
              <p className="text-sm" style={{ color: mutedColor }}>
                {bride?.shortBio || "Con gái ông bà..."}
              </p>
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <img
              src={groom?.avatar || "/images/chu-re.webp"}
              alt={groom?.fullName || "Chú Rể"}
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
            <div>
              <p className="font-semibold text-lg" style={{ color: foregroundColor }}>
                {groom?.fullName || "Chú Rể"}
              </p>
              <p className="text-sm" style={{ color: mutedColor }}>
                {groom?.shortBio || "Con trai ông bà..."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SAVE THE DATE / EVENTS SECTION ===== */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2
            className="font-serif text-2xl md:text-3xl italic"
            style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
          >
            Save The Date
          </h2>
        </motion.div>

        <div className="max-w-md mx-auto space-y-6">
          {events.map((event, index) => {
            const eventDateParts = formatDateParts(event.eventDate);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl text-center shadow-md"
                style={{ backgroundColor: cardColor }}
              >
                <h3
                  className="font-serif text-xl italic mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
                >
                  {event.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: mutedColor }}>
                  <MapPin className="inline w-3 h-3 mr-1" />
                  {event.address}
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="text-right">
                    <p className="text-xs" style={{ color: mutedColor }}>
                      {eventDateParts.dayOfWeek}
                    </p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      {eventDateParts.month < 10 ? `0${eventDateParts.month}` : eventDateParts.month}.{eventDateParts.year}
                    </p>
                  </div>
                  <div
                    className="text-3xl font-bold px-3 border-x-2"
                    style={{ color: primaryColor, borderColor: primaryColor }}
                  >
                    {eventDateParts.day}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium" style={{ color: foregroundColor }}>
                      {event.startTime || "10:00"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== LOVE STORY TIMELINE ===== */}
      {loveStories.length > 0 && (
        <section className="py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2
              className="font-serif text-2xl md:text-3xl italic"
              style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
            >
              Chuyện Tình Yêu
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto space-y-6">
            {loveStories.map((story, index) => {
              const storyDate = story.storyDate ? formatFullDateVi(story.storyDate) : null;
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-2 w-4 h-4 rounded-full border-2"
                    style={{ borderColor: primaryColor, backgroundColor: cardColor }}
                  />
                  {/* Timeline line */}
                  {index < loveStories.length - 1 && (
                    <div
                      className="absolute left-[7px] top-6 w-0.5 h-full"
                      style={{ backgroundColor: `${primaryColor}40` }}
                    />
                  )}

                  <div
                    className="p-4 rounded-xl shadow-sm"
                    style={{ backgroundColor: cardColor }}
                  >
                    <h4 className="font-semibold mb-1" style={{ color: foregroundColor }}>
                      {story.title}
                    </h4>
                    {storyDate && (
                      <p className="text-xs mb-2 flex items-center gap-1" style={{ color: mutedColor }}>
                        <Calendar className="w-3 h-3" />
                        {storyDate}
                      </p>
                    )}
                    <p className="text-sm" style={{ color: mutedColor }}>
                      {story.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== GALLERY SECTION ===== */}
      {galleryImages.length > 0 && (
        <section className="py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2
              className="font-serif text-2xl md:text-3xl italic"
              style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
            >
              Hình Cưới Chúng Mình
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
            {galleryImages.slice(0, 6).map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative rounded-xl overflow-hidden cursor-pointer ${
                  index === 0 ? "col-span-2 aspect-video" : "aspect-square"
                }`}
                onClick={() => onImageClick?.(index)}
              >
                <img
                  src={image.url}
                  alt={image.caption || `Wedding ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ===== GUEST WISHES SECTION ===== */}
      {onWishSubmit && weddingId && (
        <GuestWishesSection
          colors={rsvpColors}
          wishes={wishes}
          weddingId={weddingId}
          onSubmit={onWishSubmit}
        />
      )}

      {/* ===== RSVP SECTION ===== */}
      {onRSVPSubmit && weddingId && (
        <RSVPSection
          colors={rsvpColors}
          weddingId={weddingId}
          onSubmit={onRSVPSubmit}
        />
      )}

      {/* ===== BANK ACCOUNT / GIFT SECTION ===== */}
      <BankAccountSection
        colors={{
          primary: primaryColor,
          secondary: accentColor,
          accent: accentColor,
          background: backgroundColor,
          text: foregroundColor,
          muted: mutedColor,
        }}
        brideAccount={brideAccount}
        groomAccount={groomAccount}
        brideName={bride?.fullName}
        groomName={groom?.fullName}
      />

      {/* ===== THANK YOU / FOOTER ===== */}
      <section className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="font-serif text-3xl md:text-4xl italic mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: primaryColor }}
          >
            Thank you!
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
            <Heart className="w-5 h-5" style={{ color: primaryColor, fill: primaryColor }} />
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default VietnamTraditionalLayout;
