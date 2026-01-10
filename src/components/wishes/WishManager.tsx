// Wish Manager Component - For wedding owners to manage wishes
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Trash2, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import type { Wish } from '@/types/graphql';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface WishManagerProps {
  wishes: Wish[];
  isLoading?: boolean;
  onApprove: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function WishManager({
  wishes,
  isLoading,
  onApprove,
  onDelete,
}: WishManagerProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  const pendingWishes = wishes.filter((w) => !w.isApproved && w.isActive);
  const approvedWishes = wishes.filter((w) => w.isApproved && w.isActive);

  const handleApprove = async (id: string) => {
    setProcessing(id);
    try {
      await onApprove(id);
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setProcessing(deleteId);
    try {
      await onDelete(deleteId);
    } finally {
      setProcessing(null);
      setDeleteId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), {
        addSuffix: true,
        locale: vi,
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingWishes.length}</p>
              <p className="text-sm text-muted-foreground">Chờ duyệt</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{approvedWishes.length}</p>
              <p className="text-sm text-muted-foreground">Đã duyệt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Wishes */}
      {pendingWishes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              Lời chúc chờ duyệt ({pendingWishes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingWishes.map((wish) => (
                <div
                  key={wish.id}
                  className="p-4 rounded-lg border bg-yellow-50/50 border-yellow-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{wish.guestName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(wish.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{wish.message}"
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-300 hover:bg-green-50"
                        onClick={() => handleApprove(wish.id)}
                        disabled={processing === wish.id}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => setDeleteId(wish.id)}
                        disabled={processing === wish.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approved Wishes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5 text-primary" />
            Tất cả lời chúc đã duyệt ({approvedWishes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {approvedWishes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Chưa có lời chúc nào được duyệt
            </p>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Người gửi</TableHead>
                    <TableHead>Lời chúc</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedWishes.map((wish) => (
                    <TableRow key={wish.id}>
                      <TableCell className="font-medium">
                        {wish.guestName}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="truncate">{wish.message}</p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(wish.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(wish.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa lời chúc?</AlertDialogTitle>
            <AlertDialogDescription>
              Lời chúc này sẽ bị xóa và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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
