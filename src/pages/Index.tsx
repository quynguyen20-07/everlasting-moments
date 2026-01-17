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
          content="Tạo những thiệp cưới kỹ thuật số tuyệt đẹp, nắm bắt được bản chất của ngày đặc biệt của bạn. Chia sẻ câu chuyện tình yêu của bạn, quản lý RSVPs, và làm hài lòng khách mời với một trải nghiệm khó quên."
        />
      </Helmet>

      <div className="min-h-screen bg-[#fdfaf8]">
        <Navbar />
        <main>
          <Hero />
          <Templates />
          <Features />
          <HowItWorks />
          <CTA />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
