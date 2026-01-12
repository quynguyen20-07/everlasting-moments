// User API - Admin user management service
import { delay, mockUsers } from './mock-data';
import type { User } from '@/types/wedding';

// Get all users (admin only)
export const getAllUsersApi = async (): Promise<User[]> => {
  await delay(500);
  return [...mockUsers];
};

// Get user by ID
export const getUserApi = async (id: string): Promise<User | null> => {
  await delay(300);
  return mockUsers.find(u => u.id === id) || null;
};

// Lock user (set isActive to false)
export const lockUserApi = async (id: string): Promise<User> => {
  await delay(300);
  
  const user = mockUsers.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  
  user.isActive = false;
  user.updatedAt = new Date().toISOString();
  return user;
};

// Unlock user (set isActive to true)
export const unlockUserApi = async (id: string): Promise<User> => {
  await delay(300);
  
  const user = mockUsers.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  
  user.isActive = true;
  user.updatedAt = new Date().toISOString();
  return user;
};

// Update user
export const updateUserApi = async (id: string, updates: Partial<User>): Promise<User> => {
  await delay(300);
  
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('User not found');
  }
  
  mockUsers[index] = {
    ...mockUsers[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return mockUsers[index];
};
