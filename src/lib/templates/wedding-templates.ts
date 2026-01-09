// 6 Premium Wedding Templates with distinct themes

export interface WeddingTemplate {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    card: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  pattern: string;
  gradient: string;
  style: "classic" | "modern" | "rustic" | "romantic" | "minimalist" | "luxury";
}

export const weddingTemplates: WeddingTemplate[] = [
  {
    id: "golden-elegance",
    name: "Golden Elegance",
    nameVi: "Vàng Sang Trọng",
    description: "Classic gold and cream with timeless sophistication",
    descriptionVi: "Sắc vàng champagne cổ điển, sang trọng và tinh tế",
    preview: "/templates/golden-elegance.jpg",
    colors: {
      primary: "38 45% 55%",
      secondary: "350 35% 92%",
      background: "40 33% 98%",
      foreground: "30 10% 15%",
      accent: "15 50% 75%",
      muted: "35 25% 93%",
      card: "40 40% 99%",
    },
    fonts: {
      heading: "Abril Fatface",
      body: "Cormorant Garamond",
    },
    pattern: "floral-gold",
    gradient:
      "linear-gradient(135deg, hsl(38 45% 65%) 0%, hsl(38 45% 50%) 100%)",
    style: "classic",
  },
  {
    id: "blush-romance",
    name: "Blush Romance",
    nameVi: "Hồng Phấn Lãng Mạn",
    description: "Soft pink and rose gold for a romantic feel",
    descriptionVi: "Sắc hồng phấn nhẹ nhàng, lãng mạn và nữ tính",
    preview: "/templates/blush-romance.jpg",
    colors: {
      primary: "350 45% 65%",
      secondary: "350 35% 95%",
      background: "350 25% 98%",
      foreground: "350 20% 15%",
      accent: "15 55% 70%",
      muted: "350 20% 93%",
      card: "350 30% 99%",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Abril Fatface",
    },
    pattern: "roses",
    gradient:
      "linear-gradient(135deg, hsl(350 45% 70%) 0%, hsl(350 50% 55%) 100%)",
    style: "romantic",
  },
  {
    id: "sage-garden",
    name: "Sage Garden",
    nameVi: "Vườn Xanh Olive",
    description: "Natural sage green with earthy elegance",
    descriptionVi: "Xanh olive tự nhiên, mộc mạc và thanh lịch",
    preview: "/templates/sage-garden.jpg",
    colors: {
      primary: "150 35% 45%",
      secondary: "150 25% 90%",
      background: "60 20% 97%",
      foreground: "150 20% 15%",
      accent: "35 45% 65%",
      muted: "150 15% 92%",
      card: "60 25% 99%",
    },
    fonts: {
      heading: "Abril Fatface",
      body: "ui-sans-serif",
    },
    pattern: "botanical",
    gradient:
      "linear-gradient(135deg, hsl(150 35% 50%) 0%, hsl(150 40% 35%) 100%)",
    style: "rustic",
  },
  {
    id: "midnight-luxe",
    name: "Midnight Luxe",
    nameVi: "Đêm Xa Hoa",
    description: "Deep navy and gold for dramatic luxury",
    descriptionVi: "Xanh đêm kết hợp vàng, sang trọng và quyến rũ",
    preview: "/templates/midnight-luxe.jpg",
    colors: {
      primary: "38 55% 55%",
      secondary: "220 40% 25%",
      background: "220 30% 12%",
      foreground: "45 30% 95%",
      accent: "38 60% 65%",
      muted: "220 25% 20%",
      card: "220 30% 16%",
    },
    fonts: {
      heading: "Abril Fatface",
      body: "Cormorant Garamond",
    },
    pattern: "stars",
    gradient:
      "linear-gradient(135deg, hsl(38 55% 60%) 0%, hsl(38 50% 45%) 100%)",
    style: "luxury",
  },
  {
    id: "pure-minimal",
    name: "Pure Minimal",
    nameVi: "Thuần Khiết Tối Giản",
    description: "Clean white and black modern minimalism",
    descriptionVi: "Trắng đen tinh khiết, hiện đại và tối giản",
    preview: "/templates/pure-minimal.jpg",
    colors: {
      primary: "0 0% 15%",
      secondary: "0 0% 96%",
      background: "0 0% 100%",
      foreground: "0 0% 10%",
      accent: "0 0% 40%",
      muted: "0 0% 95%",
      card: "0 0% 99%",
    },
    fonts: {
      heading: "Abril Fatface",
      body: "ui-sans-serif",
    },
    pattern: "geometric",
    gradient: "linear-gradient(135deg, hsl(0 0% 25%) 0%, hsl(0 0% 10%) 100%)",
    style: "minimalist",
  },
  {
    id: "lavender-dream",
    name: "Lavender Dream",
    nameVi: "Giấc Mơ Lavender",
    description: "Soft purple and silver with ethereal charm",
    descriptionVi: "Tím lavender dịu dàng, mơ màng và cuốn hút",
    preview: "/templates/lavender-dream.jpg",
    colors: {
      primary: "270 40% 60%",
      secondary: "270 25% 92%",
      background: "270 20% 98%",
      foreground: "270 25% 15%",
      accent: "300 30% 75%",
      muted: "270 15% 93%",
      card: "270 25% 99%",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Abril Fatface",
    },
    pattern: "floral-lavender",
    gradient:
      "linear-gradient(135deg, hsl(270 40% 65%) 0%, hsl(270 45% 50%) 100%)",
    style: "romantic",
  },
];

