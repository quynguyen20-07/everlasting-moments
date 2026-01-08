import {
  Calendar,
  Camera,
  ChevronDown,
  Clock,
  Facebook,
  Gift,
  Heart,
  Instagram,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Send,
  Share2,
  Users,
  X,
  ArrowLeft,
  Sparkles,
  Flower2,
  Gem,
} from "lucide-react";
import { useEffect, useState, useMemo, useRef, useId } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MusicPlayer } from "@/components/public-wedding";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TEMPLATES_LIST } from "@/lib/utils";

const templatesData = Object.fromEntries(
  TEMPLATES_LIST.map((t) => [
    t.id,
    {
      ...t,
      colorName: t.name.toLowerCase(),
    },
  ])
);

// Color schemes for the 6 premium templates
const COLOR_SCHEMES = {
  "golden-elegance": {
    primary: "#B8860B", // Dark golden rod
    secondary: "#D4AF37", // Gold
    accent: "#F5DEB3", // Wheat
    background: "#FFFEF7", // Cream
    text: "#3D2914", // Dark brown
    muted: "#8B7355", // Tan
  },
  "blush-romance": {
    primary: "#DB7093", // Pale violet red
    secondary: "#FFB6C1", // Light pink
    accent: "#FFF0F5", // Lavender blush
    background: "#FFF8FA", // Very light pink
    text: "#4A0E2B", // Dark pink
    muted: "#C08497", // Dusty rose
  },
  "sage-garden": {
    primary: "#6B8E6B", // Sage green
    secondary: "#8FBC8F", // Dark sea green
    accent: "#F0FFF0", // Honeydew
    background: "#F5FAF5", // Light green tint
    text: "#2D4A2D", // Forest green
    muted: "#698B69", // Olive drab
  },
  "midnight-luxe": {
    primary: "#D4AF37", // Gold
    secondary: "#1E3A5F", // Dark navy
    accent: "#C9B037", // Metallic gold
    background: "#0F172A", // Dark navy
    text: "#F1E5D1", // Cream
    muted: "#94A3B8", // Slate
  },
  "pure-minimal": {
    primary: "#1A1A1A", // Near black
    secondary: "#4A4A4A", // Dark gray
    accent: "#F5F5F5", // White smoke
    background: "#FFFFFF", // White
    text: "#1A1A1A", // Near black
    muted: "#6B6B6B", // Gray
  },
  "lavender-dream": {
    primary: "#9370DB", // Medium purple
    secondary: "#B19CD9", // Light purple
    accent: "#E6E6FA", // Lavender
    background: "#FAF8FF", // Very light purple
    text: "#4A3A6A", // Dark purple
    muted: "#8B7CB8", // Medium lavender
  },
};

// Default color scheme fallback (golden elegance)
const DEFAULT_COLORS = {
  primary: "#B8860B",
  secondary: "#D4AF37",
  accent: "#F5DEB3",
  background: "#FFFEF7",
  text: "#3D2914",
  muted: "#8B7355",
};

