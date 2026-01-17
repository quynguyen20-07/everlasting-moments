import {
  COLOR_SCHEMES,
  coupleData,
  DEFAULT_COLORS,
  getCountdown,
} from "@/lib/utils";
import EventsTimelineSection from "@/components/wedding-ui/EventsTimelineSection";
import GuestWishesSection from "@/components/wedding-ui/GuestWishesSection";
import type { WishFormData } from "@/components/wedding-ui/GuestWishesSection";
import type { RSVPFormData } from "@/components/wedding-ui/RSVPSection";
import LoveStorySection from "@/components/wedding-ui/LoveStorySection";
import GallerySection from "@/components/wedding-ui/GallerySection";
import FooterSection from "@/components/wedding-ui/FooterSection";
import FallingHearts from "@/components/wedding-ui/FallingHearts";
import RSVPSection from "@/components/wedding-ui/RSVPSection";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShareModal from "@/components/wedding/ShareModal";
import { ArrowLeft, Pause, Play, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Hero from "@/components/wedding-ui/Hero";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ITimeCountdown, Wish } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  TEMPLATE_LAYOUTS,
  TEMPLATES_THEME_LIST,
  getLayoutById,
  getThemeById,
  createWeddingTemplate,
} from "@/lib/templates/wedding-templates";

const TemplateDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parse slug to get layout and theme
  const [layoutId, themeId] = (slug || "").split("-").length > 2 
    ? [slug?.split("-").slice(0, -1).join("-"), slug?.split("-").slice(-1)[0]]
    : [slug, TEMPLATES_THEME_LIST[0]?.id];

  const layout = getLayoutById(layoutId || "") || TEMPLATE_LAYOUTS[0];
  const initialTheme = getThemeById(themeId || "") || TEMPLATES_THEME_LIST[0];
  
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(
    TEMPLATES_THEME_LIST.findIndex(t => t.id === initialTheme.id) || 0
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentTheme = TEMPLATES_THEME_LIST[selectedThemeIndex];
  const template = createWeddingTemplate(layout, currentTheme);
  const colors = COLOR_SCHEMES[currentTheme.id as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;

  const targetTime = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);

  const [countdown, setCountdown] = useState<ITimeCountdown>(
    getCountdown(targetTime)
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [demoWishes, setDemoWishes] = useState(coupleData.wishes || []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const images = useMemo(
    () => [
      { id: 1, alt: "Ảnh cưới 1", src: "/images/wedding06.webp" },
      { id: 2, alt: "Ảnh cưới 2", src: "/images/wedding01.jpg" },
      { id: 3, alt: "Ảnh cưới 3", src: "/images/wedding02.jpg" },
      { id: 4, alt: "Ảnh cưới 4", src: "/images/wedding004.webp" },
      { id: 5, alt: "Ảnh cưới 5", src: "/images/wedding04.jpg" },
      { id: 6, alt: "Ảnh cưới 6", src: "/images/wedding05.jpg" },
    ],
    []
  );

  // Theme navigation
  const handlePrevTheme = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedThemeIndex((prev) => 
      (prev - 1 + TEMPLATES_THEME_LIST.length) % TEMPLATES_THEME_LIST.length
    );
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const handleNextTheme = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedThemeIndex((prev) => 
      (prev + 1) % TEMPLATES_THEME_LIST.length
    );
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  // Auto-play for theme slider
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        handleNextTheme();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, handleNextTheme]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio setup
  useEffect(() => {
    const audio = new Audio("/music/i-do.mp3");
    audio.loop = true;
    audio.volume = 0.6;

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        const handleUserInteraction = () => {
          audio.play().catch((e) => console.log("Still cannot play:", e));
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
        };
        document.addEventListener("click", handleUserInteraction, { once: true });
        document.addEventListener("touchstart", handleUserInteraction, { once: true });
      }
    };

    audioRef.current = audio;
    playAudio();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleRSVP = async (data: RSVPFormData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Đã Xác Nhận!",
      description: data.attendanceStatus === "confirmed" 
        ? "Cảm ơn bạn đã xác nhận sẽ tham dự."
        : "Cảm ơn bạn đã phản hồi.",
    });
  };

  const handleWish = async (data: WishFormData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newWish: Wish = {
      id: `demo-${Date.now()}`,
      weddingId: "demo",
      guestName: data.guestName,
      message: data.message,
      isApproved: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDemoWishes(prev => [...prev, newWish]);
    toast({
      title: "Đã Gửi Lời Chúc!",
      description: "Cảm ơn bạn đã gửi lời chúc tuyệt vời!",
    });
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
        .catch(() => {
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
      style={{
        "--primary": colors.primary,
        "--secondary": colors.secondary,
        "--accent": colors.accent,
        "--background": colors.background,
        "--text": colors.text,
        "--muted": colors.muted,
      } as React.CSSProperties}
    >
      {/* Header with Theme Selector */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e8d4c8]/50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-[#4a3f3a] hover:bg-[#f8f1ed]"
              onClick={() => navigate("/templates")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Quay Lại</span>
            </Button>

            {/* Theme Selector */}
            <div 
              className="flex items-center gap-2"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-[#f8f1ed]"
                onClick={handlePrevTheme}
                disabled={isAnimating}
              >
                <ChevronLeft className="w-4 h-4 text-[#4a3f3a]" />
              </Button>

              {/* Theme Pills */}
              <div className="flex items-center gap-1 overflow-hidden max-w-[200px] md:max-w-none">
                {TEMPLATES_THEME_LIST.slice(
                  Math.max(0, selectedThemeIndex - 2),
                  selectedThemeIndex + 3
                ).map((theme, idx) => {
                  const actualIndex = Math.max(0, selectedThemeIndex - 2) + idx;
                  const isActive = actualIndex === selectedThemeIndex;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setSelectedThemeIndex(actualIndex);
                          setTimeout(() => setIsAnimating(false), 400);
                        }
                      }}
                      className={`
                        px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                        ${isActive 
                          ? "text-white shadow-md scale-105" 
                          : "bg-[#f8f1ed] text-[#7a6b64] hover:bg-[#e8d4c8]"
                        }
                      `}
                      style={isActive ? {
                        backgroundColor: `hsl(${theme.primaryHsl})`,
                      } : {}}
                    >
                      {isActive && <Check className="w-3 h-3 inline mr-1" />}
                      <span className="hidden sm:inline">{theme.name}</span>
                      <span 
                        className="sm:hidden w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: `hsl(${theme.primaryHsl})` }}
                      />
                    </button>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-[#f8f1ed]"
                onClick={handleNextTheme}
                disabled={isAnimating}
              >
                <ChevronRight className="w-4 h-4 text-[#4a3f3a]" />
              </Button>
            </div>

            {/* Buy Button */}
            <Button
              size="sm"
              className="bg-[#c4a99b] hover:bg-[#b39888] text-white rounded-full px-4"
            >
              Mua Ngay
            </Button>
          </div>

          {/* Theme Dots */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {TEMPLATES_THEME_LIST.map((theme, index) => (
              <button
                key={theme.id}
                onClick={() => {
                  if (!isAnimating && index !== selectedThemeIndex) {
                    setIsAnimating(true);
                    setSelectedThemeIndex(index);
                    setTimeout(() => setIsAnimating(false), 400);
                  }
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedThemeIndex
                    ? "w-4 bg-[#c4a99b]"
                    : "bg-[#c4a99b]/30 hover:bg-[#c4a99b]/50"
                }`}
                title={theme.name}
              />
            ))}
          </div>
        </div>
      </div>

      <FallingHearts colors={colors} />

      {/* Hero Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Hero
            colors={colors}
            template={template}
            coupleData={coupleData}
            countdown={countdown}
            date={"2026-01-08T10:00:00Z"}
            setShowShareModal={() => setShowShareModal(true)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Love Story Section */}
      <LoveStorySection colors={colors} stories={coupleData.story} />

      {/* Events Timeline */}
      <EventsTimelineSection colors={colors} events={coupleData.events} />

      {/* Gallery */}
      <GallerySection
        colors={colors}
        images={images}
        onImageClick={(index) => setCurrentImageIndex(index)}
      />

      {/* RSVP Section */}
      <RSVPSection
        colors={colors}
        weddingId="demo"
        onSubmit={handleRSVP}
      />

      {/* Guest Wishes */}
      <GuestWishesSection
        colors={colors}
        wishes={demoWishes}
        weddingId="demo"
        onSubmit={handleWish}
      />

      {/* Footer */}
      <FooterSection
        colors={colors}
        brideName={coupleData.bride.name}
        groomName={coupleData.groom.name}
        weddingDate={"14 Tháng 2, 2025"}
      />

      {/* Share Modal */}
      <ShareModal
        title={"Đã Sao Chép!"}
        colorsText={colors.text}
        colorsPrimary={colors.primary}
        open={showShareModal}
        setOpen={setShowShareModal}
      />

      {/* Music Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 bg-white border-[#c4a99b]"
        onClick={toggleMusic}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-[#c4a99b]" />
        ) : (
          <Play className="w-5 h-5 text-[#c4a99b]" />
        )}
      </Button>
    </div>
  );
};

export default TemplateDetailPage;
