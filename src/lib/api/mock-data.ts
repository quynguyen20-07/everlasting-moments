// Mock data for development and demo purposes
import type { User, Wedding, Guest } from '@/types/wedding';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@wedding.com',
    name: 'Nguyễn Văn A',
    role: 'user',
    isLocked: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'admin@wedding.com',
    name: 'Admin',
    role: 'admin',
    isLocked: false,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'user-3',
    email: 'couple@test.com',
    name: 'Trần Thị B',
    role: 'user',
    isLocked: false,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
];

// Mock Weddings
export const mockWeddings: Wedding[] = [
  {
    id: 'wedding-1',
    userId: 'user-1',
    slug: 'minh-anh-wedding',
    name: 'Đám cưới Minh & Anh',
    status: 'published',
    bride: {
      id: 'bride-1',
      fullName: 'Trần Thị Mai Anh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      description: 'Một cô gái yêu thích nghệ thuật và âm nhạc',
      fatherName: 'Trần Văn Hoàng',
      motherName: 'Nguyễn Thị Lan',
    },
    groom: {
      id: 'groom-1',
      fullName: 'Nguyễn Văn Minh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Kỹ sư phần mềm, yêu thích du lịch',
      fatherName: 'Nguyễn Văn Hùng',
      motherName: 'Lê Thị Thu',
    },
    loveStory: [
      {
        id: 'story-1',
        date: '2020-03-15',
        title: 'Lần đầu gặp gỡ',
        description: 'Chúng tôi gặp nhau tại một buổi hội thảo công nghệ...',
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
      },
      {
        id: 'story-2',
        date: '2021-02-14',
        title: 'Ngày hẹn hò đầu tiên',
        description: 'Valentine đầu tiên bên nhau tại một quán café nhỏ...',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600',
      },
      {
        id: 'story-3',
        date: '2023-12-25',
        title: 'Cầu hôn',
        description: 'Dưới ánh đèn Giáng sinh lung linh...',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600',
      },
    ],
    events: [
      {
        id: 'event-1',
        type: 'ceremony',
        name: 'Lễ Vu Quy',
        date: '2025-02-14',
        time: '08:00',
        address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        mapUrl: 'https://maps.google.com/?q=123+Nguyen+Hue',
        description: 'Lễ vu quy tại nhà gái',
      },
      {
        id: 'event-2',
        type: 'reception',
        name: 'Tiệc Cưới',
        date: '2025-02-14',
        time: '18:00',
        address: 'Trung tâm tiệc cưới White Palace, Quận 7, TP.HCM',
        mapUrl: 'https://maps.google.com/?q=White+Palace',
        description: 'Tiệc cưới chính thức',
      },
    ],
    albums: [
      {
        id: 'album-1',
        name: 'Pre-wedding',
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
        order: 1,
        items: [
          {
            id: 'media-1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
            order: 1,
          },
          {
            id: 'media-2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
            order: 2,
          },
          {
            id: 'media-3',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200',
            order: 3,
          },
        ],
      },
    ],
    guests: [],
    tables: [
      { id: 'table-1', weddingId: 'wedding-1', name: 'Bàn VIP 1', capacity: 10, guests: [] },
      { id: 'table-2', weddingId: 'wedding-1', name: 'Bàn VIP 2', capacity: 10, guests: [] },
      { id: 'table-3', weddingId: 'wedding-1', name: 'Bàn 1', capacity: 8, guests: [] },
    ],
    bankAccounts: [
      {
        id: 'bank-1',
        bankName: 'Vietcombank',
        accountNumber: '1234567890',
        accountHolder: 'NGUYEN VAN MINH',
        branch: 'Chi nhánh Quận 1',
      },
      {
        id: 'bank-2',
        bankName: 'Techcombank',
        accountNumber: '0987654321',
        accountHolder: 'TRAN THI MAI ANH',
        branch: 'Chi nhánh Tân Bình',
      },
    ],
    theme: {
      primaryColor: '#D4A574',
      secondaryColor: '#F6C1CC',
      fontFamily: 'Playfair Display',
      template: 'elegant',
    },
    settings: {
      showGallery: true,
      showLoveStory: true,
      showRsvp: true,
      showWishes: true,
      showBankInfo: true,
      showMusic: true,
      showSeating: true,
      musicUrl: '/music/wedding-song.mp3',
    },
    viewCount: 1250,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-20T15:30:00Z',
  },
];

// Mock Guests
export const mockGuests: Guest[] = [
  {
    id: 'guest-1',
    weddingId: 'wedding-1',
    name: 'Lê Văn Cường',
    phone: '0901234567',
    email: 'cuong@email.com',
    numberOfGuests: 2,
    attendance: 'confirmed',
    tableId: 'table-1',
    message: 'Chúc hai bạn trăm năm hạnh phúc!',
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'guest-2',
    weddingId: 'wedding-1',
    name: 'Phạm Thị Dung',
    phone: '0912345678',
    numberOfGuests: 1,
    attendance: 'confirmed',
    message: 'Happy Wedding!',
    createdAt: '2024-12-02T11:00:00Z',
  },
  {
    id: 'guest-3',
    weddingId: 'wedding-1',
    name: 'Hoàng Minh Tuấn',
    phone: '0923456789',
    numberOfGuests: 3,
    attendance: 'pending',
    createdAt: '2024-12-05T09:00:00Z',
  },
  {
    id: 'guest-4',
    weddingId: 'wedding-1',
    name: 'Vũ Thị Hoa',
    phone: '0934567890',
    numberOfGuests: 2,
    attendance: 'declined',
    message: 'Rất tiếc không thể tham dự được',
    createdAt: '2024-12-06T14:00:00Z',
  },
];

// Add guests to wedding
mockWeddings[0].guests = mockGuests;

// Helper functions for mock API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const findUserByEmail = (email: string) => 
  mockUsers.find(u => u.email === email);

export const findWeddingById = (id: string) =>
  mockWeddings.find(w => w.id === id);

export const findWeddingsByUserId = (userId: string) =>
  mockWeddings.filter(w => w.userId === userId);

export const generateMockToken = (user: User) =>
  btoa(JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 86400000 }));

export { generateId };
