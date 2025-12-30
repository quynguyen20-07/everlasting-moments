import type {
  BankAccount,
  CreateWeddingInput,
  Guest,
  ListWedding,
  ListWeddingResponse,
  Table,
  Wedding,
  WeddingResponse,
  WeddingStatus,
} from "@/types/wedding";

import { CREATE_WEDDING_MUTATION } from "../graphql/mutations";
import { delay, generateId, mockWeddings } from "./mock-data";
import { graphqlRequest } from "../graphql/client";
// Wedding API - Mock wedding service
import { WEDDINGS_QUERY } from "../graphql";

export const getWeddingsApi = async (
  userId: string
): Promise<ListWedding[]> => {
  const data = await graphqlRequest<ListWeddingResponse>(WEDDINGS_QUERY);
  console.log("Fetched weddings data:", data);
  return data.weddings;
};

// Get all weddings (admin)
export const getAllWeddingsApi = async (): Promise<Wedding[]> => {
  const data = await graphqlRequest<WeddingResponse>(WEDDINGS_QUERY);

  return data.weddings;
};

// Get wedding by ID
export const getWeddingApi = async (id: string): Promise<Wedding | null> => {
  await delay(300);
  return mockWeddings.find((w) => w.id === id) || null;
};

// Get wedding by slug (for public page)
export const getWeddingBySlugApi = async (
  slug: string
): Promise<Wedding | null> => {
  await delay(300);
  const wedding = mockWeddings.find(
    (w) => w.slug === slug && w.status === "published"
  );
  if (wedding) {
    // Increment view count
    wedding.viewCount += 1;
  }
  return wedding || null;
};

// Create new wedding
export const createWeddingApi = async (
  input: CreateWeddingInput
): Promise<Wedding> => {
  await delay(500);

  const slug = input.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  const newWedding: CreateWeddingInput = {
    slug,
    title: input.title,
    language: input.language,
    themeSettings: input.themeSettings
      ? input.themeSettings
      : {
          primaryColor: "#D4A574",
          secondaryColor: "#F6C1CC",
          fontBody: "Playfair Display",
          fontHeading: "Playfair Display",
          backgroundMusic: "elegant",
        },
    weddingDate: input.weddingDate,
    bride: input.bride,
    groom: input.groom,
  };

  const data = await graphqlRequest<Wedding>(CREATE_WEDDING_MUTATION, {
    ...newWedding,
  });

  return data;
};

// Update wedding
export const updateWeddingApi = async (
  id: string,
  updates: Partial<Wedding>
): Promise<Wedding> => {
  await delay(300);

  const index = mockWeddings.findIndex((w) => w.id === id);
  if (index === -1) {
    throw new Error("Wedding not found");
  }

  mockWeddings[index] = {
    ...mockWeddings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return mockWeddings[index];
};

// Update wedding status
export const updateWeddingStatusApi = async (
  id: string,
  status: WeddingStatus
): Promise<Wedding> => {
  return updateWeddingApi(id, { status });
};

// Delete wedding (soft delete - set status to archived)
export const deleteWeddingApi = async (id: string): Promise<void> => {
  await delay(300);

  const index = mockWeddings.findIndex((w) => w.id === id);
  if (index === -1) {
    throw new Error("Wedding not found");
  }

  mockWeddings[index].status = "archived";
};

// Guest management
export const addGuestApi = async (
  weddingId: string,
  guest: Omit<Guest, "id" | "weddingId" | "createdAt">
): Promise<Guest> => {
  await delay(300);

  const wedding = mockWeddings.find((w) => w.id === weddingId);
  if (!wedding) {
    throw new Error("Wedding not found");
  }

  const newGuest: Guest = {
    ...guest,
    id: generateId(),
    weddingId,
    createdAt: new Date().toISOString(),
  };

  wedding.guests.push(newGuest);
  return newGuest;
};

export const updateGuestApi = async (
  weddingId: string,
  guestId: string,
  updates: Partial<Guest>
): Promise<Guest> => {
  await delay(200);

  const wedding = mockWeddings.find((w) => w.id === weddingId);
  if (!wedding) {
    throw new Error("Wedding not found");
  }

  const guestIndex = wedding.guests.findIndex((g) => g.id === guestId);
  if (guestIndex === -1) {
    throw new Error("Guest not found");
  }

  wedding.guests[guestIndex] = { ...wedding.guests[guestIndex], ...updates };
  return wedding.guests[guestIndex];
};

// Table management
export const addTableApi = async (
  weddingId: string,
  table: Omit<Table, "id" | "weddingId" | "guests">
): Promise<Table> => {
  await delay(300);

  const wedding = mockWeddings.find((w) => w.id === weddingId);
  if (!wedding) {
    throw new Error("Wedding not found");
  }

  const newTable: Table = {
    ...table,
    id: generateId(),
    weddingId,
    guests: [],
  };

  wedding.tables.push(newTable);
  return newTable;
};

// Bank account management
export const addBankAccountApi = async (
  weddingId: string,
  account: Omit<BankAccount, "id">
): Promise<BankAccount> => {
  await delay(300);

  const wedding = mockWeddings.find((w) => w.id === weddingId);
  if (!wedding) {
    throw new Error("Wedding not found");
  }

  const newAccount: BankAccount = {
    ...account,
    id: generateId(),
  };

  wedding.bankAccounts.push(newAccount);
  return newAccount;
};
