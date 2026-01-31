import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteWedding } from "@/hooks/useWeddings";
import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface DeleteWeddingDialogProps {
  weddingId: string | null;
  weddingName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteWeddingDialog = ({
  weddingId,
  weddingName,
  open,
  onOpenChange,
}: DeleteWeddingDialogProps) => {
  const { toast } = useToast();
  const deleteMutation = useDeleteWedding();

  const handleDelete = async () => {
    if (!weddingId) return;
    try {
      await deleteMutation.mutateAsync(weddingId);
      toast({
        title: "Đã xóa thiệp cưới",
        description: "Thiệp cưới đã được xóa thành công.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa thiệp cưới. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-2">
            <Trash2 className="w-6 h-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">
            Xóa thiệp cưới?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Bạn có chắc chắn muốn xóa thiệp cưới{" "}
            <span className="font-semibold">{weddingName}</span>?<br />
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Xóa thiệp cưới
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
