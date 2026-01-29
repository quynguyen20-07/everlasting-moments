// Auth Hook - TamStack Query based authentication
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { AuthApi } from '@/lib/api/auth.api';
import type { LoginDto, RegisterDto, User } from '@/types/api.generated';

// Keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Token storage helpers
const TOKEN_KEY = 'wedding-auth-token';
const REFRESH_TOKEN_KEY = 'wedding-auth-refresh-token';
const USER_KEY = 'wedding-auth-user';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredUser(): User | null {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setStoredAuth(token: string, refreshToken: string, user: any) { // User type from rest might be generic object initially
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  // Fetch full profile if 'user' from login response is incomplete, or strictly use what's returned
  // The LoginResponse only returns accessToken/refreshToken in the new spec?
  // Wait, LoginDto response in swagger: { accessToken, refreshToken }. It DOES NOT return User object.
  // We need to fetch 'me' after login.
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

function clearStoredAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // Check auth on mount
  const { data: user, isLoading: isCheckingAuth, refetch } = useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const token = getStoredToken();
      if (!token) {
        return null;
      }
      try {
        const user = await AuthApi.getProfile();
        if (user) {
          return user;
        }
        // Token invalid, clear storage
        clearStoredAuth();
        return null;
      } catch {
        // If 401, clear stored auth
        clearStoredAuth();
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Set initialized after first query completes
  useEffect(() => {
    if (!isCheckingAuth) {
      setIsInitialized(true);
    }
  }, [isCheckingAuth]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (input: LoginDto) => {
      const data = await AuthApi.login(input);
      // Login response only has tokens, so we need to fetch user profile
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      const userProfile = await AuthApi.getProfile();
      return { ...data, user: userProfile };
    },
    onSuccess: (data) => {
      // setStoredAuth is now redundant for tokens as we did it in mutationFn to allow getProfile to work
      // but we should update user in storage
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: (data) => {
      // Register returns void (201). So we probably need to login afterwards or prompt user to login.
      // The Swagger says responses: 201 Created. Content is empty/description success.
      // So we cannot auto-login unless we ask user to login.
      // The previous code expected AuthPayload.
    },
  });

  // Logout function
  const logout = useCallback(async () => {
    try {
      await AuthApi.logout();
    } catch (e) {
      console.error(e);
    }
    clearStoredAuth();
    queryClient.setQueryData(authKeys.user(), null);
    queryClient.clear();
  }, [queryClient]);

  const login = useCallback(
    (input: LoginDto) => loginMutation.mutateAsync(input),
    [loginMutation]
  );

  const register = useCallback(
    (input: RegisterDto) => registerMutation.mutateAsync(input),
    [registerMutation]
  );

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading: !isInitialized || isCheckingAuth,
    login,
    register,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    checkAuth: refetch,
  };
}

// Export a simpler hook for just checking auth status
export function useUser() {
  const { user, isAuthenticated, isLoading } = useAuth();
  return { user, isAuthenticated, isLoading };
}
