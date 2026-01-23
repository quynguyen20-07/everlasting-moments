import {
  COLOR_SCHEMES,
  DEFAULT_COLORS,
  getWeddingCountdown,
  mapWeddingToCoupleData,
  TEMPLATES_LIST,
} from "@/lib/utils";
import EventsTimelineSection from "@/components/wedding-ui/EventsTimelineSection";
import type { WishFormData } from "@/components/wedding-ui/GuestWishesSection";
import GuestWishesSection from "@/components/wedding-ui/GuestWishesSection";
import BankAccountSection from "@/components/wedding-ui/BankAccountSection";
import type { RSVPFormData } from "@/components/wedding-ui/RSVPSection";
import LoveStorySection from "@/components/wedding-ui/LoveStorySection";
import GallerySection from "@/components/wedding-ui/GallerySection";
import FooterSection from "@/components/wedding-ui/FooterSection";
import FallingHearts from "@/components/wedding-ui/FallingHearts";
import RSVPSection from "@/components/wedding-ui/RSVPSection";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLoading } from "@/components/LoadingSpinner";
import ShareModal from "@/components/wedding/ShareModal";
import { getWeddingBySlugApi } from "@/lib/api/wedding";
import { ColorType, TemplateType, Wish } from "@/types";
import { TemplateProvider, useTemplate } from "@/components/public";
import { VietnamTraditionalLayout } from "@/components/templates";
import Hero from "@/components/wedding-ui/Hero";
import { submitRSVPApi } from "@/lib/api/guest";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WeddingSEO } from "@/components/seo";
import { addWishApi } from "@/lib/api/wish";
import { Pause, Play } from "lucide-react";
import type { Wedding } from "@/types";
import { motion } from "framer-motion";

const templatesData = Object.fromEntries(
  TEMPLATES_LIST.map((t) => [
    t.id,
    {
      ...t,
      colorName: t.name.toLowerCase(),
    },
  ]),
);

export default function PublicWedding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { slug } = useParams<{ slug: string }>();

  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [template, setTemplate] = useState<TemplateType>();
  const [colors, setColors] = useState<ColorType>();
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [wishes, setWishes] = useState<Wish[]>([]);
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
    [],
  );

  useEffect(() => {
    async function fetchWedding() {
      if (!slug) {
        setError("Không tìm thấy thiệp mời");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getWeddingBySlugApi(slug);
        if (data) {
          setWedding(data);
          // Initialize wishes from mock data (will be replaced with API call)
          setWishes(mapWeddingToCoupleData(data).wishes || []);
        } else {
          setError("Thiệp mời không tồn tại hoặc chưa được công khai");
        }
      } catch (err) {
        console.error("Error fetching wedding:", err);
        setError("Không thể tải thiệp mời. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchWedding();
  }, [slug]);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const diff =
        mapWeddingToCoupleData(wedding)?.weddingDate?.getTime() - now.getTime();

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
  }, [wedding, navigate, template]);

  useEffect(() => {
    if (wedding) {
      const template =
        templatesData[
          wedding.themeSettings.template as keyof typeof templatesData
        ];
      const colors =
        COLOR_SCHEMES[
          wedding.themeSettings.template as keyof typeof COLOR_SCHEMES
        ] || DEFAULT_COLORS;

      setTemplate(template);
      setColors(colors);
    }
  }, [wedding]);

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

  if (isLoading) {
    return <PageLoading text="Đang tải thiệp mời..." />;
  }

  if (error || !wedding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background invitation-pattern">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-foreground mb-2">
            Không tìm thấy thiệp mời
          </h1>
          <p className="font-elegant text-muted-foreground mb-6">
            {error || "Thiệp mời này không tồn tại hoặc đã bị gỡ."}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-primary-foreground rounded-2xl font-medium hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </a>
        </motion.div>
      </div>
    );
  }

  // Handler functions are moved to component level for reuse

  // Handle RSVP submission
  const handleRSVP = async (data: RSVPFormData) => {
    if (!wedding?.id) {
      throw new Error("Wedding ID không tồn tại");
    }

    try {
      await submitRSVPApi(wedding.id, {
        fullName: data.fullName,
        email: data.email || undefined,
        phone: data.phone || undefined,
        numberOfGuests: data.numberOfGuests,
        attendanceStatus: data.attendanceStatus,
        dietaryRestrictions: data.dietaryRestrictions || undefined,
        message: data.message || undefined,
      });

      toast({
        title: "Đã Xác Nhận!",
        description:
          data.attendanceStatus === "confirmed"
            ? "Cảm ơn bạn đã xác nhận sẽ tham dự."
            : "Cảm ơn bạn đã phản hồi.",
      });
    } catch (error) {
      console.error("RSVP submission error:", error);
      throw new Error("Không thể gửi xác nhận. Vui lòng thử lại sau.");
    }
  };

  // Handle Wish submission
  const handleWish = async (data: WishFormData) => {
    if (!wedding?.id) {
      throw new Error("Wedding ID không tồn tại");
    }

    try {
      const newWish = await addWishApi(wedding.id, {
        guestName: data.guestName,
        message: data.message,
      });

      // Add to local state (pending approval)
      setWishes((prev) => [...prev, newWish]);

      toast({
        title: "Đã Gửi Lời Chúc!",
        description:
          "Cảm ơn bạn! Lời chúc sẽ được hiển thị sau khi được duyệt.",
      });
    } catch (error) {
      console.error("Wish submission error:", error);
      throw new Error("Không thể gửi lời chúc. Vui lòng thử lại sau.");
    }
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
    <TemplateProvider themeSettings={wedding.themeSettings}>
      <PublicWeddingContent
        wedding={wedding}
        template={template}
        colors={colors}
        images={images}
        wishes={wishes}
        setWishes={setWishes}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
        handleRSVP={handleRSVP}
        handleWish={handleWish}
        handleGalleryClick={handleGalleryClick}
      />
    </TemplateProvider>
  );
}

