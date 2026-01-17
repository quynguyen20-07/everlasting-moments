import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#fdfaf8] border-t border-[#e8d4c8]/50 py-12">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#c4a99b] fill-[#c4a99b]" />
            <span className="font-display text-xl font-semibold text-[#4a3f3a]">
              True loves
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 text-sm">
          <Link
            to="/about"
            className="text-[#7a6b64] hover:text-[#c4a99b] transition-colors"
          >
            Điều khoản sử dụng
          </Link>
          <Link
            to="/privacy"
            className="text-[#7a6b64] hover:text-[#c4a99b] transition-colors"
          >
            Chính sách bảo mật
          </Link>
          <Link
            to="/contact"
            className="text-[#7a6b64] hover:text-[#c4a99b] transition-colors"
          >
            Liên hệ
          </Link>
          <Link
            to="/blog"
            className="text-[#7a6b64] hover:text-[#c4a99b] transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-[#7a6b64]">
            © 2024 True loves. Được tạo ra với{" "}
            <Heart className="w-3 h-3 inline-block text-[#c4a99b] fill-[#c4a99b]" />{" "}
            dành cho những cặp đôi hạnh phúc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
