import Testimonials from "@/components/landing/Testimonials";
import HowItWorks from "@/components/landing/HowItWorks";
import Templates from "@/components/landing/Templates";
import Features from "@/components/landing/Features";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import { Helmet } from "react-helmet-async";
import CTA from "@/components/landing/CTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>True Loves - Tạo Thiệp Cưới Kỹ Thuật Số Đẹp Mắt</title>
        <meta
          name="description"
          content="Create stunning digital wedding invitations that capture the essence of your special day. Share your love story, manage RSVPs, and delight your guests."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Templates />
          <HowItWorks />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
