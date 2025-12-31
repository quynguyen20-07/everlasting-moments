import { Heart, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cream-dark border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <span className="font-display text-xl font-semibold">
                True loves
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Tạo những thiệp cưới kỹ thuật số đẹp mắt và ghi lại câu chuyện
              tình yêu của bạn.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:border-primary/30 transition-colors"
              >
                <Facebook className="w-5 h-5 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:border-primary/30 transition-colors"
              >
                <Instagram className="w-5 h-5 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:border-primary/30 transition-colors"
              >
                <Mail className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/templates"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mẫu thiệp
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tính năng
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Giá cả
                </Link>
              </li>
              <li>
                <Link
                  to="/demo"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Công ty</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 True loves. Được tạo ra với{" "}
            <Heart className="w-3 h-3 inline-block text-primary fill-primary" />{" "}
            dành cho những cặp đôi hạnh phúc.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>🇻🇳 Tiếng Việt</span>
            <span>🇺🇸 English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
