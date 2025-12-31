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

export const TEMPLATES_LIST = [
  {
    id: "soft-pink",
    name: "Lãng Mạn Hồng Nhạt",
    description: "Hồng mềm mại và hoa lá thanh lịch",
    text: "",
    color: "from-pink-100 to-rose-50",
    accent: "bg-pink-200",
  },
  {
    id: "golden-hour",
    name: "Giờ Vàng",
    description: "Vàng ấm áp và tones champagne",
    text: "",
    color: "from-amber-50 to-yellow-50",
    accent: "bg-amber-200",
  },
  {
    id: "garden-party",
    name: "Bữa Tiệc Khu Vườn",
    description: "Xanh mát và cảm giác thiên nhiên",
    text: "",
    color: "from-emerald-50 to-green-50",
    accent: "bg-emerald-200",
  },
  {
    id: "classic-elegant",
    name: "Thanh Lịch Cổ Điển",
    description: "Đen và trắng vượt thời gian",
    text: "",
    color: "from-gray-50 to-slate-50",
    accent: "bg-gray-300",
  },
  {
    id: "navy-elegance",
    name: "Thanh Lịch Navy",
    description: "Xanh navy sâu và quý phái",
    text: "",
    color: "from-[#07133a] via-[#153e75] to-[#2a69ac]",
    accent: "bg-[rgba(255,255,255,0.06)]/70 ring-1 ring-white/6",
  },
  {
    id: "burgundy-romance",
    name: "Tình Yêu Đỏ Đô",
    description: "Đỏ đô sang trọng và tinh tế",
    text: "#952733",
    color: "from-[#3b0b0b] via-[#6b1f21] to-[#8b2b2b]",
    accent: "bg-[rgba(255,255,255,0.06)]/70 ring-1 ring-white/6",
  },
  {
    id: "blush-gold",
    name: "Hồng Đào & Vàng Hồng",
    description: "Hồng đào kết hợp vàng hồng lấp lánh",
    text: "",
    color: "from-pink-200 to-yellow-100",
    accent: "bg-yellow-300",
  },
  {
    id: "lavender-dream",
    name: "Giấc Mơ Tím Nhạt",
    description: "Tím nhạt mơ mộng và lãng mạn",
    text: "",
    color: "from-purple-200 to-pink-100",
    accent: "bg-purple-300",
  },
  {
    id: "sage-green",
    name: "Xanh Rêu Yên Tĩnh",
    description: "Xanh rêu nhẹ nhàng và thanh bình",
    text: "",
    color: "from-green-200 to-blue-100",
    accent: "bg-green-300",
  },
  {
    id: "peach-sunset",
    name: "Hoàng Hôn Đào",
    description: "Cam đào ấm áp như hoàng hôn",
    text: "",
    color: "from-orange-200 to-red-100",
    accent: "bg-orange-300",
  },
  {
    id: "mint-fresh",
    name: "Bạc Hà Tươi Mát",
    description: "Xanh bạc hà sáng sủa và tươi mới",
    text: "",
    color: "from-cyan-100 to-green-100",
    accent: "bg-cyan-200",
  },
  {
    id: "mauve-sophistication",
    name: "Xám Tím Tinh Tế",
    description: "Xám tím nhẹ nhàng và hiện đại",
    text: "",
    color: "from-gray-300 to-purple-200",
    accent: "bg-purple-300",
  },
  {
    id: "coral-bliss",
    name: "San Hô Rực Rỡ",
    description: "San hô sáng sủa và năng động",
    text: "",
    color: "from-orange-300 to-pink-200",
    accent: "bg-orange-400",
  },
  {
    id: "ivory-classic",
    name: "Kem Cổ Điển",
    description: "Kem tinh tế và thanh lịch vượt thời gian",
    text: "",
    color: "from-yellow-50 to-gray-50",
    accent: "bg-yellow-100",
  },
  {
    id: "champagne-glam",
    name: "Rượu Champagne Lấp Lánh",
    description: "Champagne sang trọng và lấp lánh",
    text: "",
    color: "from-yellow-200 to-yellow-50",
    accent: "bg-yellow-300",
  },
];

export const getTemplateById = (id: string) => {
  return TEMPLATES_LIST.find((template) => template.id === id);
};

export const getAllTemplates = () => {
  return TEMPLATES_LIST;
};

export const COLOR_SCHEMES = {
  "soft-pink": {
    primary: "#E11D48",
    secondary: "#F472B6",
    accent: "#FBCFE8",
    background: "#FFF1F2",
    text: "#4C0519",
    muted: "#9D174D",
    music: "/music/soft-piano.mp3",
  },
  "golden-hour": {
    primary: "#D97706",
    secondary: "#FBBF24",
    accent: "#FDE68A",
    background: "#FFFBEB",
    text: "#451A03",
    muted: "#92400E",
    music: "/music/warm-strings.mp3",
  },
  "garden-party": {
    primary: "#059669",
    secondary: "#10B981",
    accent: "#A7F3D0",
    background: "#ECFDF5",
    text: "#064E3B",
    muted: "#047857",
    music: "/music/nature-melody.mp3",
  },
  "classic-elegant": {
    primary: "#374151",
    secondary: "#6B7280",
    accent: "#E5E7EB",
    background: "#F9FAFB",
    text: "#111827",
    muted: "#4B5563",
    music: "/music/classical-piano.mp3",
  },
  "navy-elegance": {
    primary: "#1E40AF",
    secondary: "#3B82F6",
    accent: "#BFDBFE",
    background: "#EFF6FF",
    text: "#1E3A8A",
    muted: "#1D4ED8",
    music: "/music/orchestral.mp3",
  },
  "burgundy-romance": {
    primary: "#9F1239",
    secondary: "#BE123C",
    accent: "#FECDD3",
    background: "#FFF1F2",
    text: "#4C0519",
    muted: "#881337",
    music: "/music/romantic-violin.mp3",
  },
  "blush-gold": {
    primary: "#DB2777",
    secondary: "#F472B6",
    accent: "#FBCFE8",
    background: "#FDF2F8",
    text: "#831843",
    muted: "#BE185D",
    music: "/music/love-song.mp3",
  },
  "lavender-dream": {
    primary: "#7C3AED",
    secondary: "#A78BFA",
    accent: "#DDD6FE",
    background: "#F5F3FF",
    text: "#4C1D95",
    muted: "#5B21B6",
    music: "/music/dreamy-ambient.mp3",
  },
};

export const DEFAULT_COLORS = {
  primary: "#E11D48",
  secondary: "#F472B6",
  accent: "#FBCFE8",
  background: "#FFF1F2",
  text: "#4C0519",
  muted: "#9D174D",
  music: "/music/default-wedding.mp3",
};

export const COUPLE_DATA = {
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
