// Love Story Manager Component - CRUD for love story timeline
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heart,
  Plus,
  Edit,
  Trash2,
  Calendar,
  X,
  Loader2,
  BookHeart,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWeddingStore } from "@/stores/weddingStore";
import { useToast } from "@/hooks/use-toast";
import type { LoveStory } from "@/types/graphql";
import { formatDateVN } from "@/lib/utils";

const loveStorySchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề").max(100, "Tiêu đề tối đa 100 ký tự"),
  content: z.string().min(1, "Vui lòng nhập nội dung").max(1000, "Nội dung tối đa 1000 ký tự"),
  storyDate: z.string().optional(),
  imageUrl: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
});

type LoveStoryFormData = z.infer<typeof loveStorySchema>;

interface LoveStoryManagerProps {
  weddingId: string;
  stories: LoveStory[];
}

export const LoveStoryManager = ({ weddingId, stories }: LoveStoryManagerProps) => {
  const { toast } = useToast();
  const { addLoveStory, updateLoveStory, deleteLoveStory } = useWeddingStore();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<LoveStory | null>(null);
  const [deletingStoryId, setDeletingStoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoveStoryFormData>({
    resolver: zodResolver(loveStorySchema),
    defaultValues: {
      title: "",
      content: "",
      storyDate: "",
      imageUrl: "",
    },
  });

  const handleOpenCreate = () => {
    setEditingStory(null);
    form.reset({ title: "", content: "", storyDate: "", imageUrl: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (story: LoveStory) => {
    setEditingStory(story);
    form.reset({
      title: story.title,
      content: story.content,
      storyDate: story.storyDate || "",
      imageUrl: story.imageUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (storyId: string) => {
    setDeletingStoryId(storyId);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: LoveStoryFormData) => {
    setIsLoading(true);
    try {
      const storyInput = {
        title: data.title,
        content: data.content,
        storyDate: data.storyDate || undefined,
        imageUrl: data.imageUrl || undefined,
      };

      if (editingStory) {
        await updateLoveStory(weddingId, editingStory.id, storyInput);
        toast({ title: "Đã cập nhật", description: "Câu chuyện đã được cập nhật thành công." });
      } else {
        await addLoveStory(weddingId, storyInput);
        toast({ title: "Đã thêm", description: "Câu chuyện mới đã được thêm vào timeline." });
      }
      
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingStory ? "Không thể cập nhật câu chuyện." : "Không thể thêm câu chuyện.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingStoryId) return;
    
    setIsLoading(true);
    try {
      await deleteLoveStory(weddingId, deletingStoryId);
      toast({ title: "Đã xóa", description: "Câu chuyện đã được xóa khỏi timeline." });
      setIsDeleteDialogOpen(false);
      setDeletingStoryId(null);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa câu chuyện.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sort stories by date
  const sortedStories = [...stories].sort((a, b) => {
    if (!a.storyDate && !b.storyDate) return 0;
    if (!a.storyDate) return 1;
    if (!b.storyDate) return -1;
    return new Date(a.storyDate).getTime() - new Date(b.storyDate).getTime();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-primary" />
            Câu chuyện tình yêu
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Thêm các mốc quan trọng trong hành trình tình yêu của bạn
          </p>
        </div>
        <Button variant="gold" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm mốc
        </Button>
      </div>

      {/* Timeline */}
      {sortedStories.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Chưa có câu chuyện nào
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
              Hãy thêm các mốc quan trọng như ngày gặp nhau, lần đầu hẹn hò, ngày cầu hôn...
            </p>
            <Button variant="outline" onClick={handleOpenCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm câu chuyện đầu tiên
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {sortedStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-14"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-sm" />
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {story.storyDate && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDateVN(story.storyDate)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {story.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {story.content}
                          </p>
                          {story.imageUrl && (
                            <div className="mt-2">
                              <img
                                src={story.imageUrl}
                                alt={story.title}
                                className="h-20 w-32 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleOpenEdit(story)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleOpenDelete(story.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingStory ? "Chỉnh sửa câu chuyện" : "Thêm câu chuyện mới"}
            </DialogTitle>
            <DialogDescription>
              {editingStory
                ? "Cập nhật thông tin cho mốc thời gian này"
                : "Thêm một mốc mới vào timeline câu chuyện tình yêu"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề *</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: Lần đầu gặp gỡ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storyDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày diễn ra</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kể về khoảnh khắc đặc biệt này..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL hình ảnh (tùy chọn)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoading}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingStory ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa câu chuyện?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa câu chuyện này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
