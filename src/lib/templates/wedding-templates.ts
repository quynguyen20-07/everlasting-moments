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
