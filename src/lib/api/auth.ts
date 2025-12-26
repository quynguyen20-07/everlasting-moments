// Auth API - Mock authentication service
import { delay, findUserByEmail, generateMockToken, mockUsers, generateId } from './mock-data';
import type { User } from '@/types/wedding';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock login - accepts any password for demo
export const loginApi = async (input: LoginInput): Promise<AuthResponse> => {
  await delay(800); // Simulate network delay
  
  const user = findUserByEmail(input.email);
  
  if (!user) {
    throw new Error('Email hoặc mật khẩu không đúng');
  }
  
  if (user.isLocked) {
    throw new Error('Tài khoản đã bị khóa');
  }
  
  const token = generateMockToken(user);
  
  return { user, token };
};

// Mock register
export const registerApi = async (input: RegisterInput): Promise<AuthResponse> => {
  await delay(800);
  
  const existingUser = findUserByEmail(input.email);
  
  if (existingUser) {
    throw new Error('Email đã được sử dụng');
  }
  
  const newUser: User = {
    id: generateId(),
    email: input.email,
    name: input.name,
    role: 'user',
    isLocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockUsers.push(newUser);
  const token = generateMockToken(newUser);
  
  return { user: newUser, token };
};

// Verify token and get user
export const verifyTokenApi = async (token: string): Promise<User | null> => {
  await delay(200);
  
  try {
    const decoded = JSON.parse(atob(token));
    
    if (decoded.exp < Date.now()) {
      return null;
    }
    
    const user = mockUsers.find(u => u.id === decoded.userId);
    return user || null;
  } catch {
    return null;
  }
};

// Forgot password (mock)
export const forgotPasswordApi = async (email: string): Promise<void> => {
  await delay(800);
  
  const user = findUserByEmail(email);
  
  if (!user) {
    throw new Error('Email không tồn tại trong hệ thống');
  }
  
  // In real app, would send email
  console.log('Password reset email sent to:', email);
};
