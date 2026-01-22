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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  BookHeart,
  Calendar,
  Edit,
  Heart,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useAddLoveStory,
  useDeleteLoveStory,
  useUpdateLoveStory,
} from "@/hooks";
import { LoveStoryFormData, loveStorySchema } from "@/validation";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatDateVN } from "@/lib/utils";
import type { ILoveStory } from "@/types";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoveStoryManagerProps {
  weddingId: string;
  stories: ILoveStory[];
}

export const LoveStoryManager = ({
  weddingId,
  stories,
}: LoveStoryManagerProps) => {
  const { toast } = useToast();
  const { mutateAsync: addLoveStory } = useAddLoveStory();
  const { mutateAsync: updateLoveStory } = useUpdateLoveStory();
  const { mutateAsync: deleteLoveStory } = useDeleteLoveStory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<ILoveStory | null>(null);
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

  const handleOpenEdit = (story: ILoveStory) => {
    setEditingStory(story);
    form.reset({
      title: story.title,
      content: story.content,
      storyDate: story.storyDate,
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
        await updateLoveStory({
          weddingId,
          storyId: editingStory.id,
          story: storyInput,
        });
        toast({
          title: "Đã cập nhật",
          description: "Câu chuyện đã được cập nhật thành công.",
        });
      } else {
        await addLoveStory({ weddingId, story: storyInput });
        toast({
          title: "Đã thêm",
          description: "Câu chuyện mới đã được thêm vào timeline.",
        });
      }

      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingStory
          ? "Không thể cập nhật câu chuyện."
          : "Không thể thêm câu chuyện.",
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
      await deleteLoveStory({ weddingId, storyId: deletingStoryId });
      toast({
        title: "Đã xóa",
        description: "Câu chuyện đã được xóa khỏi timeline.",
      });
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
          <h2 className="font-display text-lg font-semibold text-[#5D4A3C] flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-[#C4A484]" />
            Các chương trình gần
          </h2>
          <p className="text-sm text-[#8B7355] mt-1">
            Thêm các mốc quan trọng trong hành trình tình yêu của bạn
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      {/* Timeline */}
      {sortedStories.length === 0 ? (
        <div className="border-2 border-dashed border-[#E8DDD5] rounded-2xl py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F5EDE6] mx-auto flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-[#C4A484] fill-[#C4A484]" />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#5D4A3C] mb-2">
            Chưa có câu chuyện nào
          </h3>
          <p className="text-[#8B7355] mb-4 max-w-sm mx-auto text-sm">
            Hãy thêm các mốc quan trọng như ngày gặp nhau, lần đầu hẹn hò, ngày
            cầu hôn...
          </p>
          <Button
            variant="outline"
            onClick={handleOpenCreate}
            className="rounded-full border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm câu chuyện đầu tiên
          </Button>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E8DDD5]" />

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
                  <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-[#C4A484] border-4 border-[#FAF8F5] shadow-sm" />

                  <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8DDD5] p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {story.storyDate && (
                            <span className="text-xs text-[#8B7355] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDateVN(story.storyDate)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-[#5D4A3C] mb-1">
                          {story.title}
                        </h3>
                        <p className="text-sm text-[#8B7355] line-clamp-2">
                          {story.content}
                        </p>
                        {story.imageUrl && (
                          <div className="mt-2">
                            <img
                              src={story.imageUrl}
                              alt={story.title}
                              className="h-20 w-32 object-cover rounded-xl"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          className="p-2 rounded-full hover:bg-[#E8DDD5] transition-colors"
                          onClick={() => handleOpenEdit(story)}
                        >
                          <Edit className="w-4 h-4 text-[#8B7355]" />
                        </button>
                        <button
                          className="p-2 rounded-full hover:bg-red-50 transition-colors"
                          onClick={() => handleOpenDelete(story.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-[20px] border-[#E8DDD5]">
          <DialogHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-[#F5EDE6] mx-auto flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-[#C4A484] fill-[#C4A484]" />
            </div>
            <DialogTitle className="font-display text-xl text-[#5D4A3C]">
              {editingStory ? "Chỉnh sửa câu chuyện" : "Thêm câu chuyện mới"}
            </DialogTitle>
            <DialogDescription className="text-[#8B7355] text-sm">
              {editingStory
                ? "Cập nhật thông tin cho mốc thời gian này"
                : "Thêm một mốc mới vào timeline câu chuyện tình yêu"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Tiêu đề *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: Lần đầu gặp gỡ"
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
                      />
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
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Ngày diễn ra
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
                      />
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
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Nội dung *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kể về khoảnh khắc đặc biệt này..."
                        rows={4}
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] resize-none"
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
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      URL hình ảnh (tùy chọn)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
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
                  className="flex-1 rounded-full border-[#E8DDD5] text-[#8B7355] hover:bg-[#F5EDE6]"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoading}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A]"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingStory ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-white rounded-[20px] border-[#E8DDD5]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#5D4A3C]">
              Xóa câu chuyện?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#8B7355]">
              Bạn có chắc chắn muốn xóa câu chuyện này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isLoading}
              className="rounded-full border-[#E8DDD5] text-[#8B7355] hover:bg-[#F5EDE6]"
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="rounded-full bg-red-500 text-white hover:bg-red-600"
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
