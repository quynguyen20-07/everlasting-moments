import {
  ArrowLeft,
  Calendar,
  Camera,
  ChevronDown,
  Clock,
  Facebook,
  Flower2,
  Gem,
  Heart,
  Instagram,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Send,
  Share2,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  COLOR_SCHEMES,
  coupleData,
  DEFAULT_COLORS,
  TEMPLATES_LIST,
} from "@/lib/utils";
import GuestWishesSection, {
  WishFormData,
} from "@/components/wedding-ui/GuestWishesSection";
import EventsTimelineSection from "@/components/wedding-ui/EventsTimelineSection";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import RSVPSection, { RSVPData } from "@/components/wedding-ui/RSVPSection";
import LoveStorySection from "@/components/wedding-ui/LoveStorySection";
import GallerySection from "@/components/wedding-ui/GallerySection";
import FooterSection from "@/components/wedding-ui/FooterSection";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import Hero from "@/components/wedding-ui/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const templatesData = Object.fromEntries(
  TEMPLATES_LIST.map((t) => [
    t.id,
    {
      ...t,
      colorName: t.name.toLowerCase(),
    },
  ])
);

const TemplateDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const template = templatesData[slug as keyof typeof templatesData];
  const colors =
    COLOR_SCHEMES[slug as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(true);
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

  const images = useMemo(
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
    const audio = new Audio("/music/i-do.mp3");
    audio.loop = true;
    audio.volume = 0.6;

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    const playAudio = async () => {
      try {
        await audio.play();
        console.log("Audio started successfully");
      } catch (error) {
        console.log("Autoplay was prevented, user interaction required");
        // Nếu bị chặn, chờ user tương tác
        const handleUserInteraction = () => {
          audio.play().catch((e) => console.log("Still cannot play:", e));
          // Xóa event listeners sau khi user tương tác
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
          document.removeEventListener("keydown", handleUserInteraction);
        };

        // Thêm event listeners cho các interaction
        document.addEventListener("click", handleUserInteraction, {
          once: true,
        });
        document.addEventListener("touchstart", handleUserInteraction, {
          once: true,
        });
        document.addEventListener("keydown", handleUserInteraction, {
          once: true,
        });
      }
    };

    audioRef.current = audio;
    playAudio();

    // Cleanup
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.error("Audio error:", err);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã Xác Nhận!",
      description: "Cảm ơn bạn đã xác nhận sẽ tham dự.",
    });
    setRsvpData({ name: "", phone: "", guests: "1", attending: true });
  };

  const handleWish = (e: React.FormEvent<HTMLFormElement>) => {
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

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Failed to play:", error);
          toast({
            title: "Không thể phát nhạc",
            description: "Vui lòng bấm vào trang để bật nhạc",
            variant: "destructive",
          });
        });
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
      <Hero
        colors={colors}
        template={template}
        coupleData={coupleData}
        countdown={countdown}
        setShowShareModal={() => setShowShareModal(true)}
      />

      {/* Love Story Section */}
      <LoveStorySection colors={colors} story={coupleData.story} />

      {/* Events Timeline */}
      <EventsTimelineSection colors={colors} events={coupleData.events} />

      {/* Gallery */}
      <GallerySection
        colors={colors}
        images={images}
        onImageClick={(index) => handleGalleryClick(index)}
      />

      {/* RSVP Section */}
      <RSVPSection
        colors={colors}
        rsvpData={rsvpData}
        setRsvpData={setRsvpData}
        onSubmit={handleRSVP}
      />

      {/* Guest Wishes */}
      <GuestWishesSection
        colors={colors}
        wishes={coupleData.wishes}
        wishData={wishData}
        onSubmit={handleWish}
        setWishData={setWishData}
      />

      {/* Footer */}
      <FooterSection
        colors={colors}
        brideName={coupleData.bride.name}
        groomName={coupleData.groom.name}
        weddingDate={"14 Tháng 2, 2025"}
      />

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