// Mock couple data
const coupleData = {
  bride: { name: "Ngọc Linh", fullName: "Nguyễn Ngọc Linh" },
  groom: { name: "Minh Tuấn", fullName: "Trần Minh Tuấn" },
  weddingDate: new Date("2025-02-14T10:00:00"),
  story: `Trong một chiều mưa Đà Nẵng, tại quán cà phê nhỏ ven sông Hàn, 
  chúng tôi đã gặp nhau một cách tình cờ. Một cuốn sách rơi, một ánh mắt giao nhau, 
  và thế là hành trình yêu thương bắt đầu. 
  Từ những buổi hoàng hôn trên biển Mỹ Khê đến những đêm trò chuyện dài dưới ánh sao, 
  mỗi khoảnh khắc đều là một mảnh ghép hoàn hảo cho tình yêu của chúng tôi. 
  Hôm nay, chúng tôi chính thức bước tiếp hành trình ấy bên nhau, 
  với lời hứa về một tương lai tràn đầy yêu thương và hạnh phúc.`,
  events: [
    {
      name: "Lễ Vu Quy",
      date: "14/02/2025",
      time: "08:00",
      location: "Nhà Gái - 123 Đường ABC, Quận 1, TP.HCM",
      description: "Lễ đón dâu truyền thống",
    },
    {
      name: "Lễ Thành Hôn",
      date: "14/02/2025",
      time: "10:00",
      location: "Nhà Trai - 456 Đường XYZ, Quận 7, TP.HCM",
      description: "Lễ kết hôn chính thức",
    },
    {
      name: "Tiệc Cưới",
      date: "14/02/2025",
      time: "18:00",
      location: "Trung Tâm Hội Nghị White Palace",
      description: "Tiệc mừng cùng gia đình và bạn bè",
    },
  ],
  wishes: [
    {
      name: "Anh Khoa",
      message:
        "Chúc hai bạn trăm năm hạnh phúc! Tình yêu luôn nồng ấm như ngày đầu 💕",
      date: "2 ngày trước",
    },
    {
      name: "Hương Giang",
      message:
        "Mong rằng cuộc sống của hai bạn sẽ tràn ngập tiếng cười và yêu thương!",
      date: "3 ngày trước",
    },
    {
      name: "Minh Đức",
      message:
        "Chúc mừng hai bạn! Thật hạnh phúc khi chứng kiến tình yêu của các bạn nở hoa ✨",
      date: "1 ngày trước",
    },
  ],
  bankInfo: {
    bride: {
      bank: "Vietcombank",
      account: "1234567890",
      name: "NGUYEN NGOC LINH",
      branch: "Chi nhánh Hồ Chí Minh",
    },
    groom: {
      bank: "Techcombank",
      account: "0987654321",
      name: "TRAN MINH TUAN",
      branch: "Chi nhánh Hà Nội",
    },
  },
};

const TemplateDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const divId = useId();

  const template = templatesData[slug as keyof typeof templatesData];
  const colors =
    COLOR_SCHEMES[slug as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attending: true,
  });
  const [wishData, setWishData] = useState({ name: "", message: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const galleryImages = useMemo(
    () => [
      {
        id: 1,
        alt: "Ảnh cưới 1",
        src: "/images/wedding06.webp",
      },
      { id: 2, alt: "Ảnh cưới 2", src: "/images/wedding01.jpg" },
      { id: 3, alt: "Ảnh cưới 3", src: "/images/wedding02.jpg" },
      { id: 4, alt: "Ảnh cưới 4", src: "/images/wedding03.jpg" },
      { id: 5, alt: "Ảnh cưới 5", src: "/images/wedding04.jpg" },
      { id: 6, alt: "Ảnh cưới 6", src: "/images/wedding05.jpg" },
    ],
    []
  );

  useEffect(() => {
    if (!template) {
      navigate("/templates");
      return;
    }

    const calculateCountdown = () => {
      const now = new Date();
      const diff = coupleData.weddingDate.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [template, navigate]);

  useEffect(() => {
    // const audio = new Audio("/public/music/beautiful-in-white.mp3");
    const audio = new Audio("/music/i-do.mp3");
    audio.loop = true;
    audio.volume = 0.6;

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã Xác Nhận!",
      description: "Cảm ơn bạn đã xác nhận sẽ tham dự.",
    });
    setRsvpData({ name: "", phone: "", guests: "1", attending: true });
  };

  const handleWish = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã Gửi Lời Chúc!",
      description: "Cảm ơn bạn đã gửi lời chúc tuyệt vời!",
    });
    setWishData({ name: "", message: "" });
  };

  const handleGalleryClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasInteracted(true);
      }
    } catch (err) {
      console.error("Audio play bị chặn:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--accent": colors.accent,
          "--background": colors.background,
          "--text": colors.text,
          "--muted": colors.muted,
        } as React.CSSProperties
      }
    >
      {/* Header Back Button */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-primary/10 transition-colors"
            onClick={() => navigate("/templates")}
          >
            <ArrowLeft className="w-4 h-4" />
            Quay Lại
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.accent}20 100%)`,
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: colors.primary }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: colors.secondary }}
          />

          {/* Floral Elements */}
          <div className="absolute top-10 left-10 opacity-10">
            <Flower2 className="w-32 h-32" style={{ color: colors.primary }} />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <Gem className="w-32 h-32" style={{ color: colors.secondary }} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Template Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-12 shadow-lg"
            >
              <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
              <span
                className="text-sm font-semibold tracking-wider"
                style={{ color: colors.text }}
              >
                {template.name}
              </span>
            </motion.div>

            {/* Names - Modern Typography */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="inline-block" style={{ color: colors.primary }}>
                {coupleData.bride.name}
              </span>
              <span className="mx-4 md:mx-8" style={{ color: colors.muted }}>
                &
              </span>
              <span className="inline-block" style={{ color: colors.primary }}>
                {coupleData.groom.name}
              </span>
            </h1>

            {/* Date with elegant typography */}
            <div className="mb-12">
              <p
                className="font-serif text-xl md:text-2xl tracking-widest mb-2"
                style={{ color: colors.muted }}
              >
                CÙNG BẠN ĐẾN TRỌN ĐỜI
              </p>
              <p
                className="font-display text-3xl md:text-4xl font-semibold"
                style={{ color: colors.text }}
              >
                14 Tháng 2, 2025
              </p>
            </div>

            {/* Decorative Hearts */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
              {/* Bride */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
                className="
      relative
      w-32 h-32
      md:w-48 md:h-48
      rounded-full
      border-4
      shadow-xl
      overflow-hidden
      flex-shrink-0
    "
                style={{ borderColor: `${colors.primary}30` }}
              >
                {/* Gradient UNDER image */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}25 0%, white 60%)`,
                  }}
                />

                {/* Image */}
                <motion.img
                  src="/images/co-dau.webp"
                  alt="Cô dâu"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>

              {/* Heart */}
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  className="w-10 h-10 md:w-14 md:h-14"
                  style={{ color: colors.primary, fill: colors.primary }}
                />
              </motion.div>

              {/* Groom */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
                className="
      relative
      w-32 h-32
      md:w-48 md:h-48
      rounded-full
      border-4
      shadow-xl
      overflow-hidden
      flex-shrink-0
    "
                style={{ borderColor: `${colors.primary}30` }}
              >
                {/* Gradient UNDER image */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(135deg, white 0%, ${colors.accent}25 100%)`,
                  }}
                />

                {/* Image */}
                <motion.img
                  src="/images/chu-re.webp"
                  alt="Chú Rể"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-16">
              {[
                { value: countdown.days, label: "NGÀY" },
                { value: countdown.hours, label: "GIỜ" },
                { value: countdown.minutes, label: "PHÚT" },
                { value: countdown.seconds, label: "GIÂY" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <div
                    className="p-4 md:p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}20 0%, white/10 100%)`,
                      borderColor: `${colors.primary}20`,
                    }}
                  >
                    <div
                      className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div
                      className="text-xs md:text-sm font-medium tracking-wider"
                      style={{ color: colors.muted }}
                    >
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="gap-3 px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  color: "white",
                }}
                onClick={() =>
                  document
                    .getElementById("rsvp")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Users className="w-5 h-5" />
                Xác Nhận Tham Dự
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-3 px-8 py-6 rounded-full font-semibold backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: `${colors.accent}10`,
                }}
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-5 h-5" />
                Chia Sẻ
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown
                className="w-8 h-8"
                style={{ color: colors.primary }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <Heart
              className="w-14 h-14 mx-auto mb-8 animate-pulse"
              style={{ color: colors.primary, fill: `${colors.primary}20` }}
            />
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-8"
              style={{ color: colors.text }}
            >
              Câu Chuyện Của Chúng Tôi
            </h2>
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-8 h-8 rounded-full opacity-30"
                style={{ background: colors.accent }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full opacity-30"
                style={{ background: colors.accent }}
              />
              <p
                className="font-serif text-lg md:text-xl leading-relaxed text-justify p-8 rounded-2xl backdrop-blur-sm"
                style={{
                  color: colors.text,
                  background: `${colors.accent}10`,
                  border: `1px solid ${colors.primary}20`,
                }}
              >
                {coupleData.story}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Timeline */}
      <section
        className="py-20 md:py-28"
        style={{ background: `${colors.accent}05` }}
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
              style={{ color: colors.primary }}
            />
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Lịch Trình Ngày Cưới
            </h2>
            <p className="text-lg" style={{ color: colors.muted }}>
              Những khoảnh khắc đáng nhớ trong ngày trọng đại
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div
              className="absolute left-2 top-0 bottom-0 w-0.5"
              style={{
                background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})`,
              }}
            />

            {coupleData.events.map((event, index) => (
              <motion.div
                key={event.name}
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
                  style={{ background: colors.primary }}
                />

                <div
                  className={`ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <div
                    className="p-6 rounded-2xl backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, white 0%, ${colors.accent}10 100%)`,
                      borderColor: `${colors.primary}20`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md"
                        style={{ background: `${colors.primary}10` }}
                      >
                        <Clock
                          className="w-6 h-6"
                          style={{ color: colors.primary }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="font-display text-xl font-semibold mb-2"
                          style={{ color: colors.text }}
                        >
                          {event.name}
                        </h3>
                        <p
                          className="font-medium mb-2"
                          style={{ color: colors.primary }}
                        >
                          ⏰ {event.time} • 📅 {event.date}
                        </p>
                        <p className="mb-2" style={{ color: colors.muted }}>
                          {event.description}
                        </p>
                        <p
                          className="text-sm flex items-start gap-2"
                          style={{ color: colors.muted }}
                        >
                          <MapPin className="w-4 h-4 shrink-0 mt-1" />
                          {event.location}
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

      {/* Gallery */}
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
                key={divId}
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
                onClick={() => handleGalleryClick(index)}
              >
                {/* IMAGE WRAPPER (chống bể) */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
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
                    {image.alt}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        id="rsvp"
        className="py-20 md:py-28"
        style={{ background: `${colors.accent}05` }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Users
              className="w-14 h-14 mx-auto mb-6"
              style={{ color: colors.primary }}
            />
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Xác Nhận Tham Dự
            </h2>
            <p className="text-lg" style={{ color: colors.muted }}>
              Vui lòng cho chúng tôi biết bạn có thể tham dự hay không
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleRSVP}
            className="max-w-2xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  Tên của bạn *
                </label>
                <Input
                  placeholder="Nhập tên đầy đủ"
                  value={rsvpData.name}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, name: e.target.value })
                  }
                  required
                  className="rounded-xl border-2 p-4"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: "white",
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  Số điện thoại *
                </label>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={rsvpData.phone}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, phone: e.target.value })
                  }
                  required
                  className="rounded-xl border-2 p-4"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: "white",
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  Số người tham dự *
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={rsvpData.guests}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, guests: e.target.value })
                  }
                  required
                  className="rounded-xl border-2 p-4"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: "white",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                type="button"
                size="lg"
                className={`flex-1 rounded-xl py-6 text-lg font-semibold transition-all ${
                  rsvpData.attending ? "shadow-lg scale-105" : ""
                }`}
                style={{
                  background: rsvpData.attending
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                    : `${colors.accent}20`,
                  color: rsvpData.attending ? "white" : colors.text,
                  border: `2px solid ${
                    rsvpData.attending ? colors.primary : `${colors.primary}30`
                  }`,
                }}
                onClick={() => setRsvpData({ ...rsvpData, attending: true })}
              >
                💖 Sẽ Tham Dự
              </Button>
              <Button
                type="button"
                size="lg"
                className={`flex-1 rounded-xl py-6 text-lg font-semibold transition-all ${
                  !rsvpData.attending ? "shadow-lg scale-105" : ""
                }`}
                style={{
                  background: !rsvpData.attending
                    ? `linear-gradient(135deg, ${colors.muted} 0%, ${colors.text}80 100%)`
                    : `${colors.accent}20`,
                  color: !rsvpData.attending ? "white" : colors.text,
                  border: `2px solid ${
                    !rsvpData.attending ? colors.muted : `${colors.primary}30`
                  }`,
                }}
                onClick={() => setRsvpData({ ...rsvpData, attending: false })}
              >
                😔 Không Tham Dự
              </Button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: "white",
              }}
            >
              <Send className="w-5 h-5 mr-2" />
              Gửi Xác Nhận
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Guest Wishes */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <MessageCircle
              className="w-14 h-14 mx-auto mb-6"
              style={{ color: colors.primary }}
            />
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Lời Chúc Từ Trái Tim
            </h2>
            <p className="text-lg" style={{ color: colors.muted }}>
              Chia sẻ tình yêu và những lời chúc tốt đẹp nhất
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Wish Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleWish}
              className="mb-12"
            >
              <div
                className="p-8 rounded-2xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}10 0%, white 100%)`,
                  border: `1px solid ${colors.primary}20`,
                }}
              >
                <h3
                  className="font-display text-2xl font-semibold mb-6"
                  style={{ color: colors.text }}
                >
                  Gửi lời chúc của bạn
                </h3>
                <div className="space-y-6">
                  <Input
                    placeholder="Tên của bạn"
                    value={wishData.name}
                    onChange={(e) =>
                      setWishData({ ...wishData, name: e.target.value })
                    }
                    required
                    className="rounded-xl border-2 p-4"
                    style={{
                      borderColor: `${colors.primary}30`,
                      background: "white",
                    }}
                  />
                  <Textarea
                    placeholder="Viết lời chúc từ trái tim của bạn..."
                    rows={4}
                    value={wishData.message}
                    onChange={(e) =>
                      setWishData({ ...wishData, message: e.target.value })
                    }
                    required
                    className="rounded-xl border-2 p-4 resize-none"
                    style={{
                      borderColor: `${colors.primary}30`,
                      background: "white",
                    }}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-xl px-8"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                      color: "white",
                    }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Gửi Lời Chúc
                  </Button>
                </div>
              </div>
            </motion.form>

            {/* Wishes List */}
            <div className="grid md:grid-cols-2 gap-6">
              {coupleData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div
                    className="p-6 rounded-2xl backdrop-blur-sm border shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}05 0%, white 100%)`,
                      borderColor: `${colors.primary}20`,
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                          color: "white",
                        }}
                      >
                        <span className="font-bold">{wish.name[0]}</span>
                      </div>
                      <div>
                        <p
                          className="font-semibold"
                          style={{ color: colors.text }}
                        >
                          {wish.name}
                        </p>
                        <p className="text-sm" style={{ color: colors.muted }}>
                          {wish.date}
                        </p>
                      </div>
                    </div>
                    <p className="italic" style={{ color: colors.text }}>
                      "{wish.message}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t"
        style={{ borderColor: `${colors.primary}20` }}
      >
        <div className="container mx-auto px-4 text-center">
          <Heart
            className="w-12 h-12 mx-auto mb-4 animate-pulse"
            style={{ color: colors.primary, fill: `${colors.primary}20` }}
          />
          <h3
            className="font-display text-3xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            {coupleData.bride.name} & {coupleData.groom.name}
          </h3>
          <p className="text-lg mb-2" style={{ color: colors.muted }}>
            14 Tháng 2, 2025
          </p>
          <p className="text-sm" style={{ color: colors.muted }}>
            "Trong tình yêu và trong cuộc sống, những điều nhỏ bé tạo nên điều
            lớn lao nhất"
          </p>
          <p className="text-xs mt-6" style={{ color: colors.muted }}>
            Được tạo với tình yêu bằng True Loves ❤️
          </p>
        </div>
      </footer>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3
                  className="font-display text-2xl font-semibold"
                  style={{ color: colors.text }}
                >
                  Chia Sẻ Thiệp Mời
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowShareModal(false)}
                  className="hover:bg-red-50"
                  style={{ color: colors.primary }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Facebook, label: "Facebook", color: "#1877F2" },
                  { icon: Instagram, label: "Instagram", color: "#E4405F" },
                  {
                    icon: LinkIcon,
                    label: "Sao Chép",
                    color: colors.primary,
                    action: () => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({
                        title: "Đã Sao Chép!",
                        description:
                          "Liên kết đã được sao chép vào bộ nhớ tạm.",
                      });
                    },
                  },
                ].map((item, index) => (
                  <button
                    key={item.label}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                      background: `${item.color}10`,
                      border: `1px solid ${item.color}30`,
                    }}
                    onClick={item.action}
                  >
                    <item.icon
                      className="w-8 h-8"
                      style={{ color: item.color }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
        style={{
          borderColor: colors.primary,
          background: "white",
          color: colors.primary,
        }}
        onClick={toggleMusic}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default TemplateDetailPage;
