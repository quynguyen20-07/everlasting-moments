import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ListWedding, Wedding, WeddingStatus } from "@/types/wedding";
import { useWeddings, useUpdateWeddingStatus } from "@/hooks/useWeddings";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Plus, Heart, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useState } from "react";

import { DeleteWeddingDialog } from "./DeleteWeddingDialog";
import { CreateWeddingDialog } from "./CreateWeddingDialog";
import { WeddingCard } from "./WeddingCard";

export const WeddingList = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: weddings, isFetching } = useWeddings();
  const updateStatusMutation = useUpdateWeddingStatus();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWedding, setSelectedWedding] = useState<Wedding>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<WeddingStatus | "all">(
    "all",
  );

  const handlePublishToggle = async (id: string, publish: boolean) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: publish ? "published" : "draft",
      });
      toast({
        title: publish ? "Đã xuất bản" : "Đã hủy xuất bản",
        description: publish
          ? "Thiệp cưới của bạn đã được công khai."
          : "Thiệp cưới đã chuyển về chế độ nháp.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (wedding: ListWedding) => {
    setSelectedWedding(wedding);
    setDeleteDialogOpen(true);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Thiệp cưới của tôi
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Quản lý và chỉnh sửa các thiệp cưới của bạn
          </p>
        </div>
        <Button variant="gold" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo thiệp mới
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as WeddingStatus | "all")
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {weddings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-soft p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-secondary mx-auto flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-primary fill-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">
            {searchQuery || statusFilter !== "all"
              ? "Không tìm thấy thiệp cưới"
              : "Chưa có thiệp cưới nào"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery || statusFilter !== "all"
              ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
              : "Bắt đầu tạo thiệp cưới đầu tiên của bạn và chia sẻ niềm vui với mọi người."}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Button variant="gold" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo thiệp cưới đầu tiên
            </Button>
          )}
        </motion.div>
      ) : (
        <div className="bg-card rounded-2xl border border-border shadow-soft divide-y divide-border">
          {weddings.map((wedding, index) => (
            <WeddingCard
              key={wedding.id}
              wedding={wedding}
              index={index}
              onPublishToggle={handlePublishToggle}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <CreateWeddingDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <DeleteWeddingDialog
        weddingId={selectedWedding?.id}
        weddingName={selectedWedding?.title}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
};
