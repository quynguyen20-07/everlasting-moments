// Guest Management Page - For wedding owners
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { GuestStatsCards, GuestTable, GuestEditDialog } from '@/components/guests';
import { useGuestStore } from '@/stores/guestStore';
import { useWeddingStore } from '@/stores/weddingStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import type { Guest, GuestInput } from '@/types/graphql';

export default function GuestManagement() {
  const { weddingId } = useParams<{ weddingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { currentWedding, fetchWedding } = useWeddingStore();
  const {
    guests,
    stats,
    isLoading,
    fetchGuests,
    fetchStats,
    addGuest,
    updateGuest,
    deleteGuest,
  } = useGuestStore();

  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Guest | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (weddingId) {
      fetchWedding(weddingId);
      fetchGuests(weddingId);
      fetchStats(weddingId);
    }
  }, [weddingId, fetchWedding, fetchGuests, fetchStats]);

  const handleSaveGuest = async (data: GuestInput) => {
    if (!weddingId) return;
    setIsSaving(true);
    try {
      if (editGuest) {
        await updateGuest(editGuest.id, data);
        toast({ title: 'Đã cập nhật', description: 'Thông tin khách mời đã được cập nhật.' });
      } else {
        await addGuest(weddingId, data);
        toast({ title: 'Đã thêm', description: 'Khách mời mới đã được thêm.' });
      }
      await fetchStats(weddingId);
      setEditGuest(null);
      setShowAddDialog(false);
    } catch (error) {
      toast({ title: 'Lỗi', description: 'Không thể lưu thông tin khách mời.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGuest = async () => {
    if (!deleteTarget || !weddingId) return;
    try {
      await deleteGuest(deleteTarget.id);
      await fetchStats(weddingId);
      toast({ title: 'Đã xóa', description: 'Khách mời đã được xóa.' });
    } catch (error) {
      toast({ title: 'Lỗi', description: 'Không thể xóa khách mời.', variant: 'destructive' });
    } finally {
      setDeleteTarget(null);
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
      <div className="flex items-center justify-between">
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
              <Users className="w-6 h-6 text-primary" />
              Quản lý Khách mời
            </h1>
            {currentWedding && (
              <p className="text-sm text-muted-foreground">
                {currentWedding.title}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <GuestStatsCards stats={stats} isLoading={isLoading} />

      {/* Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách mời</CardTitle>
        </CardHeader>
        <CardContent>
          <GuestTable
            guests={guests}
            isLoading={isLoading}
            onAdd={() => setShowAddDialog(true)}
            onEdit={(guest) => setEditGuest(guest)}
            onDelete={(guest) => setDeleteTarget(guest)}
          />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <GuestEditDialog
        open={showAddDialog || !!editGuest}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddDialog(false);
            setEditGuest(null);
          }
        }}
        guest={editGuest}
        onSave={handleSaveGuest}
        isLoading={isSaving}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa khách mời?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa khách mời "{deleteTarget?.fullName}"? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGuest}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
