import type { Wedding, WeddingStatus } from '@/types';
import { mockWeddings, delay, generateId, generateSlug } from './mock-data';

// In-memory storage
let weddings = [...mockWeddings];

export const weddingApi = {
  async getAll(): Promise<Wedding[]> {
    await delay(600);
    return weddings;
  },

  async getByUserId(userId: string): Promise<Wedding[]> {
    await delay(500);
    return weddings.filter((w) => w.userId === userId);
  },

  async getById(id: string): Promise<Wedding> {
    await delay(400);
    const wedding = weddings.find((w) => w.id === id);
    if (!wedding) {
      throw new Error('Không tìm thấy thiệp cưới');
    }
    return wedding;
  },

  async getBySlug(slug: string): Promise<Wedding> {
    await delay(400);
    const wedding = weddings.find((w) => w.slug === slug);
    if (!wedding) {
      throw new Error('Không tìm thấy thiệp cưới');
    }
    return wedding;
  },

  async create(data: Partial<Wedding>): Promise<Wedding> {
    await delay(800);
    
    const title = data.title || 'Đám cưới của chúng tôi';
    const slug = generateSlug(title) + '-' + generateId().substring(0, 4);
    
    const newWedding: Wedding = {
      id: generateId(),
      userId: data.userId || '1',
      slug,
      title,
      status: 'draft',
      weddingDate: data.weddingDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      venue: data.venue || '',
      bride: data.bride || {
        id: generateId(),
        name: '',
        fullName: '',
      },
      groom: data.groom || {
        id: generateId(),
        name: '',
        fullName: '',
      },
      events: data.events || [],
      gallery: data.gallery || [],
      videos: data.videos || [],
      bankAccounts: data.bankAccounts || [],
      theme: data.theme || {
        id: generateId(),
        name: 'Rose Garden',
        primaryColor: '#f4e4e4',
        secondaryColor: '#f7f3e9',
        accentColor: '#c9a962',
        fontFamily: 'Playfair Display',
      },
      settings: data.settings || {
        showCountdown: true,
        showRsvp: true,
        showGuestWishes: true,
        showGallery: true,
        showLoveStory: true,
        showBankQr: true,
        autoplayMusic: false,
        language: 'vi',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    weddings.push(newWedding);
    return newWedding;
  },

  async update(id: string, data: Partial<Wedding>): Promise<Wedding> {
    await delay(600);
    
    const index = weddings.findIndex((w) => w.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy thiệp cưới');
    }
    
    weddings[index] = {
      ...weddings[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return weddings[index];
  },

  async updateStatus(id: string, status: WeddingStatus): Promise<Wedding> {
    await delay(400);
    
    const index = weddings.findIndex((w) => w.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy thiệp cưới');
    }
    
    weddings[index] = {
      ...weddings[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    
    return weddings[index];
  },

  async delete(id: string): Promise<void> {
    await delay(500);
    
    const index = weddings.findIndex((w) => w.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy thiệp cưới');
    }
    
    // Soft delete - change status to archived
    weddings[index] = {
      ...weddings[index],
      status: 'archived',
      updatedAt: new Date().toISOString(),
    };
  },

  async hardDelete(id: string): Promise<void> {
    await delay(500);
    weddings = weddings.filter((w) => w.id !== id);
  },
};
