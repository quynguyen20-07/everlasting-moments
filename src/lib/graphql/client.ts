import type { GraphQLResponse, GraphQLError } from "@/types/graphql";
import { getStoredToken } from "@/hooks/useAuth";

// GraphQL Client - Handles all GraphQL requests with auth

// GraphQL endpoint - will be configured via environment variable
const GRAPHQL_ENDPOINT = import.meta.env.VITE_API_DOMAIN + "/graphql";

export class GraphQLClientError extends Error {
  errors: GraphQLError[];

  constructor(errors: GraphQLError[]) {
    super(errors[0]?.message || "GraphQL Error");
    this.errors = errors;
    this.name = "GraphQLClientError";
  }
}

interface RequestOptions {
  requireAuth?: boolean;
}

// Logout callback - will be set by the app
let logoutCallback: (() => void) | null = null;

export function setLogoutCallback(callback: () => void) {
  logoutCallback = callback;
}

/**
 * Execute a GraphQL query or mutation
 */
export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: RequestOptions = { requireAuth: true }
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add authorization header if required
  if (options.requireAuth) {
    const token = getStoredToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // Handle 401 - Unauthorized
    if (response.status === 401) {
      if (logoutCallback) {
        logoutCallback();
      }
      throw new GraphQLClientError([
        { message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại." },
      ]);
    }

    const result: GraphQLResponse<T> = await response.json();

    // Handle GraphQL errors
    if (result.errors && result.errors.length > 0) {
      throw new GraphQLClientError(result.errors);
    }

    if (!result.data) {
      throw new GraphQLClientError([
        { message: "Không có dữ liệu trả về từ server" },
      ]);
    }

    return result.data;
  } catch (error) {
    if (error instanceof GraphQLClientError) {
      throw error;
    }

    // Network or other errors
    throw new GraphQLClientError([
      {
        message:
          error instanceof Error
            ? error.message
            : "Lỗi kết nối. Vui lòng thử lại.",
      },
    ]);
  }
}

/**
 * Execute a public GraphQL query (no auth required)
 */
export async function graphqlPublicRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  return graphqlRequest<T>(query, variables, { requireAuth: false });
}
