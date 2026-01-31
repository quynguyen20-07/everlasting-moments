import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadApi } from '@/lib/api/upload.api';

/**
 * Hook for uploading a single file
 */
export function useUploadSingle() {
    return useMutation({
        mutationFn: (file: File) => UploadApi.uploadSingle(file),
    });
}

/**
 * Hook for uploading multiple files
 */
export function useUploadBatch() {
    return useMutation({
        mutationFn: (files: File[]) => UploadApi.uploadBatch(files),
    });
}

/**
 * Hook for deleting an uploaded file
 */
export function useDeleteUpload() {
    return useMutation({
        mutationFn: (publicId: string) => UploadApi.deleteFile(publicId),
    });
}
