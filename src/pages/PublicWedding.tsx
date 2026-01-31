import {
  COLOR_SCHEMES,
  DEFAULT_COLORS,
  mapWeddingToCoupleData,
  TEMPLATES_LIST,
} from "@/lib/utils";
import PublicWeddingContent from "@/components/wedding-ui/PublicWeddingContent";
import type { WishFormData } from "@/components/wedding-ui/GuestWishesSection";
import type { RSVPFormData } from "@/components/wedding-ui/RSVPSection";
import NotfoundFallback from "@/components/ui/notfound-fallback";
import { useNavigate, useParams } from "react-router-dom";
import { PageLoading } from "@/components/LoadingSpinner";
import { WeddingApi } from "@/lib/api/wedding.api";
import { ColorType, TemplateType } from "@/types";
import { TemplateProvider } from "@/components/public";
import { useEffect, useMemo, useState } from "react";
import { GuestApi } from "@/lib/api/guest.api";
import { useToast } from "@/hooks/use-toast";
import { WishApi } from "@/lib/api/wish.api";
import type { WeddingWithDetails as Wedding, Wish } from "@/types";
import useSound from "use-sound";

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

  const [playing, setPlaying] = useState(false);

  const [play, { stop }] = useSound("/music/i-do.mp3", {
    loop: true,
    onplay: () => setPlaying(true),
    onstop: () => setPlaying(false),
  });

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

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        const data = await WeddingApi.findBySlug(slug);
        if (data) {
          setWedding(data);
          // Load wishes using WishApi
          try {
            const allWishes = await WishApi.findAll();
            // Client-side filter for now
            const weddingWishes = allWishes.filter(w => w.weddingId === data.id && w.isApproved);
            setWishes(weddingWishes);
          } catch (e) {
            console.error("Failed to load wishes", e);
            setWishes([]);
          }
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
    play();
    return () => stop();
  }, [play, stop]);

  if (isLoading) {
    return <PageLoading text="Đang tải thiệp mời..." />;
  }

  if (error || !wedding) {
    return (
      <NotfoundFallback
        title="Không tìm thấy thiệp mời"
        error={error || "Không tìm thấy thiệp mời"}
      />
    );
  }

  // Handle RSVP submission
  const handleRSVP = async (data: RSVPFormData) => {
    if (!wedding?.id) {
      throw new Error("Wedding ID không tồn tại");
    }

    try {
      // Create empty guest first
      const newGuest = await GuestApi.create();
      if (newGuest?.id) {
        await GuestApi.update(newGuest.id, {
          weddingId: wedding.id,
          fullName: data.fullName,
          email: data.email || undefined,
          phone: data.phone || undefined,
          numberOfGuests: data.numberOfGuests,
          attendanceStatus: data.attendanceStatus,
          // dietaryRestrictions: data.dietaryRestrictions || undefined, // Removed from API
          // message: data.message || undefined, // Removed from API
        });
      }

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
      const tempWish = await WishApi.create();
      if (tempWish?.id) {
        const newWish = await WishApi.update(tempWish.id, {
          weddingId: wedding.id,
          guestName: data.guestName,
          message: data.message,
          isApproved: false // Default pending
        });

        // Add to local state (pending approval)
        setWishes((prev) => [...prev, newWish]);

        toast({
          title: "Đã Gửi Lời Chúc!",
          description:
            "Cảm ơn bạn! Lời chúc sẽ được hiển thị sau khi được duyệt.",
        });
      }
    } catch (error) {
      console.error("Wish submission error:", error);
      throw new Error("Không thể gửi lời chúc. Vui lòng thử lại sau.");
    }
  };

  const handleGalleryClick = (index: number) => {
    setCurrentImageIndex(index);
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
        isPlaying={playing}
        toggleMusic={() => (playing ? stop() : play())}
        handleRSVP={handleRSVP}
        handleWish={handleWish}
        handleGalleryClick={handleGalleryClick}
      />
    </TemplateProvider>
  );
}
