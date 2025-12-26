import type { Guest, RsvpSubmission } from '@/types';
import { mockGuests, delay, generateId } from './mock-data';

// In-memory storage
let guests = [...mockGuests];

export const guestApi = {
  async getByWeddingId(weddingId: string): Promise<Guest[]> {
    await delay(500);
    return guests.filter((g) => g.weddingId === weddingId);
  },

  async getById(id: string): Promise<Guest> {
    await delay(300);
    const guest = guests.find((g) => g.id === id);
    if (!guest) {
      throw new Error('Không tìm thấy khách mời');
    }
    return guest;
  },

  async submitRsvp(weddingId: string, data: RsvpSubmission): Promise<Guest> {
    await delay(800);
    
    const newGuest: Guest = {
      id: generateId(),
      weddingId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      numberOfGuests: data.numberOfGuests,
      rsvpStatus: data.attending ? 'confirmed' : 'declined',
      dietaryNotes: data.dietaryNotes,
      wishes: data.wishes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    guests.push(newGuest);
    return newGuest;
  },

  async update(id: string, data: Partial<Guest>): Promise<Guest> {
    await delay(500);
    
    const index = guests.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy khách mời');
    }
    
    guests[index] = {
      ...guests[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return guests[index];
  },

  async delete(id: string): Promise<void> {
    await delay(400);
    guests = guests.filter((g) => g.id !== id);
  },

  async exportCsv(weddingId: string): Promise<string> {
    await delay(600);
    
    const weddingGuests = guests.filter((g) => g.weddingId === weddingId);
    
    const headers = ['Tên', 'Email', 'Số điện thoại', 'Số khách', 'Trạng thái', 'Ghi chú', 'Lời chúc'];
    const rows = weddingGuests.map((g) => [
      g.name,
      g.email || '',
      g.phone || '',
      g.numberOfGuests.toString(),
      g.rsvpStatus === 'confirmed' ? 'Xác nhận' : g.rsvpStatus === 'declined' ? 'Từ chối' : 'Chờ xác nhận',
      g.dietaryNotes || '',
      g.wishes || '',
    ]);
    
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    return csv;
  },

  async getStats(weddingId: string): Promise<{
    total: number;
    confirmed: number;
    declined: number;
    pending: number;
    totalGuests: number;
  }> {
    await delay(300);
    
    const weddingGuests = guests.filter((g) => g.weddingId === weddingId);
    
    return {
      total: weddingGuests.length,
      confirmed: weddingGuests.filter((g) => g.rsvpStatus === 'confirmed').length,
      declined: weddingGuests.filter((g) => g.rsvpStatus === 'declined').length,
      pending: weddingGuests.filter((g) => g.rsvpStatus === 'pending').length,
      totalGuests: weddingGuests
        .filter((g) => g.rsvpStatus === 'confirmed')
        .reduce((sum, g) => sum + g.numberOfGuests, 0),
    };
  },
};
