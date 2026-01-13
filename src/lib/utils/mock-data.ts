import { IWeddingEvent } from "@/types";
import { TEMPLATES_THEME_LIST, styleLabels as templateStyleLabels } from "@/lib/templates/wedding-templates";

export const DEFAULT_COLORS = {
  primary: "#B8860B",
  secondary: "#D4AF37",
  accent: "#F5DEB3",
  background: "#FFFEF7",
  text: "#3D2914",
  muted: "#8B7355",
};

export const mockEvent: IWeddingEvent[] = [
  {
    id: "1",
    title: "Lễ Vu Quy",
    type: "ceremony",
    startTime: "08:00",
    endTime: "09:00",
    eventDate: Date.now().toString(),
    address: "Nhà Gái - 123 Đường ABC, Quận 1, TP.HCM",
    description: "Lễ đón dâu truyền thống",
  },
  {
    id: "2",
    title: "Lễ Thành Hôn",
    type: "ceremony",
    startTime: "10:00",
    endTime: "12:00",
    eventDate: Date.now().toString(),
    address: "Nhà Trai - 456 Đường XYZ, Quận 7, TP.HCM",
    description: "Lễ kết hôn chính thức",
  },
  {
    id: "3",
    title: "Tiệc Cưới",
    type: "reception",
    startTime: "18:00",
    endTime: "20:00",
    eventDate: Date.now().toString(),
    address: "Trung Tâm Hội Nghị White Palace",
    description: "Tiệc mừng cùng gia đình và bạn bè",
  },
];

export const coupleData = {
  bride: { name: "Ngọc Linh", fullName: "Nguyễn Ngọc Linh" },
  groom: { name: "Minh Tuấn", fullName: "Trần Minh Tuấn" },
  weddingDate: new Date("2025-02-14T10:00:00"),

  story: [
    {
      id: "69620ff2b3838ddbf9bd234d",
      title: "Lần đầu gặp nhau",
      content:
        "Trong một chiều mưa Đà Nẵng, tại quán cà phê nhỏ ven sông Hàn, chúng tôi đã gặp nhau một cách tình cờ. Một cuốn sách rơi, một ánh mắt giao nhau, và thế là hành trình yêu thương bắt đầu. Từ những buổi hoàng hôn trên biển Mỹ Khê đến những đêm trò chuyện dài dưới ánh sao, mỗi khoảnh khắc đều là một mảnh ghép hoàn hảo cho tình yêu của chúng tôi. Hôm nay, chúng tôi chính thức bước tiếp hành trình ấy bên nhau, với lời hứa về một tương lai tràn đầy yêu thương và hạnh phúc.\n\n",
      storyDate: "1767571200000",
      imageUrl: null,
    },
  ],

  events: mockEvent,

  wishes: [
    {
      id: "1",
      weddingId: "wedding_001",
      guestName: "Anh Khoa",
      message:
        "Chúc hai bạn trăm năm hạnh phúc! Tình yêu luôn nồng ấm như ngày đầu 💕",
      isApproved: true,
      isActive: true,
      createdAt: "2025-02-12T10:00:00Z",
      updatedAt: "2025-02-12T10:00:00Z",
    },
    {
      id: "2",
      weddingId: "wedding_001",
      guestName: "Hương Giang",
      message:
        "Mong rằng cuộc sống của hai bạn sẽ tràn ngập tiếng cười và yêu thương!",
      isApproved: true,
      isActive: true,
      createdAt: "2025-02-11T10:00:00Z",
      updatedAt: "2025-02-11T10:00:00Z",
    },
    {
      id: "3",
      weddingId: "wedding_001",
      guestName: "Minh Đức",
      message:
        "Chúc mừng hai bạn! Thật hạnh phúc khi chứng kiến tình yêu của các bạn nở hoa ✨",
      isApproved: true,
      isActive: true,
      createdAt: "2025-02-13T10:00:00Z",
      updatedAt: "2025-02-13T10:00:00Z",
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

// Re-export TEMPLATES_LIST from wedding-templates for backward compatibility
export { TEMPLATES_THEME_LIST as TEMPLATES_LIST } from "@/lib/templates/wedding-templates";

// Re-export styleLabels
export const styleLabels = templateStyleLabels;

export const COLOR_SCHEMES = {
  "red-gold": { primary: "#B22222", secondary: "#D4AF37", accent: "#FFF5E1", background: "#FFFEF7", text: "#3D1C1C", muted: "#C17C74" },
  "white-blue": { primary: "#1E90FF", secondary: "#87CEEB", accent: "#F0F8FF", background: "#FFFFFF", text: "#000080", muted: "#4682B4" },
  "gold-green": { primary: "#D4AF37", secondary: "#228B22", accent: "#F5F0E6", background: "#F8F8F0", text: "#2C3E50", muted: "#7B8A8B" },
  "calla-lily": { primary: "#228B22", secondary: "#90EE90", accent: "#F0FFF0", background: "#FFFFFF", text: "#006400", muted: "#98FB98" },
  "blush-romance": { primary: "#DB7093", secondary: "#FFB6C1", accent: "#FFF0F5", background: "#FFF8FA", text: "#4A0E2B", muted: "#C08497" },
  "red-white": { primary: "#DC143C", secondary: "#FF6B6B", accent: "#FFE5E5", background: "#FFFFFF", text: "#8B0000", muted: "#CD5C5C" },
  "cream-beige": { primary: "#D2B48C", secondary: "#F5DEB3", accent: "#FAF0E6", background: "#FFFEF7", text: "#654321", muted: "#BC8F8F" },
  "lotus-pink": { primary: "#E75480", secondary: "#FFC0CB", accent: "#FFE4E1", background: "#FFF5EE", text: "#800080", muted: "#D87093" },
  "red-wood": { primary: "#8B4513", secondary: "#A0522D", accent: "#F5DEB3", background: "#FAF0E6", text: "#3D1C1C", muted: "#CD853F" },
  "navy-blue": { primary: "#000080", secondary: "#4169E1", accent: "#F0F8FF", background: "#FFFFFF", text: "#191970", muted: "#6A5ACD" },
  "luxury-gold": { primary: "#FFD700", secondary: "#F0E68C", accent: "#FFF8DC", background: "#FFFFF0", text: "#B8860B", muted: "#DAA520" },
  "blossom-beige": { primary: "#DC143C", secondary: "#F5DEB3", accent: "#FFF5E1", background: "#FFFEF7", text: "#8B0000", muted: "#DEB887" },
  "minimal-red": { primary: "#B22222", secondary: "#FFFFFF", accent: "#F5F5F5", background: "#FFFFFF", text: "#000000", muted: "#808080" },
  "classic-elegance": { primary: "#000000", secondary: "#808080", accent: "#F8F8F8", background: "#FFFFFF", text: "#000000", muted: "#666666" },
  "sage-garden": { primary: "#2E8B57", secondary: "#8FBC8F", accent: "#F0FFF0", background: "#F5FAF5", text: "#1E3A1E", muted: "#6B8E6B" },
  "midnight-luxe": { primary: "#D4AF37", secondary: "#1A1A2E", accent: "#2D2D44", background: "#0F0F23", text: "#F5F5DC", muted: "#4A4A6A" },
  "lavender-dream": { primary: "#9370DB", secondary: "#E6E6FA", accent: "#F0E6FF", background: "#FAF8FF", text: "#4B0082", muted: "#B19CD9" },
};

export const getTemplateById = (id: string) => {
  return TEMPLATES_THEME_LIST.find((template) => template.id === id);
};

export const getAllTemplates = () => {
  return TEMPLATES_THEME_LIST;
};
