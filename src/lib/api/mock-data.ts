import type { User, Wedding, Guest, Table } from '@/types';

// =====================
// MOCK USERS
// =====================

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@wedding.com',
    name: 'Nguyễn Văn An',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    isActive: true,
  },
  {
    id: '2',
    email: 'admin@wedding.com',
    name: 'Admin Wedding',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    isActive: true,
  },
  {
    id: '3',
    email: 'couple@wedding.com',
    name: 'Trần Thị Mai',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    isActive: true,
  },
];

// =====================
// MOCK WEDDINGS
// =====================

export const mockWeddings: Wedding[] = [
  {
    id: '1',
    userId: '1',
    slug: 'an-va-mai',
    title: 'Đám Cưới An & Mai',
    status: 'published',
    weddingDate: '2024-12-20T10:00:00Z',
    venue: 'Trung Tâm Hội Nghị White Palace',
    bride: {
      id: 'b1',
      name: 'Mai',
      fullName: 'Trần Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      bio: 'Một cô gái yêu cuộc sống và tin vào tình yêu đích thực.',
      fatherName: 'Trần Văn Hùng',
      motherName: 'Nguyễn Thị Lan',
    },
    groom: {
      id: 'g1',
      name: 'An',
      fullName: 'Nguyễn Văn An',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Chàng trai mơ mộng tìm thấy bến đỗ bình yên.',
      fatherName: 'Nguyễn Văn Minh',
      motherName: 'Lê Thị Hoa',
    },
    loveStory: {
      id: 'ls1',
      content: '<p>Chúng tôi gặp nhau trong một ngày mưa tháng 6...</p>',
      milestones: [
        {
          id: 'm1',
          date: '2020-06-15',
          title: 'Lần đầu gặp gỡ',
          description: 'Chúng tôi tình cờ gặp nhau tại quán cà phê nhỏ góc phố.',
          image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400',
        },
        {
          id: 'm2',
          date: '2021-02-14',
          title: 'Ngày Valentine đầu tiên',
          description: 'Anh ấy cầu hôn tôi bên bờ biển lúc hoàng hôn.',
          image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400',
        },
        {
          id: 'm3',
          date: '2024-06-20',
          title: 'Đính hôn',
          description: 'Chúng tôi chính thức đính hôn với sự chứng kiến của hai bên gia đình.',
          image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400',
        },
      ],
    },
    events: [
      {
        id: 'e1',
        type: 'ceremony',
        title: 'Lễ Vu Quy',
        date: '2024-12-20',
        time: '08:00',
        endTime: '10:00',
        venue: 'Nhà Cô Dâu',
        address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        description: 'Lễ rước dâu truyền thống',
      },
      {
        id: 'e2',
        type: 'reception',
        title: 'Tiệc Cưới',
        date: '2024-12-20',
        time: '18:00',
        endTime: '22:00',
        venue: 'White Palace',
        address: '194 Hoàng Văn Thụ, Quận Phú Nhuận, TP.HCM',
        mapUrl: 'https://maps.google.com',
        description: 'Tiệc cưới chính thức',
      },
    ],
    gallery: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        caption: 'Pre-wedding shoot',
        order: 1,
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
        caption: 'Romantic moment',
        order: 2,
      },
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
        caption: 'Beach sunset',
        order: 3,
      },
      {
        id: 'img4',
        url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
        caption: 'Together forever',
        order: 4,
      },
    ],
    videos: [
      {
        id: 'v1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        type: 'youtube',
        title: 'Our Love Story Video',
      },
    ],
    bankAccounts: [
      {
        id: 'bank1',
        accountName: 'NGUYEN VAN AN',
        accountNumber: '1234567890',
        bankName: 'Vietcombank',
        branch: 'Chi nhánh Hồ Chí Minh',
      },
      {
        id: 'bank2',
        accountName: 'TRAN THI MAI',
        accountNumber: '0987654321',
        bankName: 'Techcombank',
        branch: 'Chi nhánh Tân Bình',
      },
    ],
    theme: {
      id: 'theme1',
      name: 'Rose Garden',
      primaryColor: '#f4e4e4',
      secondaryColor: '#f7f3e9',
      accentColor: '#c9a962',
      fontFamily: 'Playfair Display',
    },
    settings: {
      showCountdown: true,
      showRsvp: true,
      showGuestWishes: true,
      showGallery: true,
      showLoveStory: true,
      showBankQr: true,
      autoplayMusic: false,
      language: 'vi',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-20T15:30:00Z',
  },
  {
    id: '2',
    userId: '3',
    slug: 'minh-va-linh',
    title: 'Đám Cưới Minh & Linh',
    status: 'draft',
    weddingDate: '2025-02-14T10:00:00Z',
    venue: 'The Reverie Saigon',
    bride: {
      id: 'b2',
      name: 'Linh',
      fullName: 'Phạm Thị Linh',
      bio: 'Yêu nghệ thuật và âm nhạc.',
    },
    groom: {
      id: 'g2',
      name: 'Minh',
      fullName: 'Lê Văn Minh',
      bio: 'Đam mê công nghệ và du lịch.',
    },
    events: [],
    gallery: [],
    videos: [],
    bankAccounts: [],
    theme: {
      id: 'theme2',
      name: 'Classic White',
      primaryColor: '#ffffff',
      secondaryColor: '#f5f5f5',
      accentColor: '#d4af37',
      fontFamily: 'Playfair Display',
    },
    settings: {
      showCountdown: true,
      showRsvp: true,
      showGuestWishes: true,
      showGallery: true,
      showLoveStory: true,
      showBankQr: true,
      autoplayMusic: false,
      language: 'vi',
    },
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-15T10:00:00Z',
  },
];

