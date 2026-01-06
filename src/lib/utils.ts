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
