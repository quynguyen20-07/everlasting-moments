// Mock data for development and demo purposes
import type { User, Wedding, Guest } from "@/types/wedding";

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "demo@wedding.com",
    fullName: "Nguyễn Văn A",
    role: "user",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    email: "admin@wedding.com",
    fullName: "Admin",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "user-3",
    email: "couple@test.com",
    fullName: "Trần Thị B",
    role: "user",
    isActive: true,
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
];

// Mock Weddings
export const mockWeddings: Wedding[] = [
  {
    id: "wedding-1",
    userId: "user-1",
    slug: "minh-anh-wedding",
    title: "Đám cưới Minh & Anh",
    weddingDate: "2025-02-14",
    language: "vi",
    status: "published",
    themeSettings: {
      primaryColor: "#D4A574",
      secondaryColor: "#F6C1CC",
      fontHeading: "Georgia",
      fontBody: "Lora",
      template: "blush-romance",
      backgroundMusic: "/music/wedding-song.mp3",
    },
    weddingDetail: {
      id: "detail-1",
      weddingId: "wedding-1",
      bride: {
        fullName: "Trần Thị Mai Anh",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
        shortBio: "Một cô gái yêu thích nghệ thuật và âm nhạc",
        familyInfo: "Con ông Trần Văn Hoàng và bà Nguyễn Thị Lan",
      },
      groom: {
        fullName: "Nguyễn Văn Minh",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        shortBio: "Kỹ sư phần mềm, yêu thích du lịch",
        familyInfo: "Con ông Nguyễn Văn Hùng và bà Lê Thị Thu",
      },
      loveStories: [
        {
          id: "story-1",
          title: "Lần đầu gặp gỡ",
          content: "Chúng tôi gặp nhau tại một buổi hội thảo công nghệ...",
          storyDate: "2020-03-15",
          imageUrl:
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
        },
        {
          id: "story-2",
          title: "Ngày hẹn hò đầu tiên",
          content: "Valentine đầu tiên bên nhau tại một quán café nhỏ...",
          storyDate: "2021-02-14",
          imageUrl:
            "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
        },
        {
          id: "story-3",
          title: "Cầu hôn",
          content: "Dưới ánh đèn Giáng sinh lung linh...",
          storyDate: "2023-12-25",
          imageUrl:
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
        },
      ],
      weddingEvents: [
        {
          id: "event-1",
          type: "ceremony",
          title: "Lễ Vu Quy",
          eventDate: new Date().toISOString(),
          startTime: "08:00",
          endTime: "09:30",
          address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
          mapEmbedUrl: "https://maps.google.com/?q=123+Nguyen+Hue",
          description: "Lễ vu quy tại nhà gái",
        },
        {
          id: "event-2",
          type: "reception",
          title: "Tiệc Cưới",
          eventDate: new Date().toISOString(),
          startTime: "18:00",
          endTime: "21:00",
          address: "Trung tâm tiệc cưới White Palace, Quận 7, TP.HCM",
          mapEmbedUrl: "https://maps.google.com/?q=White+Palace",
          description: "Tiệc cưới chính thức",
        },
      ],
    },
    viewCount: 1250,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-20T15:30:00Z",
  },
];

// Mock Guests
export const mockGuests: Guest[] = [
  {
    id: "guest-1",
    weddingId: "wedding-1",
    fullName: "Lê Văn Cường",
    phone: "0901234567",
    email: "cuong@email.com",
    numberOfGuests: 2,
    attendanceStatus: "confirmed",
    tableNumber: "table-1",
    message: "Chúc hai bạn trăm năm hạnh phúc!",
    isActive: true,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "guest-2",
    weddingId: "wedding-1",
    fullName: "Phạm Thị Dung",
    phone: "0912345678",
    numberOfGuests: 1,
    attendanceStatus: "confirmed",
    message: "Happy Wedding!",
    isActive: true,
    createdAt: "2024-12-02T11:00:00Z",
    updatedAt: "2024-12-02T11:00:00Z",
  },
  {
    id: "guest-3",
    weddingId: "wedding-1",
    fullName: "Hoàng Minh Tuấn",
    phone: "0923456789",
    numberOfGuests: 3,
    attendanceStatus: "pending",
    isActive: true,
    createdAt: "2024-12-05T09:00:00Z",
    updatedAt: "2024-12-05T09:00:00Z",
  },
  {
    id: "guest-4",
    weddingId: "wedding-1",
    fullName: "Vũ Thị Hoa",
    phone: "0934567890",
    numberOfGuests: 2,
    attendanceStatus: "declined",
    message: "Rất tiếc không thể tham dự được",
    isActive: true,
    createdAt: "2024-12-06T14:00:00Z",
    updatedAt: "2024-12-06T14:00:00Z",
  },
];

// Helper functions for mock API
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const findUserByEmail = (email: string) =>
  mockUsers.find((u) => u.email === email);

export const findWeddingById = (id: string) =>
  mockWeddings.find((w) => w.id === id);

export const findWeddingsByUserId = (userId: string) =>
  mockWeddings.filter((w) => w.userId === userId);

export const generateMockToken = (user: User) =>
  btoa(
    JSON.stringify({
      userId: user.id,
      role: user.role,
      exp: Date.now() + 86400000,
    })
  );

export { generateId };
