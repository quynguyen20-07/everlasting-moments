import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import { mockUsers, delay, generateId } from './mock-data';

// Simulated JWT token
const generateToken = () => `mock_jwt_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;

// In-memory storage for mock API
let users = [...mockUsers];

export const authApi = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    await delay(800); // Simulate network delay
    
    const user = users.find(
      (u) => u.email === credentials.email && u.isActive
    );
    
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }
    
    // In real app, verify password here
    // For mock, accept any password
    if (credentials.password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }
    
    return {
      user,
      token: generateToken(),
    };
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    await delay(1000);
    
    // Validate
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }
    
    if (users.some((u) => u.email === credentials.email)) {
      throw new Error('Email đã được sử dụng');
    }
    
    const newUser: User = {
      id: generateId(),
      email: credentials.email,
      name: credentials.name,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    };
    
    users.push(newUser);
    
    return {
      user: newUser,
      token: generateToken(),
    };
  },

  async logout(): Promise<void> {
    await delay(300);
    // In real app, invalidate token on server
  },

  async getMe(): Promise<User> {
    await delay(500);
    // In real app, decode token and fetch user
    // For mock, return first user
    const user = users[0];
    if (!user) {
      throw new Error('Không tìm thấy người dùng');
    }
    return user;
  },

  async forgotPassword(email: string): Promise<void> {
    await delay(800);
    
    const user = users.find((u) => u.email === email);
    if (!user) {
      // Don't reveal if email exists
      return;
    }
    
    // In real app, send email
    console.log(`Password reset email sent to ${email}`);
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await delay(800);
    
    if (newPassword.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }
    
    // In real app, verify token and update password
    console.log('Password reset successful');
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await delay(600);
    
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('Không tìm thấy người dùng');
    }
    
    users[index] = {
      ...users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return users[index];
  },
};
