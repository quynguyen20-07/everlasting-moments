// Wish API Service - GraphQL wish operations
import { graphqlRequest, graphqlPublicRequest } from '@/lib/graphql/client';
import {
  ADD_WISH_MUTATION,
  APPROVE_WISH_MUTATION,
  DELETE_WISH_MUTATION,
} from '@/lib/graphql/mutations';
import type {
  Wish,
  WishInput,
  AddWishResponse,
  ApproveWishResponse,
  DeleteWishResponse,
} from '@/types/graphql';

/**
 * Add wish (public - no auth required)
 */
export async function addWishApi(weddingId: string, wish: WishInput): Promise<Wish> {
  const data = await graphqlPublicRequest<AddWishResponse>(ADD_WISH_MUTATION, {
    weddingId,
    wish,
  });
  return data.addWish;
}

/**
 * Approve wish
 */
export async function approveWishApi(id: string): Promise<Wish> {
  const data = await graphqlRequest<ApproveWishResponse>(APPROVE_WISH_MUTATION, { id });
  return data.approveWish;
}

/**
 * Delete wish
 */
export async function deleteWishApi(id: string): Promise<Wish> {
  const data = await graphqlRequest<DeleteWishResponse>(DELETE_WISH_MUTATION, { id });
  return data.deleteWish;
}