// Template list for dropdown selection
export const TEMPLATES_LIST = [
  {
    id: "red-gold",
    name: "Đỏ Vàng",
    description: "Sắc đỏ và vàng truyền thống, rực rỡ và sang trọng",
    color: "from-red-50 to-amber-50",
    accent: "bg-amber-400",
    primaryHsl: "0 65% 45%",
    style: "classic",
  },
  {
    id: "white-blue",
    name: "Trắng Xanh Dương",
    description: "Trắng tinh khôi kết hợp xanh dương thanh lịch",
    color: "from-blue-50 to-white",
    accent: "bg-blue-400",
    primaryHsl: "210 100% 55%",
    style: "modern",
  },
  {
    id: "gold-green",
    name: "Vàng Xanh",
    description: "Vàng kim loại và xanh lá độc đáo, sang trọng",
    color: "from-emerald-50 to-amber-50",
    accent: "bg-amber-400",
    primaryHsl: "45 65% 50%",
    style: "luxury",
  },
  {
    id: "calla-lily",
    name: "Hoa Rum",
    description: "Trắng tinh và xanh lá thanh khiết, tinh tế",
    color: "from-green-50 to-white",
    accent: "bg-emerald-400",
    primaryHsl: "135 60% 35%",
    style: "romantic",
  },
  {
    id: "blush-romance",
    name: "Hồng Lãng Mạn",
    description: "Sắc hồng phấn dịu dàng, lãng mạn và nữ tính",
    color: "from-pink-100 to-rose-50",
    accent: "bg-pink-300",
    primaryHsl: "350 45% 65%",
    style: "romantic",
  },
  {
    id: "red-white",
    name: "Đỏ Trắng",
    description: "Đỏ rực rỡ trên nền trắng, cổ điển và ấn tượng",
    color: "from-red-50 to-white",
    accent: "bg-red-500",
    primaryHsl: "0 80% 50%",
    style: "classic",
  },
  {
    id: "cream-beige",
    name: "Be Sữa",
    description: "Sắc be ấm áp, tinh tế và thanh lịch",
    color: "from-amber-50 to-yellow-50",
    accent: "bg-amber-300",
    primaryHsl: "35 45% 60%",
    style: "romantic",
  },
  {
    id: "lotus-pink",
    name: "Hoa Sen",
    description: "Hồng sen thanh tao, quý phái và dịu dàng",
    color: "from-pink-50 to-rose-100",
    accent: "bg-pink-400",
    primaryHsl: "340 65% 60%",
    style: "romantic",
  },
  {
    id: "red-wood",
    name: "Đỏ Mộc Nâu",
    description: "Nâu gỗ ấm cúng kết hợp đỏ truyền thống",
    color: "from-amber-100 to-orange-50",
    accent: "bg-orange-700",
    primaryHsl: "20 60% 35%",
    style: "rustic",
  },
  {
    id: "navy-blue",
    name: "Xanh Dương Navy",
    description: "Xanh navy mát mẻ kết hợp trắng thanh lịch",
    color: "from-blue-100 to-blue-50",
    accent: "bg-blue-700",
    primaryHsl: "240 100% 25%",
    style: "modern",
  },
  {
    id: "luxury-gold",
    name: "Vàng Lộng Lẫy",
    description: "Vàng rực rỡ, sang trọng và lộng lẫy",
    color: "from-yellow-100 to-amber-50",
    accent: "bg-yellow-500",
    primaryHsl: "50 100% 50%",
    style: "luxury",
  },
  {
    id: "blossom-beige",
    name: "Hoa Đỏ Be",
    description: "Đỏ rực rỡ trên nền be dịu dàng, ấm áp",
    color: "from-amber-100 to-pink-50",
    accent: "bg-red-500",
    primaryHsl: "0 80% 50%",
    style: "romantic",
  },
  {
    id: "minimal-red",
    name: "Đỏ Tối Giản",
    description: "Đỏ đậm minimalist, hiện đại và ấn tượng",
    color: "from-red-50 to-white",
    accent: "bg-red-600",
    primaryHsl: "0 65% 40%",
    style: "minimalist",
  },
  {
    id: "classic-elegance",
    name: "Cổ Điển Thanh Lịch",
    description: "Trắng đen cổ điển, thanh lịch và tinh tế",
    color: "from-gray-100 to-white",
    accent: "bg-gray-800",
    primaryHsl: "0 0% 20%",
    style: "classic",
  },
  {
    id: "sage-garden",
    name: "Vườn Xanh Olive",
    description: "Xanh olive tự nhiên, mộc mạc và thanh lịch",
    color: "from-emerald-50 to-green-50",
    accent: "bg-emerald-400",
    primaryHsl: "150 35% 45%",
    style: "rustic",
  },
];

