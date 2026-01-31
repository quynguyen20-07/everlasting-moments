import api from './axios';
import {
    CreateBankAccountDto,
    UpdateBankAccountDto,
    BankAccount,
} from '../../types/api.generated';

export const BankApi = {
    create: async (data: CreateBankAccountDto): Promise<void> => {
        await api.post('/banks', data);
    },

    findAll: async (): Promise<BankAccount[]> => {
        const response = await api.get<BankAccount[]>('/banks');
        return response.data;
    },

    findOne: async (id: string): Promise<BankAccount> => {
        const response = await api.get<BankAccount>(`/banks/${id}`);
        return response.data;
    },

    update: async (id: string, data: UpdateBankAccountDto): Promise<BankAccount> => {
        const response = await api.patch<BankAccount>(`/banks/${id}`, data);
        return response.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/banks/${id}`);
    },
};
