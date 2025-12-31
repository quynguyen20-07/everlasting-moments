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
    color: "from-pink-100 to-rose-50",
    accent: "bg-pink-200",
  },
  {
    id: "golden-hour",
    name: "Giờ Vàng",
    description: "Vàng ấm áp và tones champagne",
    color: "from-amber-50 to-yellow-50",
    accent: "bg-amber-200",
  },
  {
    id: "garden-party",
    name: "Bữa Tiệc Khu Vườn",
    description: "Xanh mát và cảm giác thiên nhiên",
    color: "from-emerald-50 to-green-50",
    accent: "bg-emerald-200",
  },
  {
    id: "classic-elegant",
    name: "Thanh Lịch Cổ Điển",
    description: "Đen và trắng vượt thời gian",
    color: "from-gray-50 to-slate-50",
    accent: "bg-gray-300",
  },
  {
    id: "navy-elegance",
    name: "Thanh Lịch Navy",
    description: "Xanh navy sâu và quý phái",
    color: "from-[#07133a] via-[#153e75] to-[#2a69ac]",
    accent: "bg-[rgba(255,255,255,0.06)]/70 ring-1 ring-white/6",
  },
  {
    id: "burgundy-romance",
    name: "Tình Yêu Đỏ Đô",
    description: "Đỏ đô sang trọng và tinh tế",
    color: "from-[#3b0b0b] via-[#6b1f21] to-[#8b2b2b]",
    accent: "bg-[rgba(255,255,255,0.06)]/70 ring-1 ring-white/6",
  },
  {
    id: "blush-gold",
    name: "Hồng Đào & Vàng Hồng",
    description: "Hồng đào kết hợp vàng hồng lấp lánh",
    color: "from-pink-200 to-yellow-100",
    accent: "bg-yellow-300",
  },
  {
    id: "lavender-dream",
    name: "Giấc Mơ Tím Nhạt",
    description: "Tím nhạt mơ mộng và lãng mạn",
    color: "from-purple-200 to-pink-100",
    accent: "bg-purple-300",
  },
  {
    id: "sage-green",
    name: "Xanh Rêu Yên Tĩnh",
    description: "Xanh rêu nhẹ nhàng và thanh bình",
    color: "from-green-200 to-blue-100",
    accent: "bg-green-300",
  },
  {
    id: "peach-sunset",
    name: "Hoàng Hôn Đào",
    description: "Cam đào ấm áp như hoàng hôn",
    color: "from-orange-200 to-red-100",
    accent: "bg-orange-300",
  },
  {
    id: "mint-fresh",
    name: "Bạc Hà Tươi Mát",
    description: "Xanh bạc hà sáng sủa và tươi mới",
    color: "from-cyan-100 to-green-100",
    accent: "bg-cyan-200",
  },
  {
    id: "mauve-sophistication",
    name: "Xám Tím Tinh Tế",
    description: "Xám tím nhẹ nhàng và hiện đại",
    color: "from-gray-300 to-purple-200",
    accent: "bg-purple-300",
  },
  {
    id: "coral-bliss",
    name: "San Hô Rực Rỡ",
    description: "San hô sáng sủa và năng động",
    color: "from-orange-300 to-pink-200",
    accent: "bg-orange-400",
  },
  {
    id: "ivory-classic",
    name: "Kem Cổ Điển",
    description: "Kem tinh tế và thanh lịch vượt thời gian",
    color: "from-yellow-50 to-gray-50",
    accent: "bg-yellow-100",
  },
  {
    id: "champagne-glam",
    name: "Rượu Champagne Lấp Lánh",
    description: "Champagne sang trọng và lấp lánh",
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
