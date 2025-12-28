// Bank Account API Service - GraphQL bank account operations
import { graphqlRequest } from '@/lib/graphql/client';
import {
  ADD_BANK_ACCOUNT_MUTATION,
  UPDATE_BANK_ACCOUNT_MUTATION,
  DELETE_BANK_ACCOUNT_MUTATION,
} from '@/lib/graphql/mutations';
import type {
  BankAccount,
  BankAccountInput,
  AddBankAccountResponse,
  UpdateBankAccountResponse,
  DeleteBankAccountResponse,
} from '@/types/graphql';

/**
 * Add bank account to wedding
 */
export async function addBankAccountApi(weddingId: string, bankAccount: BankAccountInput): Promise<BankAccount> {
  const data = await graphqlRequest<AddBankAccountResponse>(ADD_BANK_ACCOUNT_MUTATION, {
    weddingId,
    bankAccount,
  });
  return data.addBankAccount;
}

/**
 * Update bank account
 */
export async function updateBankAccountApi(id: string, bankAccount: BankAccountInput): Promise<BankAccount> {
  const data = await graphqlRequest<UpdateBankAccountResponse>(UPDATE_BANK_ACCOUNT_MUTATION, {
    id,
    bankAccount,
  });
  return data.updateBankAccount;
}

/**
 * Delete bank account
 */
export async function deleteBankAccountApi(id: string): Promise<BankAccount> {
  const data = await graphqlRequest<DeleteBankAccountResponse>(DELETE_BANK_ACCOUNT_MUTATION, { id });
  return data.deleteBankAccount;
}
