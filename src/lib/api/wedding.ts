// Wedding API - Mock wedding service
import { delay, mockWeddings, generateId } from './mock-data';
import type { Wedding, CreateWeddingInput, WeddingStatus, Guest, Table, BankAccount } from '@/types/wedding';

// Get all weddings for a user
export const getWeddingsApi = async (userId: string): Promise<Wedding[]> => {
  await delay(500);
  return mockWeddings.filter(w => w.userId === userId && w.status !== 'archived');
};

// Get all weddings (admin)
export const getAllWeddingsApi = async (): Promise<Wedding[]> => {
  await delay(500);
  return [...mockWeddings];
};

// Get wedding by ID
export const getWeddingApi = async (id: string): Promise<Wedding | null> => {
  await delay(300);
  return mockWeddings.find(w => w.id === id) || null;
};

// Get wedding by slug (for public page)
export const getWeddingBySlugApi = async (slug: string): Promise<Wedding | null> => {
  await delay(300);
  const wedding = mockWeddings.find(w => w.slug === slug && w.status === 'published');
  if (wedding) {
    // Increment view count
    wedding.viewCount += 1;
  }
  return wedding || null;
};

// Create new wedding
export const createWeddingApi = async (userId: string, input: CreateWeddingInput): Promise<Wedding> => {
  await delay(500);
  
  const slug = input.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50) + '-' + generateId().substring(0, 6);
  
  const newWedding: Wedding = {
    id: generateId(),
    userId,
    slug,
    name: input.name,
    status: 'draft',
    bride: {
      id: generateId(),
      fullName: input.bride.fullName || '',
      avatar: input.bride.avatar,
      description: input.bride.description,
    },
    groom: {
      id: generateId(),
      fullName: input.groom.fullName || '',
      avatar: input.groom.avatar,
      description: input.groom.description,
    },
    loveStory: [],
    events: input.eventDate ? [
      {
        id: generateId(),
        type: 'ceremony',
        name: 'Lễ Cưới',
        date: input.eventDate,
        time: '10:00',
        address: '',
      },
    ] : [],
    albums: [],
    guests: [],
    tables: [],
    bankAccounts: [],
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
      showMusic: false,
      showSeating: false,
    },
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockWeddings.push(newWedding);
  return newWedding;
};

// Update wedding
export const updateWeddingApi = async (id: string, updates: Partial<Wedding>): Promise<Wedding> => {
  await delay(300);
  
  const index = mockWeddings.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error('Wedding not found');
  }
  
  mockWeddings[index] = {
    ...mockWeddings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return mockWeddings[index];
};

// Update wedding status
export const updateWeddingStatusApi = async (id: string, status: WeddingStatus): Promise<Wedding> => {
  return updateWeddingApi(id, { status });
};

// Delete wedding (soft delete - set status to archived)
export const deleteWeddingApi = async (id: string): Promise<void> => {
  await delay(300);
  
  const index = mockWeddings.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error('Wedding not found');
  }
  
  mockWeddings[index].status = 'archived';
};

// Guest management
export const addGuestApi = async (weddingId: string, guest: Omit<Guest, 'id' | 'weddingId' | 'createdAt'>): Promise<Guest> => {
  await delay(300);
  
  const wedding = mockWeddings.find(w => w.id === weddingId);
  if (!wedding) {
    throw new Error('Wedding not found');
  }
  
  const newGuest: Guest = {
    ...guest,
    id: generateId(),
    weddingId,
    createdAt: new Date().toISOString(),
  };
  
  wedding.guests.push(newGuest);
  return newGuest;
};

export const updateGuestApi = async (weddingId: string, guestId: string, updates: Partial<Guest>): Promise<Guest> => {
  await delay(200);
  
  const wedding = mockWeddings.find(w => w.id === weddingId);
  if (!wedding) {
    throw new Error('Wedding not found');
  }
  
  const guestIndex = wedding.guests.findIndex(g => g.id === guestId);
  if (guestIndex === -1) {
    throw new Error('Guest not found');
  }
  
  wedding.guests[guestIndex] = { ...wedding.guests[guestIndex], ...updates };
  return wedding.guests[guestIndex];
};

// Table management
export const addTableApi = async (weddingId: string, table: Omit<Table, 'id' | 'weddingId' | 'guests'>): Promise<Table> => {
  await delay(300);
  
  const wedding = mockWeddings.find(w => w.id === weddingId);
  if (!wedding) {
    throw new Error('Wedding not found');
  }
  
  const newTable: Table = {
    ...table,
    id: generateId(),
    weddingId,
    guests: [],
  };
  
  wedding.tables.push(newTable);
  return newTable;
};

// Bank account management
export const addBankAccountApi = async (weddingId: string, account: Omit<BankAccount, 'id'>): Promise<BankAccount> => {
  await delay(300);
  
  const wedding = mockWeddings.find(w => w.id === weddingId);
  if (!wedding) {
    throw new Error('Wedding not found');
  }
  
  const newAccount: BankAccount = {
    ...account,
    id: generateId(),
  };
  
  wedding.bankAccounts.push(newAccount);
  return newAccount;
};
