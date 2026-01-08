import {
  HeroSection,
  CountdownSection,
  BrideGroomSection,
  LoveStorySection,
  EventsSection,
  RSVPSection,
  BankAccountSection,
  WishesSection,
  FooterSection,
  MusicPlayer,
  TemplateProvider,
} from "@/components/public-wedding";
import type { Wedding, BankAccount, Wish } from "@/types/graphql";
import { getPatternSVG } from "@/lib/templates/wedding-templates";
import { PageLoading } from "@/components/LoadingSpinner";
import { getPublicWeddingApi } from "@/lib/api/wedding";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Mock bank accounts and wishes for demo (in real app, these would come from API)
const mockBankAccounts: BankAccount[] = [];
const mockWishes: Wish[] = [];

export default function PublicWedding() {
  const { slug } = useParams<{ slug: string }>();
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWedding() {
      if (!slug) {
        setError("Không tìm thấy thiệp mời");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPublicWeddingApi(slug);
        if (data) {
          setWedding(data);
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
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
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
            className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
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

  const bride = wedding.weddingDetail?.bride;
  const groom = wedding.weddingDetail?.groom;
  const mainEvent = wedding.weddingDetail?.weddingEvents?.find(
    (e) => e.type === "ceremony" || e.type === "reception"
  );

  // Determine pattern based on theme
  const getPatternClass = () => {
    const primaryColor =
      wedding.themeSettings?.primaryColor?.toLowerCase() || "";
    if (primaryColor.includes("pink") || primaryColor.includes("rose"))
      return "template-pattern-roses";
    if (primaryColor.includes("green") || primaryColor.includes("sage"))
      return "template-pattern-botanical";
    if (primaryColor.includes("navy") || primaryColor.includes("dark"))
      return "template-pattern-stars";
    if (
      primaryColor.includes("white") ||
      primaryColor.includes("black") ||
      primaryColor.includes("minimal")
    )
      return "template-pattern-geometric";
    if (primaryColor.includes("purple") || primaryColor.includes("lavender"))
      return "template-pattern-lavender";
    return "template-pattern-gold";
  };

  return (
    <TemplateProvider themeSettings={wedding.themeSettings}>
      <Helmet>
        <title>{`${groom?.fullName || "Chú Rể"} & ${
          bride?.fullName || "Cô Dâu"
        } - Thiệp Mời Cưới`}</title>
        <meta
          name="description"
          content={`Thiệp mời đám cưới của ${groom?.fullName || "Chú Rể"} và ${
            bride?.fullName || "Cô Dâu"
          }${
            mainEvent?.eventDate
              ? ` - ${new Date(mainEvent.eventDate).toLocaleDateString(
                  "vi-VN"
                )}`
              : ""
          }`}
        />
        <meta
          property="og:title"
          content={`${groom?.fullName || "Chú Rể"} & ${
            bride?.fullName || "Cô Dâu"
          }`}
        />
        <meta property="og:description" content={wedding.title} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Background Music Player */}
      <MusicPlayer musicUrl={wedding.themeSettings?.backgroundMusic} />

      <main
        className={`template-wrapper min-h-screen bg-background ${getPatternClass()}`}
      >
        {/* Hero Section */}
        <HeroSection wedding={wedding} />

        {/* Countdown Section */}
        <CountdownSection wedding={wedding} />

        {/* Bride & Groom Section */}
        <BrideGroomSection wedding={wedding} />

        {/* Love Story Section */}
        <LoveStorySection wedding={wedding} />

        {/* Events Section */}
        <EventsSection wedding={wedding} />

        {/* RSVP Section */}
        <RSVPSection wedding={wedding} />

        {/* Bank Account Section */}
        <BankAccountSection
          bankAccounts={mockBankAccounts}
          brideFullName={bride?.fullName}
          groomFullName={groom?.fullName}
        />

        {/* Wishes Section */}
        <WishesSection wedding={wedding} wishes={mockWishes} />

        {/* Footer Section */}
        <FooterSection wedding={wedding} />
      </main>
    </TemplateProvider>
  );
}
