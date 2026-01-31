import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { GuestStatsCards, GuestTable, GuestEditDialog } from '@/components/guests';
import { useGuests, useGuestStats, useAddGuest, useUpdateGuest, useDeleteGuest } from '@/hooks/useGuests';
import { useWedding } from '@/hooks/useWeddings';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import type { Guest, UpdateGuestDto as GuestInput } from '@/types/api.generated';

export default function GuestManagement() {
  const { weddingId } = useParams<{ weddingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: currentWedding } = useWedding(weddingId);
  const { data: guests = [], isLoading } = useGuests(weddingId);
  const { data: stats } = useGuestStats(weddingId);
  const addGuestMutation = useAddGuest();
  const updateGuestMutation = useUpdateGuest();
  const deleteGuestMutation = useDeleteGuest();

  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Guest | null>(null);

  const handleSaveGuest = async (data: GuestInput) => {
    if (!weddingId) return;
    try {
      if (editGuest) {
        await updateGuestMutation.mutateAsync({ id: editGuest.id, guest: data, weddingId });
        toast({ title: 'Đã cập nhật', description: 'Thông tin khách mời đã được cập nhật.' });
      } else {
        // API requires creating empty guest first then updating
        const newGuest = await addGuestMutation.mutateAsync();
        if (newGuest?.id) {
          await updateGuestMutation.mutateAsync({ id: newGuest.id, guest: data, weddingId });
        }
        toast({ title: 'Đã thêm', description: 'Khách mời mới đã được thêm.' });
      }
      setEditGuest(null);
      setShowAddDialog(false);
    } catch (error) {
      toast({ title: 'Lỗi', description: 'Không thể lưu thông tin khách mời.', variant: 'destructive' });
    }
  };

  const handleDeleteGuest = async () => {
    if (!deleteTarget || !weddingId) return;
    try {
      await deleteGuestMutation.mutateAsync({ id: deleteTarget.id, weddingId });
      toast({ title: 'Đã xóa', description: 'Khách mời đã được xóa.' });
    } catch (error) {
      toast({ title: 'Lỗi', description: 'Không thể xóa khách mời.', variant: 'destructive' });
    } finally {
      setDeleteTarget(null);
    }
  };

  if (!weddingId) {
    return <div className="p-6 text-center"><p className="text-muted-foreground">Không tìm thấy thông tin đám cưới</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/weddings')}><ArrowLeft className="w-5 h-5" /></Button>
          <div>
            <h1 className="text-2xl font-display font-semibold flex items-center gap-2"><Users className="w-6 h-6 text-primary" />Quản lý Khách mời</h1>
            {currentWedding && <p className="text-sm text-muted-foreground">{currentWedding.title}</p>}
          </div>
        </div>
      </div>
      <GuestStatsCards stats={stats || null} isLoading={isLoading} />
      <Card>
        <CardHeader><CardTitle>Danh sách khách mời</CardTitle></CardHeader>
        <CardContent>
          <GuestTable guests={guests} isLoading={isLoading} onAdd={() => setShowAddDialog(true)} onEdit={(guest) => setEditGuest(guest)} onDelete={(guest) => setDeleteTarget(guest)} />
        </CardContent>
      </Card>
      <GuestEditDialog open={showAddDialog || !!editGuest} onOpenChange={(open) => { if (!open) { setShowAddDialog(false); setEditGuest(null); } }} guest={editGuest} onSave={handleSaveGuest} isLoading={addGuestMutation.isPending || updateGuestMutation.isPending} />
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa khách mời?</AlertDialogTitle>
            <AlertDialogDescription>Bạn có chắc muốn xóa khách mời "{deleteTarget?.fullName}"? Hành động này không thể hoàn tác.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGuest} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
