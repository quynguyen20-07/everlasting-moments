import type { MediaItemWithMeta, GalleryLayout } from "@/types/media";
// Media Manager Component - CRUD for wedding gallery
import { useState, useEffect, useCallback } from "react";
import { useMediaStore } from "@/stores/mediaStore";

// Alias for cleaner code
type MediaItem = MediaItemWithMeta;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  Loader2,
  X,
  Eye,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MediaManagerProps {
  weddingId: string;
}

// Layout options
const LAYOUT_OPTIONS: {
  value: GalleryLayout;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "grid-2",
    label: "Lưới 2 cột",
    icon: <Grid2X2 className="w-4 h-4" />,
  },
  {
    value: "grid-3",
    label: "Lưới 3 cột",
    icon: <Grid3X3 className="w-4 h-4" />,
  },
  {
    value: "masonry",
    label: "Masonry",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    value: "featured",
    label: "Nổi bật",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

// Sortable Media Item
function SortableMediaItem({
  item,
  onEdit,
  onDelete,
  onPreview,
}: {
  item: MediaItem;
  onEdit: (item: MediaItem) => void;
  onDelete: (id: string) => void;
  onPreview: (item: MediaItem) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group bg-card rounded-2xl overflow-hidden border shadow-sm ${
        isDragging ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={item.url}
          alt={item.caption || "Wedding photo"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9"
          onClick={() => onPreview(item)}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9"
          onClick={() => onEdit(item)}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-9 w-9"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Caption */}
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-sm truncate">{item.caption}</p>
        </div>
      )}
    </div>
  );
}

export default function MediaManager({ weddingId }: MediaManagerProps) {
  const { toast } = useToast();
  const {
    media,
    gallerySettings,
    isLoading,
    fetchMedia,
    addMedia,
    updateMedia,
    deleteMedia,
    reorderMedia,
    setLayout,
    setGallerySettings,
  } = useMediaStore();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaCaption, setNewMediaCaption] = useState("");
  const [editCaption, setEditCaption] = useState("");

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    fetchMedia(weddingId);
  }, [weddingId, fetchMedia]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = media.findIndex((m) => m.id === active.id);
        const newIndex = media.findIndex((m) => m.id === over.id);

        const newOrder = arrayMove(media, oldIndex, newIndex);
        reorderMedia(newOrder.map((m) => m.id));

        toast({
          title: "Đã sắp xếp lại",
          description: "Thứ tự ảnh đã được cập nhật",
        });
      }
    },
    [media, reorderMedia, toast],
  );

  const handleAddMedia = async () => {
    if (!newMediaUrl.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập URL ảnh",
        variant: "destructive",
      });
      return;
    }

    try {
      await addMedia(weddingId, {
        type: "image",
        url: newMediaUrl,
        caption: newMediaCaption,
      });

      toast({
        title: "Thành công",
        description: "Đã thêm ảnh vào thư viện",
      });

      setNewMediaUrl("");
      setNewMediaCaption("");
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể thêm ảnh",
        variant: "destructive",
      });
    }
  };

  const handleEditMedia = async () => {
    if (!selectedMedia) return;

    try {
      await updateMedia(selectedMedia.id, {
        caption: editCaption,
      });

      toast({
        title: "Thành công",
        description: "Đã cập nhật ảnh",
      });

      setIsEditDialogOpen(false);
      setSelectedMedia(null);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật ảnh",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMedia = async (id: string) => {
    try {
      await deleteMedia(id);
      toast({
        title: "Đã xóa",
        description: "Ảnh đã được xóa khỏi thư viện",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa ảnh",
        variant: "destructive",
      });
    }
  };

  const openEdit = (item: MediaItem) => {
    setSelectedMedia(item);
    setEditCaption(item.caption || "");
    setIsEditDialogOpen(true);
  };

  const openPreview = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsPreviewOpen(true);
  };

  // Get grid class based on layout
  const getGridClass = () => {
    switch (gallerySettings.layout) {
      case "grid-2":
        return "grid-cols-2";
      case "grid-3":
        return "grid-cols-2 md:grid-cols-3";
      case "masonry":
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case "featured":
      default:
        return "grid-cols-2 md:grid-cols-3";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Thư viện ảnh cưới</h3>
          <p className="text-sm text-muted-foreground">
            Quản lý và sắp xếp ảnh trong thư viện ({media.length} ảnh)
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Thêm ảnh
        </Button>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cài đặt hiển thị</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            {/* Layout Selector */}
            <div className="space-y-2">
              <Label>Kiểu hiển thị</Label>
              <div className="flex gap-2">
                {LAYOUT_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      gallerySettings.layout === option.value
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setLayout(option.value)}
                    className="gap-2"
                  >
                    {option.icon}
                    <span className="hidden sm:inline">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Show Captions */}
            <div className="flex items-center gap-3">
              <Switch
                checked={gallerySettings.showCaptions}
                onCheckedChange={(checked) =>
                  setGallerySettings({ showCaptions: checked })
                }
              />
              <Label>Hiển thị chú thích</Label>
            </div>

            {/* Enable Lightbox */}
            <div className="flex items-center gap-3">
              <Switch
                checked={gallerySettings.enableLightbox}
                onCheckedChange={(checked) =>
                  setGallerySettings({ enableLightbox: checked })
                }
              />
              <Label>Xem ảnh lớn</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      {isLoading && media.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : media.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Chưa có ảnh nào trong thư viện
              <br />
              <span className="text-sm">Bấm "Thêm ảnh" để bắt đầu</span>
            </p>
          </CardContent>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={media.map((m) => m.id)}
            strategy={rectSortingStrategy}
          >
            <div className={`grid ${getGridClass()} gap-4`}>
              {media.map((item, index) => (
                <div
                  key={item.id}
                  className={
                    gallerySettings.layout === "featured" && index === 0
                      ? "md:col-span-2 md:row-span-2"
                      : ""
                  }
                >
                  <SortableMediaItem
                    item={item}
                    onEdit={openEdit}
                    onDelete={handleDeleteMedia}
                    onPreview={openPreview}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add Media Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm ảnh mới</DialogTitle>
            <DialogDescription>
              Nhập URL ảnh để thêm vào thư viện
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>URL ảnh *</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Chú thích</Label>
              <Input
                placeholder="Mô tả ngắn về ảnh"
                value={newMediaCaption}
                onChange={(e) => setNewMediaCaption(e.target.value)}
              />
            </div>
            {newMediaUrl && (
              <div className="rounded-lg overflow-hidden border">
                <img
                  src={newMediaUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddMedia} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Thêm ảnh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Media Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa ảnh</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedMedia && (
              <div className="rounded-lg overflow-hidden border">
                <img
                  src={selectedMedia.url}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>Chú thích</Label>
              <Input
                placeholder="Mô tả ngắn về ảnh"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleEditMedia} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="sr-only">Xem ảnh</DialogTitle>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => setIsPreviewOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
          {selectedMedia && (
            <div className="relative">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.caption || "Wedding photo"}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
              {selectedMedia.caption && (
                <p className="text-center mt-4 text-muted-foreground">
                  {selectedMedia.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
