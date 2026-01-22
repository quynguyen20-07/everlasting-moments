import type {
  Wedding,
  WeddingDetail,
  LoveStoryInput,
  WeddingEventInput,
  BrideGroomInput,
  IWeddingEvent,
} from "@/types";
import { CreateWeddingInput, CreateWeddingResponse } from "@/types";

import {
  CREATE_WEDDING_MUTATION,
  UPDATE_WEDDING_MUTATION,
  DELETE_WEDDING_MUTATION,
  PUBLISH_WEDDING_MUTATION,
  UNPUBLISH_WEDDING_MUTATION,
  UPDATE_BRIDE_MUTATION,
  UPDATE_GROOM_MUTATION,
  ADD_LOVE_STORY_MUTATION,
  UPDATE_LOVE_STORY_MUTATION,
  DELETE_LOVE_STORY_MUTATION,
  ADD_WEDDING_EVENT_MUTATION,
  UPDATE_WEDDING_EVENT_MUTATION,
  DELETE_WEDDING_EVENT_MUTATION,
} from "../graphql/mutations";
import {
  WEDDINGS_QUERY,
  WEDDING_QUERY,
  WEDDING_BY_SLUG_QUERY,
  PUBLIC_WEDDING_QUERY,
  WEDDING_DETAIL_QUERY,
} from "../graphql/queries";
// Wedding API - GraphQL service for wedding management
import { graphqlRequest, graphqlPublicRequest } from "../graphql/client";

// Local types
export type WeddingStatus = "draft" | "published" | "archived";

export interface ListWedding {
  id: string;
  userId: string;
  slug: string;
  title: string;
  status: string;
  language: string;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  themeSettings?: {
    primaryColor: string;
    secondaryColor: string;
    fontHeading: string;
    fontBody: string;
    backgroundMusic?: string;
  };
  weddingDetail?: {
    id: string;
    weddingId: string;
    bride: { fullName: string; avatar?: string };
    groom: { fullName: string; avatar?: string };
  };
}

// ==================== List Weddings ====================
export const getWeddingsApi = async (): Promise<ListWedding[]> => {
  const data = await graphqlRequest<{ weddings: ListWedding[] }>(
    WEDDINGS_QUERY,
  );
  return data.weddings;
};

// ==================== Get Wedding by ID ====================
export const getWeddingApi = async (id: string): Promise<Wedding | null> => {
  const data = await graphqlRequest<{ wedding: Wedding | null }>(
    WEDDING_QUERY,
    { id },
  );
  return data.wedding;
};

// ==================== Get Wedding by Slug ====================
export const getWeddingBySlugApi = async (
  slug: string,
): Promise<Wedding | null> => {
  const data = await graphqlRequest<{ weddingBySlug: Wedding | null }>(
    WEDDING_BY_SLUG_QUERY,
    { slug },
  );
  return data.weddingBySlug;
};

// ==================== Get Public Wedding ====================
export const getPublicWeddingApi = async (
  slug: string,
): Promise<Wedding | null> => {
  const data = await graphqlPublicRequest<{ publicWedding: Wedding | null }>(
    PUBLIC_WEDDING_QUERY,
    { slug },
  );
  return data.publicWedding;
};

// ==================== Get Wedding Detail ====================
export const getWeddingDetailApi = async (
  weddingId: string,
): Promise<WeddingDetail | null> => {
  const data = await graphqlRequest<{ weddingDetail: WeddingDetail | null }>(
    WEDDING_DETAIL_QUERY,
    { weddingId },
  );
  return data.weddingDetail;
};

// ==================== Create Wedding ====================

export const createWeddingApi = async (
  input: CreateWeddingInput,
): Promise<Wedding> => {
  const data = await graphqlRequest<CreateWeddingResponse>(
    CREATE_WEDDING_MUTATION,
    { ...input },
  );
  return data.createWedding;
};

