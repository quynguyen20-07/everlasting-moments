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
import { useWeddingStore } from "@/stores/weddingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Heart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
// Create Wedding Dialog - Modal form for creating new wedding
import { useState } from "react";
import { z } from "zod";

const createWeddingSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên thiệp cưới").max(100),
  brideName: z.string().min(1, "Vui lòng nhập tên cô dâu").max(50),
  groomName: z.string().min(1, "Vui lòng nhập tên chú rể").max(50),
  eventDate: z.string().optional(),
});

type CreateWeddingFormData = z.infer<typeof createWeddingSchema>;

interface CreateWeddingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateWeddingDialog = ({
  open,
  onOpenChange,
}: CreateWeddingDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { createWedding } = useWeddingStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateWeddingFormData>({
    resolver: zodResolver(createWeddingSchema),
    defaultValues: {
      name: "",
      brideName: "",
      groomName: "",
      eventDate: "",
    },
  });

  const onSubmit = async (data: CreateWeddingFormData) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // Create wedding with just title - bride/groom managed separately via updateBride/updateGroom
      const wedding = await createWedding({
        title: data.name,
        language: "vi",
      });

      toast({
        title: "Tạo thiệp cưới thành công!",
        description: "Bạn có thể bắt đầu chỉnh sửa thiệp cưới ngay.",
      });

      onOpenChange(false);
      form.reset();
      navigate(`/dashboard/weddings`);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo thiệp cưới. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </div>
          <DialogTitle className="text-center font-display text-xl">
            Tạo thiệp cưới mới
          </DialogTitle>
          <DialogDescription className="text-center">
            Nhập thông tin cơ bản để bắt đầu tạo thiệp cưới của bạn
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thiệp cưới</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: Đám cưới Minh & Linh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brideName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên cô dâu</FormLabel>
                    <FormControl>
                      <Input placeholder="Ngọc Linh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="groomName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên chú rể</FormLabel>
                    <FormControl>
                      <Input placeholder="Minh Tuấn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày cưới (tùy chọn)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                onClick={() => onOpenChange(false)}
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
                Tạo thiệp cưới
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
