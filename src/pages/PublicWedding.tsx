import {
  COLOR_SCHEMES,
  DEFAULT_COLORS,
  mapWeddingToCoupleData,
  TEMPLATES_LIST,
} from "@/lib/utils";
import {
  useGetBride,
  useGetGroom,
  useGetWeddingSetting,
  usePublicWedding,
} from "@/hooks";
import PublicWeddingContent from "@/components/templates/template-one/PublicWeddingContent";
import type { WishFormData } from "@/components/wedding-ui/GuestWishesSection";
import type { RSVPFormData } from "@/components/wedding-ui/RSVPSection";
import NotfoundFallback from "@/components/ui/notfound-fallback";
<<<<<<< Updated upstream
import { useGetWeddingSetting, usePublicWedding } from "@/hooks";
=======
>>>>>>> Stashed changes
import { useNavigate, useParams } from "react-router-dom";
import { PageLoading } from "@/components/LoadingSpinner";
import { TemplateProvider } from "@/components/public";
import { useEffect, useMemo, useState } from "react";
import { ColorType, TemplateType } from "@/types";
import { GuestApi } from "@/lib/api/guest.api";
import { WishApi } from "@/lib/api/wish.api";
import { useToast } from "@/hooks/useToast";
import { Helmet } from "react-helmet-async";
import type { Wish } from "@/types";
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

  const { data: publicWedding, isFetching: isLoading } = usePublicWedding(slug);
  const { data: themeSettings } = useGetWeddingSetting(publicWedding?.id);
<<<<<<< Updated upstream
=======
  const { data: bride, refetch: isBrideRefetch } = useGetBride(
    publicWedding?.id,
  );
  const { data: groom, refetch: isGroomRefetch } = useGetGroom(
    publicWedding?.id,
  );
>>>>>>> Stashed changes

  const [playing, setPlaying] = useState(false);

  const [play, { stop }] = useSound("/music/i-do.mp3", {
    loop: true,
    onplay: () => setPlaying(true),
    onstop: () => setPlaying(false),
  });

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
    const calculateCountdown = () => {
      const now = new Date();
      const diff =
        mapWeddingToCoupleData(publicWedding)?.weddingDate?.getTime() -
        now.getTime();

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
  }, [publicWedding, navigate, template]);

  useEffect(() => {
    if (publicWedding) {
      const template =
        templatesData[themeSettings?.template as keyof typeof templatesData];
      const colors =
        COLOR_SCHEMES[themeSettings?.template as keyof typeof COLOR_SCHEMES] ||
        DEFAULT_COLORS;

      setTemplate(template);
      setColors(colors);
    }
  }, [publicWedding]);

  useEffect(() => {
    play();
    return () => stop();
  }, [play, stop]);

  if (isLoading) {
    return <PageLoading text="Đang tải thiệp mời..." />;
  }

  if (error || !publicWedding) {
    return (
      <NotfoundFallback
        title="Không tìm thấy thiệp mời"
        error={error || "Không tìm thấy thiệp mời"}
      />
    );
  }

  // Handle RSVP submission
  const handleRSVP = async (data: RSVPFormData) => {
    if (!publicWedding?.id) {
      throw new Error("Wedding ID không tồn tại");
    }

    try {
      const newGuest = await GuestApi.create();
      if (newGuest?.id) {
        await GuestApi.update(newGuest.id, {
          weddingId: publicWedding.id,
          fullName: data.fullName,
          email: data.email || undefined,
          phone: data.phone || undefined,
          numberOfGuests: data.numberOfGuests,
          attendanceStatus: data.attendanceStatus,
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
    if (!publicWedding?.id) {
      throw new Error("Wedding ID không tồn tại");
    }

    try {
      const tempWish = await WishApi.create();
      if (tempWish?.id) {
        const newWish = await WishApi.update(tempWish.id, {
          weddingId: publicWedding.id,
          guestName: data.guestName,
          message: data.message,
          isApproved: false,
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

<<<<<<< Updated upstream
  return (
    <TemplateProvider themeSettings={themeSettings}>
      <PublicWeddingContent
        wedding={publicWedding}
        colors={colors}
        wishes={wishes}
        setWishes={setWishes}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        isPlaying={playing}
        toggleMusic={() => (playing ? stop() : play())}
        // handleRSVP={handleRSVP}
        // handleWish={handleWish}
        // handleGalleryClick={handleGalleryClick}
      />
    </TemplateProvider>
=======
  const title =
    bride && groom ? `${bride?.fullName} & ${groom?.fullName}` : "Thiệp cưới";

  const description =
    publicWedding && groom && bride
      ? `Trân trọng kính mời bạn tham dự lễ cưới của ${bride?.fullName} và ${groom?.fullName} vào ${publicWedding.weddingDate}`
      : "Thiệp cưới online";

  const ogImage =
    "https://res.cloudinary.com/nguyen-the-quy/image/upload/v1770029543/Vowly/ojjkspr5xl53kmavd9wo.jpg";

  console.log({ title, description, ogImage });

  return (
    <>
      <Helmet>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <TemplateProvider themeSettings={themeSettings}>
        <PublicWeddingContent
          wedding={publicWedding}
          colors={colors}
          wishes={wishes}
          setWishes={setWishes}
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
          isPlaying={playing}
          toggleMusic={() => (playing ? stop() : play())}
          // handleRSVP={handleRSVP}
          // handleWish={handleWish}
          // handleGalleryClick={handleGalleryClick}
        />
      </TemplateProvider>
    </>
>>>>>>> Stashed changes
  );
}
