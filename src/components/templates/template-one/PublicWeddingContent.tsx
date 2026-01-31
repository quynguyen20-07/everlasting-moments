import {
  useGetBride,
  useGetGroom,
  useGetWeddingEvents,
  useGetWeddingStories,
  useWeddingImages,
} from "@/hooks";
import { formatDateVN, getWeddingCountdown } from "@/lib/utils";
import { ColorType, Wedding, Wish } from "@/types";
import { useTemplate } from "@/components/public";
import { Button } from "@/components/ui/button";
import { WeddingSEO } from "@/components/seo";
import { Pause, Play } from "lucide-react";
import { useEffect } from "react";

import VietnamTraditionalLayout from "../VietnamTraditionalLayout";
import WeddingInvitationCard from "./WeddingInvitationCard";
import WeddingFooterQuote from "./WeddingFooterQuote";
import BankAccountSection from "./BankAccountSection";
import WeddingGiftCard from "./WeddingGiftCard";
import WeddingCalendar from "./WeddingCalendar";
import GallerySection from "./GallerySection";
import TopAlbumCover from "./TopAlbumCover";
import FallingHearts from "./FallingHearts";
import WeddingCountdown from "./CountDown";
import Hero from "./Hero";

// Inner component to access useTemplate hook
interface PublicWeddingContentProps {
  wedding: Wedding;
  colors: ColorType | undefined;
  wishes: Wish[];
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
  showShareModal: boolean;
  setShowShareModal: (open: boolean) => void;
  isPlaying: boolean;
  toggleMusic: () => void;
  handleGalleryClick: (index: number) => void;
}

function PublicWeddingContent({
  wedding,
  colors,
  setShowShareModal,
  isPlaying,
  toggleMusic,
  handleGalleryClick,
}: PublicWeddingContentProps) {
  const { layout, theme } = useTemplate();

  const { data: bride, refetch: isBrideRefetch } = useGetBride(wedding.id);
  const { data: groom, refetch: isGroomRefetch } = useGetGroom(wedding.id);
  const { data: events, refetch: isEventRefetch } = useGetWeddingEvents(
    wedding.id,
  );
  const { data: stories, refetch: isStoryRefetch } = useGetWeddingStories(
    wedding.id,
  );

  const { data: images, refetch: isImageRefetch } = useWeddingImages(
    wedding.id,
  );

  const mainEvent = events?.find(
    (e) => e.type === "ceremony" || e.type === "reception",
  );

  useEffect(() => {
    if (wedding) {
      isBrideRefetch();
      isGroomRefetch();
      isEventRefetch();
      isStoryRefetch();
    }

    return () => {};
  }, [wedding]);

  return (
    <>
      <FallingHearts colors={colors} />
      <main className={`template-wrapper min-h-screen bg-background ${""}`}>
        {/* Hero Section */}
        <Hero
          colors={colors}
          coupleData={{ bride: bride, groom: groom }}
          countdown={getWeddingCountdown(
            mainEvent?.eventDate || wedding.weddingDate,
          )}
          date={mainEvent?.eventDate || wedding.weddingDate}
          setShowShareModal={() => setShowShareModal(true)}
        />

        <div className="w-full p-6">
          <WeddingInvitationCard
            groomName={groom?.fullName}
            brideName={bride?.fullName}
            dateText={formatDateVN(mainEvent?.eventDate || wedding.weddingDate)}
            timeText={"11:30"}
            location={"Tại tư gia nhà trai"}
            address={"Thôn Mỹ Liên - Xã Kỳ Văn - Tỉnh Hà Tĩnh"}
          />
        </div>

        <TopAlbumCover image="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769883220/Vowly/o8qp0zzg30wrcfxrdpnp.jpg" />

        <WeddingCalendar
          date={new Date(mainEvent?.eventDate || wedding.weddingDate)}
        />

        <WeddingCountdown
          targetTime={mainEvent?.eventDate || wedding.weddingDate}
        />

        {/* Bank Account / Gift Section */}
        {/* <BankAccountSection
          colors={colors}
          brideName={bride?.fullName}
          groomName={groom?.fullName}
        /> */}

        {/* Gallery */}
        <GallerySection
          colors={colors}
          images={images}
          onImageClick={(index) => handleGalleryClick(index)}
        />

        <WeddingGiftCard image="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769885240/Vowly/wrqvppxdh0ytxborfptl.png" />

        <section className="relative">
          <img
            src="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769882273/Vowly/zzlz1xpkybvdro8zy4bu.jpg"
            alt="Wedding"
            className="w-full h-auto object-cover"
          />

          <WeddingFooterQuote
            text={`In you\nI've found my home\nmy heart\nand my forever`}
          />
        </section>

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
export default PublicWeddingContent;
