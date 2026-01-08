import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateVN(
  date?: number | string | null,
  fallback = "Chưa đặt ngày"
): string {
  if (!date) return fallback;

  const timestamp = typeof date === "string" ? Number(date) : date;
  if (Number.isNaN(timestamp)) return fallback;

  return new Date(timestamp).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// 6 Premium Wedding Templates - matching wedding-templates.ts
export const TEMPLATES_LIST = [
  {
    id: "golden-elegance",
    name: "Vàng Sang Trọng",
    description: "Sắc vàng champagne cổ điển, sang trọng và tinh tế",
    color: "from-amber-50 to-yellow-50",
    accent: "bg-amber-300",
    primaryHsl: "38 45% 55%",
    style: "classic",
  },
  {
    id: "blush-romance",
    name: "Hồng Phấn Lãng Mạn",
    description: "Sắc hồng phấn nhẹ nhàng, lãng mạn và nữ tính",
    color: "from-pink-100 to-rose-50",
    accent: "bg-pink-300",
    primaryHsl: "350 45% 65%",
    style: "romantic",
  },
  {
    id: "sage-garden",
    name: "Vườn Xanh Olive",
    description: "Xanh olive tự nhiên, mộc mạc và thanh lịch",
    color: "from-emerald-50 to-green-50",
    accent: "bg-emerald-300",
    primaryHsl: "150 35% 45%",
    style: "rustic",
  },
  {
    id: "midnight-luxe",
    name: "Đêm Xa Hoa",
    description: "Xanh đêm kết hợp vàng, sang trọng và quyến rũ",
    color: "from-[#0f172a] via-[#1e3a5f] to-[#1e40af]",
    accent: "bg-amber-400/20 ring-1 ring-amber-400/30",
    primaryHsl: "38 55% 55%",
    style: "luxury",
    isDark: true,
  },
  {
    id: "pure-minimal",
    name: "Thuần Khiết Tối Giản",
    description: "Trắng đen tinh khiết, hiện đại và tối giản",
    color: "from-gray-50 to-white",
    accent: "bg-gray-200",
    primaryHsl: "0 0% 15%",
    style: "minimalist",
  },
  {
    id: "lavender-dream",
    name: "Giấc Mơ Lavender",
    description: "Tím lavender dịu dàng, mơ màng và cuốn hút",
    color: "from-purple-100 to-violet-50",
    accent: "bg-purple-300",
    primaryHsl: "270 40% 60%",
    style: "romantic",
  },
];

export const getTemplateById = (id: string) => {
  return TEMPLATES_LIST.find((template) => template.id === id);
};

export const getAllTemplates = () => {
  return TEMPLATES_LIST;
};

export const COLOR_SCHEMES = {
  "blush-romance": {
    primary: "#DB7093", // Pale violet red
    secondary: "#FFB6C1", // Light pink
    accent: "#FFF0F5", // Lavender blush
    background: "#FFF8FA", // Very light pink
    text: "#4A0E2B", // Dark pink
    muted: "#C08497", // Dusty rose
  },
  "golden-elegance": {
    primary: "#B8860B", // Dark golden rod
    secondary: "#D4AF37", // Gold
    accent: "#F5DEB3", // Wheat
    background: "#FFFEF7", // Cream
    text: "#3D2914", // Dark brown
    muted: "#8B7355", // Tan
  },
  "sage-garden": {
    primary: "#6B8E6B", // Sage green
    secondary: "#8FBC8F", // Dark sea green
    accent: "#F0FFF0", // Honeydew
    background: "#F5FAF5", // Light green tint
    text: "#2D4A2D", // Forest green
    muted: "#698B69", // Olive drab
  },
  "midnight-luxe": {
    primary: "#D4AF37", // Gold
    secondary: "#1E3A5F", // Dark navy
    accent: "#C9B037", // Metallic gold
    background: "#0F172A", // Dark navy
    text: "#F1E5D1", // Cream
    muted: "#94A3B8", // Slate
  },
  "pure-minimal": {
    primary: "#1A1A1A", // Near black
    secondary: "#4A4A4A", // Dark gray
    accent: "#F5F5F5", // White smoke
    background: "#FFFFFF", // White
    text: "#1A1A1A", // Near black
    muted: "#6B6B6B", // Gray
  },
  "lavender-dream": {
    primary: "#9370DB", // Medium purple
    secondary: "#B19CD9", // Light purple
    accent: "#E6E6FA", // Lavender
    background: "#FAF8FF", // Very light purple
    text: "#4A3A6A", // Dark purple
    muted: "#8B7CB8", // Medium lavender
  },
};

// Default color scheme fallback (golden elegance)
export const DEFAULT_COLORS = {
  primary: "#B8860B",
  secondary: "#D4AF37",
  accent: "#F5DEB3",
  background: "#FFFEF7",
  text: "#3D2914",
  muted: "#8B7355",
};

export const coupleData = {
  bride: { name: "Ngọc Linh", fullName: "Nguyễn Ngọc Linh" },
  groom: { name: "Minh Tuấn", fullName: "Trần Minh Tuấn" },
  weddingDate: new Date("2025-02-14T10:00:00"),
  story: `Trong một chiều mưa Đà Nẵng, tại quán cà phê nhỏ ven sông Hàn, 
  chúng tôi đã gặp nhau một cách tình cờ. Một cuốn sách rơi, một ánh mắt giao nhau, 
  và thế là hành trình yêu thương bắt đầu. 
  Từ những buổi hoàng hôn trên biển Mỹ Khê đến những đêm trò chuyện dài dưới ánh sao, 
  mỗi khoảnh khắc đều là một mảnh ghép hoàn hảo cho tình yêu của chúng tôi. 
  Hôm nay, chúng tôi chính thức bước tiếp hành trình ấy bên nhau, 
  với lời hứa về một tương lai tràn đầy yêu thương và hạnh phúc.`,
  events: [
    {
      name: "Lễ Vu Quy",
      date: "14/02/2025",
      time: "08:00",
      location: "Nhà Gái - 123 Đường ABC, Quận 1, TP.HCM",
      description: "Lễ đón dâu truyền thống",
    },
    {
      name: "Lễ Thành Hôn",
      date: "14/02/2025",
      time: "10:00",
      location: "Nhà Trai - 456 Đường XYZ, Quận 7, TP.HCM",
      description: "Lễ kết hôn chính thức",
    },
    {
      name: "Tiệc Cưới",
      date: "14/02/2025",
      time: "18:00",
      location: "Trung Tâm Hội Nghị White Palace",
      description: "Tiệc mừng cùng gia đình và bạn bè",
    },
  ],
  wishes: [
    {
      name: "Anh Khoa",
      message:
        "Chúc hai bạn trăm năm hạnh phúc! Tình yêu luôn nồng ấm như ngày đầu 💕",
      date: "2 ngày trước",
    },
    {
      name: "Hương Giang",
      message:
        "Mong rằng cuộc sống của hai bạn sẽ tràn ngập tiếng cười và yêu thương!",
      date: "3 ngày trước",
    },
    {
      name: "Minh Đức",
      message:
        "Chúc mừng hai bạn! Thật hạnh phúc khi chứng kiến tình yêu của các bạn nở hoa ✨",
      date: "1 ngày trước",
    },
  ],
  bankInfo: {
    bride: {
      bank: "Vietcombank",
      account: "1234567890",
      name: "NGUYEN NGOC LINH",
      branch: "Chi nhánh Hồ Chí Minh",
    },
    groom: {
      bank: "Techcombank",
      account: "0987654321",
      name: "TRAN MINH TUAN",
      branch: "Chi nhánh Hà Nội",
    },
  },
};
