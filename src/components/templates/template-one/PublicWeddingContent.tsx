import {
  useGetBride,
  useGetGroom,
  useGetWeddingEvents,
  useWeddingImages,
} from "@/hooks";
import { ColorType, Wedding, Wish } from "@/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { formatDateVN } from "@/lib/utils";

import WeddingInvitationCard from "./WeddingInvitationCard";
import WeddingFooterQuote from "./WeddingFooterQuote";
import BankAccountModal from "./BankAccountModal";
import WeddingGiftCard from "./WeddingGiftCard";
import WeddingCalendar from "./WeddingCalendar";
import GallerySection from "./GallerySection";
import TopAlbumCover from "./TopAlbumCover";
import FallingHearts from "./FallingHearts";
import WeddingCountdown from "./CountDown";
import Hero from "./Hero";

interface PublicWeddingContentProps {
  wedding: Wedding;
  colors: ColorType | undefined;
  wishes: Wish[];
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
  showShareModal: boolean;
  setShowShareModal: (open: boolean) => void;
  isPlaying: boolean;
  toggleMusic: () => void;
}

function PublicWeddingContent({
  wedding,
  colors,
  isPlaying,
  toggleMusic,
}: PublicWeddingContentProps) {
  const { data: bride, refetch: isBrideRefetch } = useGetBride(wedding.id);
  const { data: groom, refetch: isGroomRefetch } = useGetGroom(wedding.id);
  const { data: events, refetch: isEventRefetch } = useGetWeddingEvents(
    wedding.id,
  );

  const [isOpenQrModal, setIsOpenQrModal] = useState(false);

  const { data: images } = useWeddingImages(wedding.id);

  const mainEvent = events?.find(
    (e) => e.type === "ceremony" || e.type === "reception",
  );

  useEffect(() => {
    if (wedding) {
      isBrideRefetch();
      isGroomRefetch();
      isEventRefetch();
    }

    return () => {};
  }, [isBrideRefetch, isEventRefetch, isGroomRefetch, wedding]);

  return (
    <>
      <FallingHearts colors={colors} />
      <main className={`template-wrapper min-h-screen bg-background ${""}`}>
        {/* Hero Section */}
        <Hero
          coupleData={{ bride: bride, groom: groom }}
          date={mainEvent?.eventDate || wedding.weddingDate}
        />

        <div className="w-full p-4">
          <WeddingInvitationCard
            groomName={groom?.fullName}
            brideName={bride?.fullName}
            dateText={formatDateVN(mainEvent?.eventDate || wedding.weddingDate)}
            timeText={"11:30"}
            location={"Tại tư gia nhà trai"}
            address={"Thôn Mỹ Liên - Xã Kỳ Văn - Tỉnh Hà Tĩnh"}
          />
        </div>

        <div className="my-8">
          <TopAlbumCover image="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769883220/Vowly/o8qp0zzg30wrcfxrdpnp.jpg" />
        </div>

        <WeddingCalendar
          date={new Date(mainEvent?.eventDate || wedding.weddingDate)}
        />

        <WeddingCountdown
          targetTime={mainEvent?.eventDate || wedding.weddingDate}
        />

        {/* Gallery */}
        <GallerySection colors={colors} images={images} />

        <WeddingGiftCard
          image="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769885240/Vowly/wrqvppxdh0ytxborfptl.png"
          onClick={() => setIsOpenQrModal(true)}
        />

        <section className="relative">
          <img
            src="https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769882273/Vowly/zzlz1xpkybvdro8zy4bu.jpg"
            alt="Wedding"
            className="w-full h-auto object-cover"
          />

          <WeddingFooterQuote
            text={`Trong em,
                  là nơi tôi thuộc về,
                  là trái tim tôi nương tựa,
                  là mãi mãi.`}
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
        <BankAccountModal
          isOpen={isOpenQrModal}
          setIsOpen={setIsOpenQrModal}
          brideAcc={{
            id: "giang",
            role: "bride",
            bankName: "Techcombank",
            accountNumber: "3883868820",
            accountHolder: "Lê Thị Huyền Giang",
            qrCodeImg:
              "https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769929670/Vowly/mvn8gaaezhwyblwa3o5i.jpg",
          }}
          groomAcc={{
            id: "duc",
            role: "bride",
            bankName: "Techcombank",
            accountNumber: "3883868898",
            accountHolder: "Lê Minh Đức",
            qrCodeImg:
              "https://res.cloudinary.com/nguyen-the-quy/image/upload/v1769929698/Vowly/kngetdht63wd3iw8mkpq.jpg",
          }}
        />
      </main>
    </>
  );
}
export default PublicWeddingContent;