// =====================
// MOCK GUESTS
// =====================

export const mockGuests: Guest[] = [
  {
    id: 'guest1',
    weddingId: '1',
    name: 'Nguyễn Thị Hương',
    email: 'huong@email.com',
    phone: '0901234567',
    numberOfGuests: 2,
    rsvpStatus: 'confirmed',
    wishes: 'Chúc hai bạn trăm năm hạnh phúc!',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 'guest2',
    weddingId: '1',
    name: 'Trần Văn Đức',
    email: 'duc@email.com',
    phone: '0909876543',
    numberOfGuests: 1,
    rsvpStatus: 'confirmed',
    wishes: 'Mong hai bạn luôn yêu thương nhau!',
    createdAt: '2024-06-02T10:00:00Z',
    updatedAt: '2024-06-02T10:00:00Z',
  },
  {
    id: 'guest3',
    weddingId: '1',
    name: 'Lê Thị Ngọc',
    email: 'ngoc@email.com',
    numberOfGuests: 3,
    rsvpStatus: 'pending',
    createdAt: '2024-06-03T10:00:00Z',
    updatedAt: '2024-06-03T10:00:00Z',
  },
  {
    id: 'guest4',
    weddingId: '1',
    name: 'Phạm Minh Tuấn',
    phone: '0912345678',
    numberOfGuests: 2,
    rsvpStatus: 'declined',
    dietaryNotes: 'Ăn chay',
    createdAt: '2024-06-04T10:00:00Z',
    updatedAt: '2024-06-04T10:00:00Z',
  },
];

// =====================
// MOCK TABLES
// =====================

export const mockTables: Table[] = [
  {
    id: 'table1',
    weddingId: '1',
    name: 'Bàn 1 - Gia đình nhà trai',
    capacity: 10,
    shape: 'round',
    position: { x: 100, y: 100 },
    guests: ['guest1', 'guest2'],
  },
  {
    id: 'table2',
    weddingId: '1',
    name: 'Bàn 2 - Gia đình nhà gái',
    capacity: 10,
    shape: 'round',
    position: { x: 300, y: 100 },
    guests: [],
  },
  {
    id: 'table3',
    weddingId: '1',
    name: 'Bàn 3 - Bạn bè cô dâu',
    capacity: 8,
    shape: 'round',
    position: { x: 200, y: 300 },
    guests: ['guest3'],
  },
];

// =====================
// HELPER FUNCTIONS
// =====================

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateId = () => Math.random().toString(36).substring(2, 11);

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};