// ==================== Update Wedding ====================
interface UpdateWeddingInput {
  title?: string;
  slug?: string;
  status?: string;
}

interface UpdateWeddingResponse {
  updateWedding: Wedding;
}

export const updateWeddingApi = async (
  id: string,
  updates: UpdateWeddingInput,
): Promise<Wedding> => {
  const data = await graphqlRequest<UpdateWeddingResponse>(
    UPDATE_WEDDING_MUTATION,
    { id, ...updates },
  );
  return data.updateWedding;
};

// ==================== Update Wedding Status ====================
export const updateWeddingStatusApi = async (
  id: string,
  status: WeddingStatus,
): Promise<Wedding> => {
  return updateWeddingApi(id, { status });
};

// ==================== Publish/Unpublish Wedding ====================
export const publishWeddingApi = async (id: string): Promise<Wedding> => {
  const data = await graphqlRequest<{ publishWedding: Wedding }>(
    PUBLISH_WEDDING_MUTATION,
    { id },
  );
  return data.publishWedding;
};

export const unpublishWeddingApi = async (id: string): Promise<Wedding> => {
  const data = await graphqlRequest<{ unpublishWedding: Wedding }>(
    UNPUBLISH_WEDDING_MUTATION,
    { id },
  );
  return data.unpublishWedding;
};

// ==================== Delete Wedding ====================
export const deleteWeddingApi = async (id: string): Promise<void> => {
  await graphqlRequest<{ deleteWedding: { id: string } }>(
    DELETE_WEDDING_MUTATION,
    { id },
  );
};

// ==================== Bride & Groom ====================
export const updateBrideApi = async (
  weddingId: string,
  bride: BrideGroomInput,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ updateBride: WeddingDetail }>(
    UPDATE_BRIDE_MUTATION,
    { weddingId, bride },
  );
  return data.updateBride;
};

export const updateGroomApi = async (
  weddingId: string,
  groom: BrideGroomInput,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ updateGroom: WeddingDetail }>(
    UPDATE_GROOM_MUTATION,
    { weddingId, groom },
  );
  return data.updateGroom;
};

// ==================== Love Story ====================
export const addLoveStoryApi = async (
  weddingId: string,
  story: LoveStoryInput,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ addLoveStory: WeddingDetail }>(
    ADD_LOVE_STORY_MUTATION,
    { weddingId, story },
  );
  return data.addLoveStory;
};

export const updateLoveStoryApi = async (
  weddingId: string,
  storyId: string,
  story: LoveStoryInput,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ updateLoveStory: WeddingDetail }>(
    UPDATE_LOVE_STORY_MUTATION,
    { weddingId, storyId, story },
  );
  return data.updateLoveStory;
};

export const deleteLoveStoryApi = async (
  weddingId: string,
  storyId: string,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ deleteLoveStory: WeddingDetail }>(
    DELETE_LOVE_STORY_MUTATION,
    { weddingId, storyId },
  );
  return data.deleteLoveStory;
};

// ==================== Wedding Events ====================
export const addWeddingEventApi = async (
  weddingId: string,
  event: WeddingEventInput,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ addWeddingEvent: WeddingDetail }>(
    ADD_WEDDING_EVENT_MUTATION,
    { weddingId, event },
  );

  return data.addWeddingEvent;
};

export const updateWeddingEventApi = async (
  weddingId: string,
  eventId: string,
  event: WeddingEventInput,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ updateWeddingEvent: WeddingDetail }>(
    UPDATE_WEDDING_EVENT_MUTATION,
    { weddingId, eventId, event },
  );

  return data.updateWeddingEvent;
};

export const deleteWeddingEventApi = async (
  weddingId: string,
  eventId: string,
): Promise<WeddingDetail> => {
  const data = await graphqlRequest<{ deleteWeddingEvent: WeddingDetail }>(
    DELETE_WEDDING_EVENT_MUTATION,
    { weddingId, eventId },
  );

  return data.deleteWeddingEvent;
};
