// Auth Hook - React Query based authentication
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { loginApi, registerApi, getMeApi, type LoginInput, type RegisterInput } from '@/lib/api/auth';
import type { User } from '@/types/graphql';

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

function setStoredAuth(token: string, refreshToken: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
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
        const user = await getMeApi();
        if (user) {
          return user;
        }
        // Token invalid, clear storage
        clearStoredAuth();
        return null;
      } catch {
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
    mutationFn: loginApi,
    onSuccess: (data) => {
      setStoredAuth(data.accessToken, data.refreshToken, data.user);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setStoredAuth(data.accessToken, data.refreshToken, data.user);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });

  // Logout function
  const logout = useCallback(() => {
    clearStoredAuth();
    queryClient.setQueryData(authKeys.user(), null);
    queryClient.clear();
  }, [queryClient]);

  const login = useCallback(
    (input: LoginInput) => loginMutation.mutateAsync(input),
    [loginMutation]
  );

  const register = useCallback(
    (input: RegisterInput) => registerMutation.mutateAsync(input),
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
