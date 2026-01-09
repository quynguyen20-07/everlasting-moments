import { ColorScheme } from "@/types";
import { Heart } from "lucide-react";

export type FooterSectionProps = {
  colors: ColorScheme;
  brideName: string;
  groomName: string;
  weddingDate: string;
};

const FooterSection: React.FC<FooterSectionProps> = ({
  colors,
  brideName,
  groomName,
  weddingDate,
}) => {
  return (
    <footer
      className="py-12 border-t-[0.4px]"
      style={{
        borderTop: "1px solid transparent",
        background: `
        linear-gradient(
          to bottom,
          ${colors?.accent}CC 0%,   
          ${colors?.accent}80 40%,   
          ${colors?.accent}00 75%,   
          ${colors?.accent}CC 100%
        )
      `,
        backgroundClip: "padding-box, border-box",
        borderImage: `linear-gradient(to right, ${colors?.primary}33, ${colors?.primary}33) 1`,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <Heart
          className="w-12 h-12 mx-auto mb-4 animate-pulse"
          style={{ color: colors?.primary, fill: `${colors?.primary}20` }}
        />
        <h3
          className="font-display text-3xl font-bold mb-2"
          style={{ color: colors?.text }}
        >
          {brideName} & {groomName}
        </h3>
        <p className="text-lg mb-2" style={{ color: colors?.muted }}>
          {weddingDate}
        </p>
        <p className="text-sm" style={{ color: colors?.muted }}>
          "Trong tình yêu và trong cuộc sống, những điều nhỏ bé tạo nên điều lớn
          lao nhất"
        </p>
        <p className="text-xs mt-6" style={{ color: colors?.muted }}>
          Được tạo với tình yêu bằng True Loves ❤️
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