export function getTemplateById(id: string): WeddingTemplate | undefined {
  return weddingTemplates.find((t) => t.id === id);
}

export function getTemplateByStyle(
  style: WeddingTemplate["style"]
): WeddingTemplate[] {
  return weddingTemplates.filter((t) => t.style === style);
}

// Generate CSS variables from template colors
export function generateTemplateCSS(template: WeddingTemplate): string {
  return `
    --template-primary: ${template.colors.primary};
    --template-secondary: ${template.colors.secondary};
    --template-background: ${template.colors.background};
    --template-foreground: ${template.colors.foreground};
    --template-accent: ${template.colors.accent};
    --template-muted: ${template.colors.muted};
    --template-card: ${template.colors.card};
    --template-gradient: ${template.gradient};
  `;
}

// Get pattern SVG based on template
export function getPatternSVG(pattern: string): string {
  const patterns: Record<string, string> = {
    "floral-gold": `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a86c' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    roses: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8a0b0' fill-opacity='0.08'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    botanical: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b8e6b' fill-opacity='0.06'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    stars: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.08'%3E%3Cpath d='M30 30l3-6 3 6 6 3-6 3-3 6-3-6-6-3 6-3zM10 10l2-4 2 4 4 2-4 2-2 4-2-4-4-2 4-2zM50 50l2-4 2 4 4 2-4 2-2 4-2-4-4-2 4-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    geometric: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M0 20L20 0h20v20L20 40H0V20zm10 0l10-10 10 10-10 10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    "floral-lavender": `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239b7bb8' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };
  return patterns[pattern] || patterns["floral-gold"];
}
