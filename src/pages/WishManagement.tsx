// Wish Management Page - For wedding owners
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WishManager } from '@/components/wishes';
import { useWishStore } from '@/stores/wishStore';
import { useWeddingStore } from '@/stores/weddingStore';
import { useToast } from '@/hooks/use-toast';

export default function WishManagement() {
  const { weddingId } = useParams<{ weddingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { currentWedding, fetchWedding } = useWeddingStore();
  const { wishes, isLoading, fetchWishes, approveWish, deleteWish } = useWishStore();

  useEffect(() => {
    if (weddingId) {
      fetchWedding(weddingId);
      fetchWishes(weddingId);
    }
  }, [weddingId, fetchWedding, fetchWishes]);

  const handleApprove = async (id: string) => {
    try {
      await approveWish(id);
      toast({ title: 'Đã duyệt', description: 'Lời chúc đã được duyệt và hiển thị công khai.' });
    } catch (error) {
      toast({ title: 'Lỗi', description: 'Không thể duyệt lời chúc.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWish(id);
      toast({ title: 'Đã xóa', description: 'Lời chúc đã được xóa.' });
    } catch (error) {
      toast({ title: 'Lỗi', description: 'Không thể xóa lời chúc.', variant: 'destructive' });
    }
  };

  if (!weddingId) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Không tìm thấy thông tin đám cưới</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard/weddings')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-semibold flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            Quản lý Lời chúc
          </h1>
          {currentWedding && (
            <p className="text-sm text-muted-foreground">
              {currentWedding.title}
            </p>
          )}
        </div>
      </div>

      {/* Wish Manager */}
      <WishManager
        wishes={wishes}
        isLoading={isLoading}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />
    </div>
  );
}
