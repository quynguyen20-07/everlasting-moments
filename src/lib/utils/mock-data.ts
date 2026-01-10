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
  events: [
    {
      id: "1",
      title: "Lễ Vu Quy",
      type: "Ceremony",
      startTime: "08:00",
      endTime: "09:00",
      eventDate: Date.now(),
      address: "Nhà Gái - 123 Đường ABC, Quận 1, TP.HCM",
      description: "Lễ đón dâu truyền thống",
    },
    {
      id: "2",
      title: "Lễ Thành Hôn",
      type: "Ceremony",
      startTime: "10:00",
      endTime: "12:00",
      eventDate: Date.now(),
      address: "Nhà Trai - 456 Đường XYZ, Quận 7, TP.HCM",
      description: "Lễ kết hôn chính thức",
    },
    {
      id: "3",
      title: "Tiệc Cưới",
      type: "Reception",
      startTime: "18:00",
      endTime: "20:00",
      eventDate: Date.now(),
      address: "Trung Tâm Hội Nghị White Palace",
      description: "Tiệc mừng cùng gia đình và bạn bè",
    },
  ],
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

export const COLOR_SCHEMES = {
  // 1. MẪU ĐỎ VÀNG (Nổi bật, truyền thống)
  "red-gold": {
    primary: "#B22222", // Đỏ đậm truyền thống
    secondary: "#D4AF37", // Vàng kim loại
    accent: "#FFF5E1", // Vàng nhạt
    background: "#FFFEF7", // Kem vàng
    text: "#3D1C1C", // Nâu đỏ đậm
    muted: "#C17C74", // Đỏ nâu
  },

  // 2. MẪU TRẮNG XANH DƯƠNG (Thanh lịch, hiện đại)
  "white-blue": {
    primary: "#1E90FF", // Xanh dương đậm
    secondary: "#87CEEB", // Xanh dương nhạt
    accent: "#F0F8FF", // Xanh dương rất nhạt
    background: "#FFFFFF", // Trắng tinh
    text: "#000080", // Navy
    muted: "#4682B4", // Xanh thép
  },

  // 3. MẪU VÀNG XANH (Độc đáo, sang trọng)
  "gold-green": {
    primary: "#D4AF37", // Vàng kim loại
    secondary: "#228B22", // Xanh lá rừng
    accent: "#F5F0E6", // Kem vàng
    background: "#F8F8F0", // Trắng ngà
    text: "#2C3E50", // Xanh đen
    muted: "#7B8A8B", // Xám xanh
  },

  // 4. MẪU HOA RUM (Tinh tế, thanh khiết)
  "calla-lily": {
    primary: "#228B22", // Xanh lá rừng
    secondary: "#90EE90", // Xanh lá sáng
    accent: "#F0FFF0", // Xanh lá nhạt
    background: "#FFFFFF", // Trắng tinh
    text: "#006400", // Xanh lá đậm
    muted: "#98FB98", // Xanh lá pastel
  },

  // 5. MẪU HỒNG (Lãng mạn, dịu dàng)
  "blush-romance": {
    primary: "#DB7093", // Hồng đậm
    secondary: "#FFB6C1", // Hồng nhạt
    accent: "#FFF0F5", // Hồng rất nhạt
    background: "#FFF8FA", // Trắng hồng
    text: "#4A0E2B", // Hồng đậm
    muted: "#C08497", // Hồng trung tính
  },

  // 6. MẪU ĐỎ TRẮNG (Truyền thống, rực rỡ)
  "red-white": {
    primary: "#DC143C", // Đỏ tươi
    secondary: "#FF6B6B", // Đỏ cam
    accent: "#FFE5E5", // Đỏ pastel
    background: "#FFFFFF", // Trắng
    text: "#8B0000", // Đỏ đậm
    muted: "#CD5C5C", // Đỏ trung tính
  },

  // 7. MẪU BE SỮA (Ấm áp, tinh tế)
  "cream-beige": {
    primary: "#D2B48C", // Be
    secondary: "#F5DEB3", // Be nhạt
    accent: "#FAF0E6", // Be rất nhạt
    background: "#FFFEF7", // Kem
    text: "#654321", // Nâu đậm
    muted: "#BC8F8F", // Hồng nâu
  },

  // 8. MẪU HOA SEN (Thanh tao, quý phái)
  "lotus-pink": {
    primary: "#E75480", // Hồng sen
    secondary: "#FFC0CB", // Hồng nhạt
    accent: "#FFE4E1", // Hồng rất nhạt
    background: "#FFF5EE", // Trắng hồng
    text: "#800080", // Tím đậm
    muted: "#D87093", // Hồng tím
  },

  // 9. MẪU ĐỎ MỘC NÂU (Ấm cúng, tự nhiên)
  "red-wood": {
    primary: "#8B4513", // Nâu gỗ
    secondary: "#A0522D", // Nâu đất
    accent: "#F5DEB3", // Be
    background: "#FAF0E6", // Be nhạt
    text: "#3D1C1C", // Nâu đỏ
    muted: "#CD853F", // Nâu peru
  },

  // 10. MẪU XANH DƯƠNG (Mát mẻ, thanh lịch)
  "navy-blue": {
    primary: "#000080", // Navy
    secondary: "#4169E1", // Xanh hoàng gia
    accent: "#F0F8FF", // Xanh nhạt
    background: "#FFFFFF", // Trắng
    text: "#191970", // Navy trung bình
    muted: "#6A5ACD", // Xanh tím
  },

  // 11. MẪU VÀNG (Sang trọng, lộng lẫy)
  "luxury-gold": {
    primary: "#FFD700", // Vàng
    secondary: "#F0E68C", // Vàng nhạt
    accent: "#FFF8DC", // Vàng kem
    background: "#FFFFF0", // Trắng vàng
    text: "#B8860B", // Vàng đậm
    muted: "#DAA520", // Vàng nâu
  },

  // 12. MẪU HOA ĐỎ BE (Dịu dàng, ấm áp)
  "blossom-beige": {
    primary: "#DC143C", // Đỏ
    secondary: "#F5DEB3", // Be
    accent: "#FFF5E1", // Be nhạt
    background: "#FFFEF7", // Kem
    text: "#8B0000", // Đỏ đậm
    muted: "#DEB887", // Nâu be
  },

  // 13. MẪU ĐỒ KHÔNG ẢNH (Minimalist)
  "minimal-red": {
    primary: "#B22222", // Đỏ đậm
    secondary: "#FFFFFF", // Trắng
    accent: "#F5F5F5", // Xám nhạt
    background: "#FFFFFF", // Trắng
    text: "#000000", // Đen
    muted: "#808080", // Xám
  },

  // 14. MẪU CƠ BẢN (Classic)
  "classic-elegance": {
    primary: "#000000", // Đen
    secondary: "#808080", // Xám
    accent: "#F8F8F8", // Xám nhạt
    background: "#FFFFFF", // Trắng
    text: "#000000", // Đen
    muted: "#666666", // Xám đậm
  },

  // 15. MẪU XANH LÁ (Tươi mới, tự nhiên)
  "sage-garden": {
    primary: "#2E8B57", // Xanh biển đậm
    secondary: "#8FBC8F", // Xanh lá nhạt
    accent: "#F0FFF0", // Xanh lá rất nhạt
    background: "#F5FAF5", // Trắng xanh
    text: "#1E3A1E", // Xanh lá đậm
    muted: "#6B8E6B", // Xanh olive
  },
};

export const styleLabels: Record<string, string> = {
  classic: "Cổ điển",
  modern: "Hiện đại",
  rustic: "Mộc mạc",
  romantic: "Lãng mạn",
  minimalist: "Tối giản",
  luxury: "Xa hoa",
  elegant: "Thanh lịch",
  traditional: "Truyền thống",
  vintage: "Cổ kính",
  nature: "Tự nhiên",
};

export const getTemplateById = (id: string) => {
  return TEMPLATES_LIST.find((template) => template.id === id);
};

export const getAllTemplates = () => {
  return TEMPLATES_LIST;
};
