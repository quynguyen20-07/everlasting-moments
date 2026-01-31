import api from './axios';

export interface UploadSingleResponse {
    url: string;
}

export interface UploadBatchResponse {
    urls: string[];
}

export interface DeleteUploadPayload {
    publicId: string;
}

export const UploadApi = {
    uploadSingle: async (file: File): Promise<UploadSingleResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<UploadSingleResponse>('/upload/single', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    uploadBatch: async (files: File[]): Promise<UploadBatchResponse> => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        const response = await api.post<UploadBatchResponse>('/upload/batch', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteFile: async (publicId: string): Promise<void> => {
        await api.delete('/upload', {
            data: { publicId },
        });
    },
};
