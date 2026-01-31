import {
  useGetBride,
  useGetGroom,
  useGetWeddingEvents,
  useGetWeddingStories,
  useWeddingImages,
} from "@/hooks";
import { mapWeddingToCoupleData, getWeddingCountdown } from "@/lib/utils";
import { Wedding, TemplateType, ColorType, Wish } from "@/types";
import { useEffect, useMemo } from "react";
import { Pause, Play } from "lucide-react";

import GuestWishesSection, { WishFormData } from "./GuestWishesSection";
import EventsTimelineSection from "./EventsTimelineSection";
import RSVPSection, { RSVPFormData } from "./RSVPSection";
import { VietnamTraditionalLayout } from "../templates";
import BankAccountSection from "./BankAccountSection";
import LoveStorySection from "./LoveStorySection";
import ShareModal from "../wedding/ShareModal";
import GallerySection from "./GallerySection";
import FooterSection from "./FooterSection";
import FallingHearts from "./FallingHearts";
import { useTemplate } from "../public";
import { Button } from "../ui/button";
import { WeddingSEO } from "../seo";
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
  handleRSVP: (data: RSVPFormData) => Promise<void>;
  handleWish: (data: WishFormData) => Promise<void>;
  handleGalleryClick: (index: number) => void;
}

function PublicWeddingContent({
  wedding,
  colors,
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

  // Render VietnamTraditionalLayout if layout is vietnam-traditional
  if (layout.id === "vietnam-traditional") {
    return (
      <>
        <WeddingSEO
          brideName={bride?.fullName || "Cô Dâu"}
          groomName={groom?.fullName || "Chú Rể"}
          weddingDate={mainEvent?.eventDate || wedding.weddingDate}
          eventLocation={mainEvent?.address}
          canonicalUrl={
            typeof window !== "undefined" ? window.location.href : undefined
          }
          pageType="wedding"
        />

        <FallingHearts colors={colors} />

        <VietnamTraditionalLayout
          theme={theme}
          bride={bride}
          groom={groom}
          weddingDate={mainEvent?.eventDate || wedding.weddingDate}
          events={events || []}
          loveStories={stories || []}
          galleryImages={images}
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

  return (
    <>
      <WeddingSEO
        brideName={bride?.fullName || "Cô Dâu"}
        groomName={groom?.fullName || "Chú Rể"}
        weddingDate={mainEvent?.eventDate || wedding.weddingDate}
        eventLocation={mainEvent?.address}
        description={wedding.title}
        canonicalUrl={
          typeof window !== "undefined" ? window.location.href : undefined
        }
        pageType="wedding"
      />

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
        {/* Love Story Section */}
        <LoveStorySection colors={colors} stories={stories} />

        {/* Events Timeline */}
        <EventsTimelineSection colors={colors} events={events} />

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
export default PublicWeddingContent;