// Inner component to access useTemplate hook
interface PublicWeddingContentProps {
  wedding: Wedding;
  template: TemplateType | undefined;
  colors: ColorType | undefined;
  images: { id: number; alt: string; src: string }[];
  wishes: Wish[];
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
  showShareModal: boolean;
  setShowShareModal: (open: boolean) => void;
  isPlaying: boolean;
  toggleMusic: () => void;
  handleRSVP: (data: RSVPFormData) => Promise<void>;
  handleWish: (data: WishFormData) => Promise<void>;
  handleGalleryClick: (index: number) => void;
}

function PublicWeddingContent({
  wedding,
  template,
  colors,
  images,
  wishes,
  showShareModal,
  setShowShareModal,
  isPlaying,
  toggleMusic,
  handleRSVP,
  handleWish,
  handleGalleryClick,
}: PublicWeddingContentProps) {
  const { layout, theme } = useTemplate();
  
  const bride = wedding.weddingDetail?.bride;
  const groom = wedding.weddingDetail?.groom;
  const mainEvent = wedding.weddingDetail?.weddingEvents?.find(
    (e) => e.type === "ceremony" || e.type === "reception",
  );

  // Gallery images for VietnamTraditionalLayout
  const galleryImages = useMemo(() => 
    images.map((img) => ({
      id: String(img.id),
      url: img.src,
      caption: img.alt,
    })),
    [images]
  );

  // Render VietnamTraditionalLayout if layout is vietnam-traditional
  if (layout.id === "vietnam-traditional") {
    return (
      <>
        <WeddingSEO
          brideName={bride?.fullName || "Cô Dâu"}
          groomName={groom?.fullName || "Chú Rể"}
          weddingDate={mainEvent?.eventDate || wedding.weddingDate}
          eventLocation={mainEvent?.address}
          canonicalUrl={typeof window !== 'undefined' ? window.location.href : undefined}
          pageType="wedding"
        />

        <FallingHearts colors={colors} />

        <VietnamTraditionalLayout
          theme={theme}
          bride={bride}
          groom={groom}
          weddingDate={mainEvent?.eventDate || wedding.weddingDate}
          events={wedding.weddingDetail?.weddingEvents || []}
          loveStories={wedding.weddingDetail?.loveStories || []}
          galleryImages={galleryImages}
          onImageClick={handleGalleryClick}
        />

        {/* Music Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-40 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
          style={{
            borderColor: colors?.primary,
            background: "white",
            color: colors?.primary,
          }}
          onClick={toggleMusic}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
      </>
    );
  }

  // Default layout rendering
  return (
    <>
      <WeddingSEO
        brideName={bride?.fullName || "Cô Dâu"}
        groomName={groom?.fullName || "Chú Rể"}
        weddingDate={mainEvent?.eventDate || wedding.weddingDate}
        eventLocation={mainEvent?.address}
        description={wedding.title}
        canonicalUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        pageType="wedding"
      />

      <FallingHearts colors={colors} />

      <main className={`template-wrapper min-h-screen bg-background ${""}`}>
        {/* Hero Section */}
        <Hero
          colors={colors}
          template={template}
          coupleData={mapWeddingToCoupleData(wedding)}
          countdown={getWeddingCountdown(wedding.weddingDate)}
          date={"2026-01-08T10:00:00Z"}
          setShowShareModal={() => setShowShareModal(true)}
        />
        {/* Love Story Section */}
        <LoveStorySection
          colors={colors}
          stories={mapWeddingToCoupleData(wedding).stories}
        />

        {/* Events Timeline */}
        <EventsTimelineSection
          colors={colors}
          events={mapWeddingToCoupleData(wedding).events}
        />

        {/* Gallery */}
        <GallerySection
          colors={colors}
          images={images}
          onImageClick={(index) => handleGalleryClick(index)}
        />

        {/* RSVP Section */}
        <RSVPSection
          colors={colors}
          weddingId={wedding.id}
          onSubmit={handleRSVP}
        />

        {/* Bank Account / Gift Section */}
        <BankAccountSection
          colors={colors}
          brideName={bride?.fullName}
          groomName={groom?.fullName}
        />

        {/* Guest Wishes */}
        <GuestWishesSection
          colors={colors}
          wishes={wishes}
          weddingId={wedding.id}
          onSubmit={handleWish}
        />

        {/* Footer */}
        <FooterSection
          colors={colors}
          brideName={mapWeddingToCoupleData(wedding).bride.name}
          groomName={mapWeddingToCoupleData(wedding).groom.name}
          weddingDate={"14 Tháng 2, 2025"}
        />

        {/* Share Modal */}
        <ShareModal
          title={"Đã Sao Chép!"}
          colorsText={colors?.text}
          colorsPrimary={colors?.primary}
          open={showShareModal}
          setOpen={setShowShareModal}
        />

        {/* Music Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-40 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
          style={{
            borderColor: colors?.primary,
            background: "white",
            color: colors?.primary,
          }}
          onClick={toggleMusic}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
      </main>
    </>
  );
}
