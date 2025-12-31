// import {
//   HeroSection,
//   LoveStorySection,
//   EventsSection,
//   RSVPSection,
//   WishesSection,
//   FooterSection,
// } from "@/components/public-wedding";
import {
  COLOR_SCHEMES,
  COUPLE_DATA,
  DEFAULT_COLORS,
  TEMPLATES_LIST,
} from "@/lib/utils";
import LoveStorySection from "@/components/wedding/LoveStorySection";
import HeaderNavigation from "@/components/wedding/HeaderNavigation";
import GallerySection from "@/components/wedding/GallerySection";
import WishesSection from "@/components/wedding/WishesSection";
import FooterSection from "@/components/wedding/FooterSection";
import EventsSection from "@/components/wedding/EventsSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import MusicPlayer from "@/components/wedding/MusicPlayer";
import HeroSection from "@/components/wedding/HeroSection";
import { useParams, useNavigate } from "react-router-dom";
import ShareModal from "@/components/wedding/ShareModal";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const TemplateDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get template data
  const templatesData = Object.fromEntries(
    TEMPLATES_LIST.map((t) => [
      t.id,
      {
        ...t,
        colorName: t.name.toLowerCase(),
      },
    ])
  );

  const template = templatesData[slug as keyof typeof templatesData];
  const colors =
    COLOR_SCHEMES[slug as keyof typeof COLOR_SCHEMES] || DEFAULT_COLORS;

  // State management
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

  // Countdown timer effect
  useEffect(() => {
    if (!template) {
      navigate("/templates");
      return;
    }

    const calculateCountdown = () => {
      const now = new Date();
      const diff = COUPLE_DATA.weddingDate.getTime() - now.getTime();

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

  // Event handlers
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

  // Redirect if template not found
  if (!template) {
    return null; // Navigation will handle redirect
  }

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
      {/* Header with back navigation */}
      <HeaderNavigation colors={colors} />

      {/* Hero section with countdown */}
      <HeroSection
        template={template}
        colors={colors}
        countdown={countdown}
        coupleData={COUPLE_DATA}
        // onOpenShareModal={() => setShowShareModal(true)}
      />

      {/* Love story section */}
      <LoveStorySection colors={colors} />

      {/* Events timeline */}
      <EventsSection colors={colors} />

      {/* Photo gallery */}
      <GallerySection
        colors={colors}
        onGalleryClick={handleGalleryClick}
        currentImageIndex={currentImageIndex}
      />

      {/* RSVP section */}
      <RSVPSection
        colors={colors}
        rsvpData={rsvpData}
        setRsvpData={setRsvpData}
        onRSVP={handleRSVP}
      />

      {/* Guest wishes section */}
      <WishesSection
        colors={colors}
        wishData={wishData}
        setWishData={setWishData}
        onWish={handleWish}
      />

      {/* Footer with contact and bank info */}
      <FooterSection colors={colors} />

      {/* Music player */}
      <MusicPlayer
        colors={colors}
        isPlaying={isPlaying}
        onToggle={() => setIsPlaying(!isPlaying)}
        templateSlug={slug || ""}
      />

      {/* Share modal */}
      <ShareModal
        colors={colors}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default TemplateDetailPage;
