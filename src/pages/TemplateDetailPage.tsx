import {
  COLOR_SCHEMES,
  coupleData,
  DEFAULT_COLORS,
  getCountdown,
  TEMPLATES_LIST,
} from "@/lib/utils";
import EventsTimelineSection from "@/components/wedding-ui/EventsTimelineSection";
import GuestWishesSection from "@/components/wedding-ui/GuestWishesSection";
import LoveStorySection from "@/components/wedding-ui/LoveStorySection";
import GallerySection from "@/components/wedding-ui/GallerySection";
import FooterSection from "@/components/wedding-ui/FooterSection";
import FallingHearts from "@/components/wedding-ui/FallingHearts";
import RSVPSection from "@/components/wedding-ui/RSVPSection";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShareModal from "@/components/wedding/ShareModal";
import { ArrowLeft, Pause, Play } from "lucide-react";
import Hero from "@/components/wedding-ui/Hero";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ITimeCountdown } from "@/types";

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

  const targetTime = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000);

  const template = templatesData[slug as keyof typeof templatesData];
  const colors =
    COLOR_SCHEMES[slug as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;

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
      {
        id: 1,
        alt: "Ảnh cưới 1",
        src: "/images/wedding06.webp",
      },
      { id: 2, alt: "Ảnh cưới 2", src: "/images/wedding01.jpg" },
      { id: 3, alt: "Ảnh cưới 3", src: "/images/wedding02.jpg" },
      { id: 4, alt: "Ảnh cưới 4", src: "/images/wedding004.webp" },
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
  }, [template, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        const handleUserInteraction = () => {
          audio.play().catch((e) => console.log("Still cannot play:", e));
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
          document.removeEventListener("keydown", handleUserInteraction);
        };

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
    setRsvpData({ name: "", attending: true });
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

      <FallingHearts colors={colors} />

      {/* Hero Section */}
      <Hero
        colors={colors}
        template={template}
        coupleData={coupleData}
        countdown={countdown}
        date={"2026-01-08T10:00:00Z"}
        setShowShareModal={() => setShowShareModal(true)}
      />

      {/* Love Story Section */}
      <LoveStorySection colors={colors} stories={coupleData.story} />

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
