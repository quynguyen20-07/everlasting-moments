import { Heart, Gift, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface FooterSectionProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
}

const FooterSection = ({ colors }: FooterSectionProps) => {
  const coupleData = {
    bride: {
      name: "Ngọc Linh",
      fullName: "Nguyễn Ngọc Linh",
      phone: "0912 345 678",
    },
    groom: {
      name: "Minh Tuấn",
      fullName: "Trần Minh Tuấn",
      phone: "0987 654 321",
    },
    email: "ngoclinh.minhtuan@wedding.com",
    address: "Hội trường White Palace, 123 Nguyễn Văn Linh, Quận 7, TP.HCM",
  };

  return (
    <footer
      className="pt-20 pb-12 border-t"
      style={{
        borderColor: `${colors.primary}20`,
        background: `${colors.accent}05`,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Bank Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="text-center mb-12">
            <Gift
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: colors.primary }}
            />
            <h3
              className="font-display text-3xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Quà Cưới & Thiệp Mời
            </h3>
            <p className="text-lg" style={{ color: colors.muted }}>
              Sự hiện diện của bạn là món quà lớn nhất với chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bride's Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-white border shadow-lg"
              style={{ borderColor: `${colors.primary}20` }}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: "white",
                  }}
                >
                  <Heart className="w-8 h-8" />
                </div>
                <h4
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  {coupleData.bride.name}
                </h4>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center justify-center gap-2">
                    <Phone
                      className="w-4 h-4"
                      style={{ color: colors.primary }}
                    />
                    <span style={{ color: colors.muted }}>
                      {coupleData.bride.phone}
                    </span>
                  </p>
                  <p
                    className="font-mono text-base font-medium"
                    style={{ color: colors.text }}
                  >
                    Vietcombank: 1234 5678 9012
                  </p>
                  <p style={{ color: colors.muted }}>NGUYEN NGOC LINH</p>
                </div>
              </div>
            </motion.div>

            {/* Groom's Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-white border shadow-lg"
              style={{ borderColor: `${colors.primary}20` }}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                    color: "white",
                  }}
                >
                  <Heart className="w-8 h-8" />
                </div>
                <h4
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  {coupleData.groom.name}
                </h4>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center justify-center gap-2">
                    <Phone
                      className="w-4 h-4"
                      style={{ color: colors.primary }}
                    />
                    <span style={{ color: colors.muted }}>
                      {coupleData.groom.phone}
                    </span>
                  </p>
                  <p
                    className="font-mono text-base font-medium"
                    style={{ color: colors.text }}
                  >
                    Techcombank: 9876 5432 1098
                  </p>
                  <p style={{ color: colors.muted }}>TRAN MINH TUAN</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-6 h-6" style={{ color: colors.primary }} />
              <span style={{ color: colors.muted }}>{coupleData.email}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-6 h-6" style={{ color: colors.primary }} />
              <span style={{ color: colors.muted }}>0987 654 321</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-6 h-6" style={{ color: colors.primary }} />
              <span style={{ color: colors.muted }} className="text-sm">
                {coupleData.address}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Final Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center pt-8 border-t"
          style={{ borderColor: `${colors.primary}20` }}
        >
          <Heart
            className="w-12 h-12 mx-auto mb-4 animate-pulse"
            style={{ color: colors.primary, fill: `${colors.primary}20` }}
          />
          <h3
            className="font-display text-3xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            {coupleData.bride.name} & {coupleData.groom.name}
          </h3>
          <p className="text-lg mb-4" style={{ color: colors.muted }}>
            14 Tháng 2, 2025 • White Palace
          </p>
          <p className="text-sm mb-2 italic" style={{ color: colors.muted }}>
            "Cảm ơn bạn đã đến với ngày trọng đại của chúng tôi"
          </p>
          <p className="text-xs" style={{ color: colors.muted }}>
            Được tạo với tình yêu bằng True Loves Wedding Platform ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
