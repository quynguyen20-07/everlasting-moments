import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Edit, Loader2, MapPin, Plus, Trash2 } from "lucide-react";
import { WeddingEventFormData, weddingEventSchema } from "@/validation";
import { IWeddingEvent, WeddingEventInput } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useWeddingStore } from "@/stores/weddingStore";
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

  const {
    currentWedding,
    addWeddingEvent,
    updateWeddingEvent,
    deleteWeddingEvent,
  } = useWeddingStore();

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
        await updateWeddingEvent(weddingId, editing.id, payload);
        toast({ title: "Đã cập nhật sự kiện" });
      } else {
        await addWeddingEvent(weddingId, payload);
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
      await deleteWeddingEvent(weddingId, eventId);
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
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Sự kiện cưới
        </h2>

        <Button variant="gold" onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm sự kiện
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-muted-foreground">
            Chưa có sự kiện nào
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <Card key={e.id}>
              <CardContent className="p-4 flex justify-between">
                <div>
                  <p className="font-semibold">{e.title}</p>
                  <p className="font-medium mb-2 text-muted-foreground">
                    ⏰ {e.startTime || "--"} - {e.endTime || "--"} • 📅{" "}
                    {formatDateFromTimestamp(e.eventDate)}
                  </p>
                  <p className="text-sm flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 mt-1" />
                    {e.address}
                  </p>
                </div>

                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEdit(e)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(e.id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Cập nhật sự kiện" : "Thêm sự kiện"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Loại sự kiện</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded px-3 py-2"
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
                    <FormLabel>Ngày</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                      <FormLabel>Bắt đầu</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kết thúc</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
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
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" variant="gold" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Lưu
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
