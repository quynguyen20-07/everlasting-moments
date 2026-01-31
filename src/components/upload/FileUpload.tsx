import { useUploadSingle, useUploadBatch, useDeleteUpload } from '@/hooks/useUpload';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef } from 'react';

interface FileUploadProps {
    /**
     * Upload mode: single or multiple files
     */
    mode?: 'single' | 'multiple';

    /**
     * Accepted file types (e.g., "image/*")
     */
    accept?: string;

    /**
     * Maximum file size in MB
     */
    maxSizeMB?: number;

    /**
     * Callback when upload succeeds
     */
    onUploadSuccess?: (urls: string[]) => void;

    /**
     * Callback when file is deleted
     */
    onDelete?: (url: string) => void;

    /**
     * Initial URLs to display (for editing existing data)
     */
    initialUrls?: string[];

    /**
     * Custom label for the upload button
     */
    label?: string;

    /**
     * Disable the upload functionality
     */
    disabled?: boolean;
}

export const FileUpload = ({
    mode = 'single',
    accept = 'image/*',
    maxSizeMB = 5,
    onUploadSuccess,
    onDelete,
    initialUrls = [],
    label,
    disabled = false,
}: FileUploadProps) => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadedUrls, setUploadedUrls] = useState<string[]>(initialUrls);

    const { mutateAsync: uploadSingle, isPending: isUploadingSingle } = useUploadSingle();
    const { mutateAsync: uploadBatch, isPending: isUploadingBatch } = useUploadBatch();
    const { mutateAsync: deleteFile, isPending: isDeleting } = useDeleteUpload();

    const isUploading = isUploadingSingle || isUploadingBatch;
    const isLoading = isUploading || isDeleting;

    const extractPublicId = (url: string): string => {
        // Extract Cloudinary public_id from URL
        // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
        // Returns: sample
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return filename.split('.')[0];
    };

    const validateFile = (file: File): boolean => {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            toast({
                title: 'File too large',
                description: `File size must be less than ${maxSizeMB}MB`,
                variant: 'destructive',
            });
            return false;
        }

        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        // Validate all files
        const validFiles = files.filter(validateFile);
        if (validFiles.length === 0) return;

        try {
            if (mode === 'single') {
                const result = await uploadSingle(validFiles[0]);
                const newUrls = [result.url];
                setUploadedUrls(newUrls);
                onUploadSuccess?.(newUrls);

                toast({
                    title: 'Upload successful',
                    description: 'File uploaded successfully',
                });
            } else {
                const result = await uploadBatch(validFiles);
                const newUrls = [...uploadedUrls, ...result.urls];
                setUploadedUrls(newUrls);
                onUploadSuccess?.(newUrls);

                toast({
                    title: 'Upload successful',
                    description: `${result.urls.length} file(s) uploaded successfully`,
                });
            }
        } catch (error) {
            toast({
                title: 'Upload failed',
                description: 'Failed to upload file(s). Please try again.',
                variant: 'destructive',
            });
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (url: string) => {
        try {
            const publicId = extractPublicId(url);
            await deleteFile(publicId);

            const newUrls = uploadedUrls.filter((u) => u !== url);
            setUploadedUrls(newUrls);
            onDelete?.(url);

            toast({
                title: 'Deleted',
                description: 'File deleted successfully',
            });
        } catch (error) {
            toast({
                title: 'Delete failed',
                description: 'Failed to delete file. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            {/* Upload Button */}
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={mode === 'multiple'}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={disabled || isLoading}
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleButtonClick}
                    disabled={disabled || isLoading}
                    className="rounded-xl border-[#E8DDD5] text-[#8B7355] hover:bg-[#F5EDE6]"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" />
                            {label || (mode === 'single' ? 'Upload Image' : 'Upload Images')}
                        </>
                    )}
                </Button>

                <p className="text-xs text-[#8B7355] mt-2">
                    Max size: {maxSizeMB}MB • {mode === 'single' ? 'Single file' : 'Multiple files'}
                </p>
            </div>

            {/* Preview Grid */}
            {uploadedUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {uploadedUrls.map((url, index) => (
                        <div
                            key={url}
                            className="relative group aspect-square rounded-xl overflow-hidden border-2 border-[#E8DDD5] bg-[#FAF8F5]"
                        >
                            {/* Image Preview */}
                            <img
                                src={url}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Delete Button Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(url)}
                                    disabled={isDeleting}
                                    className="rounded-full"
                                >
                                    {isDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <X className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {uploadedUrls.length === 0 && !isUploading && (
                <div className="border-2 border-dashed border-[#E8DDD5] rounded-xl p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#F5EDE6] mx-auto flex items-center justify-center mb-3">
                        <ImageIcon className="w-6 h-6 text-[#C4A484]" />
                    </div>
                    <p className="text-sm text-[#8B7355]">
                        No images uploaded yet
                    </p>
                </div>
            )}
        </div>
    );
};
