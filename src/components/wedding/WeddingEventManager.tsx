import {
  useAddWeddingEvent,
  useCreateWedding,
  useDeleteWedding,
  useDeleteWeddingEvent,
  useUpdateWedding,
  useUpdateWeddingEvent,
  useWedding,
} from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Calendar,
  Edit,
  Heart,
  Loader2,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { WeddingEventFormData, weddingEventSchema } from "@/validation";
import { IWeddingEvent, WeddingEventInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDateFromTimestamp } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";

type EventType = "ceremony" | "reception" | "party";

const toDateInputValue = (date?: string | number) => {
  if (!date) return "";

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toISOString().slice(0, 10);
};

export const WeddingEventManager = ({ weddingId }: { weddingId: string }) => {
  const { toast } = useToast();

  const { data: currentWedding } = useWedding(weddingId);

  const { mutateAsync: addWeddingEvent } = useAddWeddingEvent();
  const { mutateAsync: updateWeddingEvent } = useUpdateWeddingEvent();
  const { mutateAsync: deleteWeddingEvent } = useDeleteWeddingEvent();

  const events: IWeddingEvent[] =
    currentWedding.weddingDetail?.weddingEvents ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<IWeddingEvent | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<WeddingEventFormData>({
    resolver: zodResolver(weddingEventSchema),
    defaultValues: {
      title: "",
      type: "ceremony",
      eventDate: "",
      startTime: "",
      endTime: "",
      address: "",
      description: "",
    },
  });

  const openCreate = () => {
    setEditing(null);
    form.reset({
      title: "",
      type: "ceremony",
      eventDate: "",
      startTime: "",
      endTime: "",
      address: "",
      description: "",
    });
    setOpen(true);
  };

  const openEdit = (event: IWeddingEvent) => {
    setEditing(event);
    form.reset({
      title: event.title,
      type: event.type as EventType,
      eventDate: toDateInputValue(event.eventDate),
      startTime: event.startTime ?? "",
      endTime: event.endTime ?? "",
      address: event.address,
      description: event.description ?? "",
    });
    setOpen(true);
  };

  const submit = async (data: WeddingEventFormData) => {
    try {
      setLoading(true);

      const payload: WeddingEventInput = {
        title: data.title,
        type: data.type,
        eventDate: data.eventDate,
        address: data.address,
        startTime: data.startTime || undefined,
        endTime: data.endTime || undefined,
        description: data.description || undefined,
      };

      if (editing) {
        await updateWeddingEvent({
          weddingId,
          eventId: editing.id,
          event: payload,
        });
        toast({ title: "Đã cập nhật sự kiện" });
      } else {
        await addWeddingEvent({ weddingId, event: payload });
        toast({ title: "Đã thêm sự kiện" });
      }

      setOpen(false);
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể lưu sự kiện",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      setLoading(true);
      await deleteWeddingEvent({ weddingId, eventId });
      toast({ title: "Đã xoá sự kiện" });
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể xoá sự kiện",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-lg font-semibold text-[#5D4A3C] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C4A484]" />
            Sự kiện cưới
          </h2>
          <p className="text-sm text-[#8B7355] mt-1">
            Quản lý các sự kiện trong ngày cưới của bạn
          </p>
        </div>

        <Button
          onClick={openCreate}
          className="rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm sự kiện
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="border-2 border-dashed border-[#E8DDD5] rounded-2xl py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F5EDE6] mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-[#C4A484]" />
          </div>
          <h3 className="font-display text-lg font-semibold text-[#5D4A3C] mb-2">
            Chưa có sự kiện nào
          </h3>
          <p className="text-[#8B7355] mb-4 max-w-sm mx-auto text-sm">
            Thêm các sự kiện như lễ cưới, tiệc cưới, after party...
          </p>
          <Button
            variant="outline"
            onClick={openCreate}
            className="rounded-full border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm sự kiện đầu tiên
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-[#FAF8F5] rounded-2xl border border-[#E8DDD5] p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#5D4A3C] mb-2">
                    {e.title}
                  </h3>
                  <p className="text-sm text-[#8B7355] mb-2">
                    ⏰ {e.startTime || "--"} - {e.endTime || "--"} • 📅{" "}
                    {formatDateFromTimestamp(e.eventDate)}
                  </p>
                  <p className="text-sm flex items-start gap-2 text-[#8B7355]">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    {e.address}
                  </p>
                  {e.description && (
                    <p className="text-sm text-[#A89B8C] mt-2 line-clamp-2">
                      {e.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-1 flex-shrink-0">
                  <button
                    className="p-2 rounded-full hover:bg-[#E8DDD5] transition-colors"
                    onClick={() => openEdit(e)}
                  >
                    <Edit className="w-4 h-4 text-[#8B7355]" />
                  </button>

                  <button
                    className="p-2 rounded-full hover:bg-red-50 transition-colors"
                    onClick={() => handleDelete(e.id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-[20px] border-[#E8DDD5]">
          <DialogHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-[#F5EDE6] mx-auto flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-[#C4A484] fill-[#C4A484]" />
            </div>
            <DialogTitle className="font-display text-xl text-[#5D4A3C]">
              {editing ? "Cập nhật sự kiện" : "Thêm sự kiện"}
            </DialogTitle>
            <DialogDescription className="text-[#8B7355] text-sm">
              {editing
                ? "Chỉnh sửa thông tin sự kiện"
                : "Thêm sự kiện mới vào lịch trình"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Tiêu đề
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
                        placeholder="VD: Lễ cưới"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Loại sự kiện
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full rounded-xl border border-[#E8DDD5] bg-[#FAF8F5] px-3 py-2 text-sm focus:border-[#C4A484] focus:outline-none focus:ring-1 focus:ring-[#C4A484]"
                      >
                        <option value="ceremony">Lễ cưới</option>
                        <option value="reception">Tiệc cưới</option>
                        <option value="party">After Party</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Ngày
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                        Thời gian bắt đầu
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                        Thời gian kết thúc
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Địa điểm
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484]"
                        placeholder="VD: Nhà hàng ABC, Quận 1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                      Mô tả
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        {...field}
                        className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] resize-none"
                        placeholder="Mô tả chi tiết về sự kiện..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-full border-[#E8DDD5] text-[#8B7355] hover:bg-[#F5EDE6]"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A]"
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editing ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
