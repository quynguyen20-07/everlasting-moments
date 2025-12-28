// Auth API Service - GraphQL authentication
import { graphqlRequest, graphqlPublicRequest } from '@/lib/graphql/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, LOGOUT_MUTATION, REFRESH_TOKEN_MUTATION } from '@/lib/graphql/mutations';
import { ME_QUERY } from '@/lib/graphql/queries';
import type { 
  User,
  AuthPayload,
  LoginResponse, 
  RegisterResponse, 
  LogoutResponse,
  RefreshTokenResponse,
  MeResponse 
} from '@/types/graphql';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

/**
 * Login user with email and password
 */
export async function loginApi(input: LoginInput): Promise<AuthPayload> {
  const data = await graphqlPublicRequest<LoginResponse>(LOGIN_MUTATION, {
    email: input.email,
    password: input.password,
  });
  return data.login;
}

/**
 * Register new user
 */
export async function registerApi(input: RegisterInput): Promise<AuthPayload> {
  const data = await graphqlPublicRequest<RegisterResponse>(REGISTER_MUTATION, {
    email: input.email,
    password: input.password,
    fullName: input.fullName,
    phone: input.phone,
  });
  return data.register;
}

/**
 * Logout current user
 */
export async function logoutApi(): Promise<boolean> {
  const data = await graphqlRequest<LogoutResponse>(LOGOUT_MUTATION);
  return data.logout;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshTokenApi(refreshToken: string): Promise<AuthPayload> {
  const data = await graphqlPublicRequest<RefreshTokenResponse>(REFRESH_TOKEN_MUTATION, {
    refreshToken,
  });
  return data.refreshToken;
}

/**
 * Get current authenticated user
 */
export async function getMeApi(): Promise<User | null> {
  try {
    const data = await graphqlRequest<MeResponse>(ME_QUERY);
    return data.me;
  } catch {
    return null;
  }
}
