// Wedding Templates System - Separated Themes (Colors) and Layouts

// ============= THEME DEFINITIONS (Color Schemes) =============

export interface TemplateTheme {
  id: string;
  name: string;
  description: string;
  color: string; // Tailwind gradient classes
  accent: string; // Tailwind accent class
  primaryHsl: string; // HSL value for primary color
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    card: string;
  };
  gradient: string;
  pattern: string;
  isDark?: boolean;
}

export const TEMPLATES_THEME_LIST: TemplateTheme[] = [
  {
    id: "red-gold",
    name: "Đỏ Vàng",
    description: "Sắc đỏ và vàng truyền thống, rực rỡ và sang trọng",
    color: "from-red-50 to-amber-50",
    accent: "bg-amber-400",
    primaryHsl: "0 65% 45%",
    colors: {
      primary: "0 65% 45%",
      secondary: "45 80% 60%",
      background: "40 33% 98%",
      foreground: "0 20% 15%",
      accent: "45 70% 55%",
      muted: "0 15% 93%",
      card: "40 40% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(0 65% 50%) 0%, hsl(45 80% 55%) 100%)",
    pattern: "floral-gold",
  },
  {
    id: "white-blue",
    name: "Trắng Xanh Dương",
    description: "Trắng tinh khôi kết hợp xanh dương thanh lịch",
    color: "from-blue-50 to-white",
    accent: "bg-blue-400",
    primaryHsl: "210 100% 55%",
    colors: {
      primary: "210 100% 55%",
      secondary: "210 30% 95%",
      background: "210 20% 99%",
      foreground: "210 25% 15%",
      accent: "210 80% 60%",
      muted: "210 15% 93%",
      card: "210 30% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(210 100% 60%) 0%, hsl(210 80% 45%) 100%)",
    pattern: "geometric",
  },
  {
    id: "gold-green",
    name: "Vàng Xanh",
    description: "Vàng kim loại và xanh lá độc đáo, sang trọng",
    color: "from-emerald-50 to-amber-50",
    accent: "bg-amber-400",
    primaryHsl: "45 65% 50%",
    colors: {
      primary: "45 65% 50%",
      secondary: "150 35% 90%",
      background: "50 30% 98%",
      foreground: "45 25% 15%",
      accent: "150 40% 45%",
      muted: "45 20% 93%",
      card: "50 35% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(45 65% 55%) 0%, hsl(150 40% 40%) 100%)",
    pattern: "botanical",
  },
  {
    id: "calla-lily",
    name: "Hoa Rum",
    description: "Trắng tinh và xanh lá thanh khiết, tinh tế",
    color: "from-green-50 to-white",
    accent: "bg-emerald-400",
    primaryHsl: "135 60% 35%",
    colors: {
      primary: "135 60% 35%",
      secondary: "135 25% 92%",
      background: "135 15% 98%",
      foreground: "135 25% 15%",
      accent: "135 50% 45%",
      muted: "135 15% 93%",
      card: "135 20% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(135 60% 40%) 0%, hsl(135 50% 30%) 100%)",
    pattern: "botanical",
  },
  {
    id: "blush-romance",
    name: "Hồng Lãng Mạn",
    description: "Sắc hồng phấn dịu dàng, lãng mạn và nữ tính",
    color: "from-pink-100 to-rose-50",
    accent: "bg-pink-300",
    primaryHsl: "350 45% 65%",
    colors: {
      primary: "350 45% 65%",
      secondary: "350 35% 95%",
      background: "350 25% 98%",
      foreground: "350 20% 15%",
      accent: "15 55% 70%",
      muted: "350 20% 93%",
      card: "350 30% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(350 45% 70%) 0%, hsl(350 50% 55%) 100%)",
    pattern: "roses",
  },
  {
    id: "red-white",
    name: "Đỏ Trắng",
    description: "Đỏ rực rỡ trên nền trắng, cổ điển và ấn tượng",
    color: "from-red-50 to-white",
    accent: "bg-red-500",
    primaryHsl: "0 80% 50%",
    colors: {
      primary: "0 80% 50%",
      secondary: "0 25% 95%",
      background: "0 10% 99%",
      foreground: "0 25% 15%",
      accent: "0 70% 55%",
      muted: "0 15% 93%",
      card: "0 20% 99%",
    },
    gradient: "linear-gradient(135deg, hsl(0 80% 55%) 0%, hsl(0 70% 45%) 100%)",
    pattern: "floral-gold",
  },
  {
    id: "cream-beige",
    name: "Be Sữa",
    description: "Sắc be ấm áp, tinh tế và thanh lịch",
    color: "from-amber-50 to-yellow-50",
    accent: "bg-amber-300",
    primaryHsl: "35 45% 60%",
    colors: {
      primary: "35 45% 60%",
      secondary: "35 35% 92%",
      background: "40 30% 98%",
      foreground: "35 25% 15%",
      accent: "35 50% 65%",
      muted: "35 20% 93%",
      card: "40 35% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(35 45% 65%) 0%, hsl(35 50% 50%) 100%)",
    pattern: "floral-gold",
  },
  {
    id: "lotus-pink",
    name: "Hoa Sen",
    description: "Hồng sen thanh tao, quý phái và dịu dàng",
    color: "from-pink-50 to-rose-100",
    accent: "bg-pink-400",
    primaryHsl: "340 65% 60%",
    colors: {
      primary: "340 65% 60%",
      secondary: "340 35% 93%",
      background: "340 20% 98%",
      foreground: "340 25% 15%",
      accent: "340 55% 65%",
      muted: "340 20% 93%",
      card: "340 25% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(340 65% 65%) 0%, hsl(340 60% 50%) 100%)",
    pattern: "roses",
  },
  {
    id: "red-wood",
    name: "Đỏ Mộc Nâu",
    description: "Nâu gỗ ấm cúng kết hợp đỏ truyền thống",
    color: "from-amber-100 to-orange-50",
    accent: "bg-orange-700",
    primaryHsl: "20 60% 35%",
    colors: {
      primary: "20 60% 35%",
      secondary: "25 35% 90%",
      background: "30 25% 97%",
      foreground: "20 30% 15%",
      accent: "20 55% 45%",
      muted: "25 20% 92%",
      card: "30 30% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(20 60% 40%) 0%, hsl(20 50% 30%) 100%)",
    pattern: "botanical",
  },
  {
    id: "navy-blue",
    name: "Xanh Dương Navy",
    description: "Xanh navy mát mẻ kết hợp trắng thanh lịch",
    color: "from-blue-100 to-blue-50",
    accent: "bg-blue-700",
    primaryHsl: "240 100% 25%",
    colors: {
      primary: "240 100% 25%",
      secondary: "220 35% 92%",
      background: "220 25% 97%",
      foreground: "220 30% 15%",
      accent: "220 60% 45%",
      muted: "220 20% 93%",
      card: "220 30% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(240 100% 30%) 0%, hsl(220 80% 35%) 100%)",
    pattern: "geometric",
  },
  {
    id: "luxury-gold",
    name: "Vàng Lộng Lẫy",
    description: "Vàng rực rỡ, sang trọng và lộng lẫy",
    color: "from-yellow-100 to-amber-50",
    accent: "bg-yellow-500",
    primaryHsl: "50 100% 50%",
    colors: {
      primary: "50 100% 50%",
      secondary: "45 40% 92%",
      background: "45 30% 98%",
      foreground: "40 30% 15%",
      accent: "45 80% 55%",
      muted: "45 25% 93%",
      card: "45 35% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(50 100% 55%) 0%, hsl(45 80% 45%) 100%)",
    pattern: "stars",
  },
  {
    id: "blossom-beige",
    name: "Hoa Đỏ Be",
    description: "Đỏ rực rỡ trên nền be dịu dàng, ấm áp",
    color: "from-amber-100 to-pink-50",
    accent: "bg-red-500",
    primaryHsl: "0 80% 50%",
    colors: {
      primary: "0 80% 50%",
      secondary: "35 35% 92%",
      background: "30 25% 98%",
      foreground: "0 25% 15%",
      accent: "0 70% 55%",
      muted: "30 20% 93%",
      card: "35 30% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(0 80% 55%) 0%, hsl(35 60% 50%) 100%)",
    pattern: "roses",
  },
  {
    id: "minimal-red",
    name: "Đỏ Tối Giản",
    description: "Đỏ đậm minimalist, hiện đại và ấn tượng",
    color: "from-red-50 to-white",
    accent: "bg-red-600",
    primaryHsl: "0 65% 40%",
    colors: {
      primary: "0 65% 40%",
      secondary: "0 20% 95%",
      background: "0 5% 99%",
      foreground: "0 20% 15%",
      accent: "0 60% 50%",
      muted: "0 10% 94%",
      card: "0 15% 99%",
    },
    gradient: "linear-gradient(135deg, hsl(0 65% 45%) 0%, hsl(0 55% 35%) 100%)",
    pattern: "geometric",
  },
  {
    id: "classic-elegance",
    name: "Cổ Điển Thanh Lịch",
    description: "Trắng đen cổ điển, thanh lịch và tinh tế",
    color: "from-gray-100 to-white",
    accent: "bg-gray-800",
    primaryHsl: "0 0% 20%",
    colors: {
      primary: "0 0% 20%",
      secondary: "0 0% 96%",
      background: "0 0% 100%",
      foreground: "0 0% 10%",
      accent: "0 0% 35%",
      muted: "0 0% 95%",
      card: "0 0% 99%",
    },
    gradient: "linear-gradient(135deg, hsl(0 0% 25%) 0%, hsl(0 0% 15%) 100%)",
    pattern: "geometric",
  },
  {
    id: "sage-garden",
    name: "Vườn Xanh Olive",
    description: "Xanh olive tự nhiên, mộc mạc và thanh lịch",
    color: "from-emerald-50 to-green-50",
    accent: "bg-emerald-400",
    primaryHsl: "150 35% 45%",
    colors: {
      primary: "150 35% 45%",
      secondary: "150 25% 90%",
      background: "60 20% 97%",
      foreground: "150 20% 15%",
      accent: "35 45% 65%",
      muted: "150 15% 92%",
      card: "60 25% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(150 35% 50%) 0%, hsl(150 40% 35%) 100%)",
    pattern: "botanical",
  },
  {
    id: "midnight-luxe",
    name: "Đêm Xa Hoa",
    description: "Xanh đêm kết hợp vàng, sang trọng và quyến rũ",
    color: "from-blue-950 to-blue-900",
    accent: "bg-yellow-500",
    primaryHsl: "38 55% 55%",
    isDark: true,
    colors: {
      primary: "38 55% 55%",
      secondary: "220 40% 25%",
      background: "220 30% 12%",
      foreground: "45 30% 95%",
      accent: "38 60% 65%",
      muted: "220 25% 20%",
      card: "220 30% 16%",
    },
    gradient:
      "linear-gradient(135deg, hsl(38 55% 60%) 0%, hsl(38 50% 45%) 100%)",
    pattern: "stars",
  },
  {
    id: "lavender-dream",
    name: "Giấc Mơ Lavender",
    description: "Tím lavender dịu dàng, mơ màng và cuốn hút",
    color: "from-purple-100 to-violet-50",
    accent: "bg-purple-400",
    primaryHsl: "270 40% 60%",
    colors: {
      primary: "270 40% 60%",
      secondary: "270 25% 92%",
      background: "270 20% 98%",
      foreground: "270 25% 15%",
      accent: "300 30% 75%",
      muted: "270 15% 93%",
      card: "270 25% 99%",
    },
    gradient:
      "linear-gradient(135deg, hsl(270 40% 65%) 0%, hsl(270 45% 50%) 100%)",
    pattern: "floral-lavender",
  },
];

// ============= LAYOUT DEFINITIONS =============

export type LayoutStyle =
  | "classic"
  | "modern"
  | "rustic"
  | "romantic"
  | "minimalist"
  | "luxury";

export interface TemplateLayout {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  preview: string;
  style: LayoutStyle;
  fonts: {
    heading: string;
    body: string;
  };
  // Default theme for this layout
  defaultThemeId: string;
}

export const TEMPLATE_LAYOUTS: TemplateLayout[] = [
  {
    id: "classic-elegance",
    name: "Classic Elegance",
    nameVi: "Cổ Điển Sang Trọng",
    description:
      "Timeless elegance with traditional layout and refined details",
    descriptionVi:
      "Phong cách cổ điển vượt thời gian với bố cục truyền thống và chi tiết tinh tế",
    preview: "/templates/classic-elegance.jpg",
    style: "classic",
    fonts: {
      heading: "Georgia",
      body: "Cormorant Garamond",
    },
    defaultThemeId: "red-gold",
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    nameVi: "Hiện Đại Tối Giản",
    description: "Clean, contemporary design with minimalist aesthetics",
    descriptionVi: "Thiết kế hiện đại, sạch sẽ với thẩm mỹ tối giản",
    preview: "/templates/modern-minimal.jpg",
    style: "modern",
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    defaultThemeId: "classic-elegance",
  },
  {
    id: "romantic-garden",
    name: "Romantic Garden",
    nameVi: "Vườn Lãng Mạn",
    description: "Soft, dreamy design with floral accents and romantic vibes",
    descriptionVi:
      "Thiết kế nhẹ nhàng, mơ màng với điểm nhấn hoa và không khí lãng mạn",
    preview: "/templates/romantic-garden.jpg",
    style: "romantic",
    fonts: {
      heading: "Cormorant Garamond",
      body: "Lora",
    },
    defaultThemeId: "blush-romance",
  },
  {
    id: "rustic-charm",
    name: "Rustic Charm",
    nameVi: "Mộc Mạc Duyên Dáng",
    description: "Natural, earthy aesthetics with botanical elements",
    descriptionVi: "Thẩm mỹ tự nhiên, mộc mạc với các yếu tố thực vật",
    preview: "/templates/rustic-charm.jpg",
    style: "rustic",
    fonts: {
      heading: "Georgia",
      body: "ui-sans-serif",
    },
    defaultThemeId: "sage-garden",
  },
  {
    id: "luxury-royal",
    name: "Luxury Royal",
    nameVi: "Xa Hoa Hoàng Gia",
    description: "Opulent design with rich details and luxurious feel",
    descriptionVi:
      "Thiết kế xa hoa với chi tiết phong phú và cảm giác sang trọng",
    preview: "/templates/luxury-royal.jpg",
    style: "luxury",
    fonts: {
      heading: "Georgia",
      body: "Cormorant Garamond",
    },
    defaultThemeId: "luxury-gold",
  },
  {
    id: "minimalist-pure",
    name: "Minimalist Pure",
    nameVi: "Thuần Khiết Tối Giản",
    description: "Ultra-clean design focusing on typography and whitespace",
    descriptionVi:
      "Thiết kế siêu sạch tập trung vào typography và khoảng trắng",
    preview: "/templates/minimalist-pure.jpg",
    style: "minimalist",
    fonts: {
      heading: "Inter",
      body: "ui-sans-serif",
    },
    defaultThemeId: "minimal-red",
  },
];

// ============= COMBINED TEMPLATE (Layout + Theme) =============

export interface WeddingTemplate {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  preview: string;
  layout: TemplateLayout;
  theme: TemplateTheme;
  style: LayoutStyle;
  fonts: {
    heading: string;
    body: string;
  };
  // For backward compatibility
  colors: TemplateTheme["colors"];
  gradient: string;
  pattern: string;
}

// Generate combined templates from layouts and themes
export function createWeddingTemplate(
  layout: TemplateLayout,
  theme: TemplateTheme,
): WeddingTemplate {
  return {
    id: `${layout.id}-${theme.id}`,
    name: `${layout.name} - ${theme.name}`,
    nameVi: `${layout.nameVi} - ${theme.name}`,
    description: `${
      layout.description
    } with ${theme.description.toLowerCase()}`,
    descriptionVi: `${
      layout.descriptionVi
    } với ${theme.description.toLowerCase()}`,
    preview: layout.preview,
    layout,
    theme,
    style: layout.style,
    fonts: layout.fonts,
    colors: theme.colors,
    gradient: theme.gradient,
    pattern: theme.pattern,
  };
}

// Default wedding templates (layout + default theme)
export const weddingTemplates: WeddingTemplate[] = TEMPLATE_LAYOUTS.map(
  (layout) => {
    const theme =
      TEMPLATES_THEME_LIST.find((t) => t.id === layout.defaultThemeId) ||
      TEMPLATES_THEME_LIST[0];
    return createWeddingTemplate(layout, theme);
  },
);

// ============= LEGACY SUPPORT: TEMPLATES_LIST =============
// Keep this for backward compatibility with existing components

export const TEMPLATES_LIST = TEMPLATES_THEME_LIST.map((theme) => ({
  id: theme.id,
  name: theme.name,
  description: theme.description,
  color: theme.color,
  accent: theme.accent,
  primaryHsl: theme.primaryHsl,
  style: "classic" as LayoutStyle, // Default style
}));

// ============= HELPER FUNCTIONS =============

export function getThemeById(id: string): TemplateTheme | undefined {
  return TEMPLATES_THEME_LIST.find((t) => t.id === id);
}

export function getLayoutById(id: string): TemplateLayout | undefined {
  return TEMPLATE_LAYOUTS.find((l) => l.id === id);
}

export function getTemplateById(id: string): WeddingTemplate | undefined {
  return weddingTemplates.find((t) => t.id === id);
}

export function getTemplateByStyle(style: LayoutStyle): WeddingTemplate[] {
  return weddingTemplates.filter((t) => t.style === style);
}

export function getThemesByPattern(pattern: string): TemplateTheme[] {
  return TEMPLATES_THEME_LIST.filter((t) => t.pattern === pattern);
}

// Create a custom template with any layout + theme combination
export function getCustomTemplate(
  layoutId: string,
  themeId: string,
): WeddingTemplate | null {
  const layout = getLayoutById(layoutId);
  const theme = getThemeById(themeId);

  if (!layout || !theme) return null;

  return createWeddingTemplate(layout, theme);
}

// Get all possible template combinations
export function getAllTemplateCombinations(): WeddingTemplate[] {
  const combinations: WeddingTemplate[] = [];

  TEMPLATE_LAYOUTS.forEach((layout) => {
    TEMPLATES_THEME_LIST.forEach((theme) => {
      combinations.push(createWeddingTemplate(layout, theme));
    });
  });

  return combinations;
}

// Style labels for UI
export const styleLabels: Record<LayoutStyle, string> = {
  classic: "Cổ điển",
  modern: "Hiện đại",
  rustic: "Mộc mạc",
  romantic: "Lãng mạn",
  minimalist: "Tối giản",
  luxury: "Xa hoa",
};

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

export function generateThemeCSS(theme: TemplateTheme): string {
  return `
    --template-primary: ${theme.colors.primary};
    --template-secondary: ${theme.colors.secondary};
    --template-background: ${theme.colors.background};
    --template-foreground: ${theme.colors.foreground};
    --template-accent: ${theme.colors.accent};
    --template-muted: ${theme.colors.muted};
    --template-card: ${theme.colors.card};
    --template-gradient: ${theme.gradient};
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
