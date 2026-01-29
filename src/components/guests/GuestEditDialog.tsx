// Guest Edit Dialog Component
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Guest, UpdateGuestDto as GuestInput } from '@/types/api.generated';
import { Loader2, Save } from 'lucide-react';
import { useEffect } from 'react';

const guestSchema = z.object({
  fullName: z.string().min(1, 'Vui lòng nhập tên'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  phone: z.string().optional(),
  numberOfGuests: z.coerce.number().min(1).default(1),
  attendanceStatus: z.string().default('pending'),
});

type GuestFormData = z.infer<typeof guestSchema>;

interface GuestEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest?: Guest | null;
  onSave: (data: GuestFormData) => Promise<void>;
  isLoading?: boolean;
}

const RELATIONSHIP_OPTIONS = [
  { value: 'family', label: 'Gia đình' },
  { value: 'friend', label: 'Bạn bè' },
  { value: 'colleague', label: 'Đồng nghiệp' },
  { value: 'other', label: 'Khác' },
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Chờ phản hồi' },
  { value: 'confirmed', label: 'Xác nhận tham dự' },
  { value: 'declined', label: 'Từ chối' },
];

export function GuestEditDialog({
  open,
  onOpenChange,
  guest,
  onSave,
  isLoading,
}: GuestEditDialogProps) {
  const isEditing = !!guest;

  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      numberOfGuests: 1,
      attendanceStatus: 'pending',
    },
  });

  useEffect(() => {
    if (guest) {
      form.reset({
        fullName: guest.fullName,
        email: guest.email || '',
        phone: guest.phone || '',
        numberOfGuests: guest.numberOfGuests,
        attendanceStatus: guest.attendanceStatus,
      });
    } else {
      form.reset({
        fullName: '',
        email: '',
        phone: '',
        numberOfGuests: 1,
        attendanceStatus: 'pending',
      });
    }
  }, [guest, form]);

  const handleSubmit = async (data: GuestFormData) => {
    await onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa khách mời' : 'Thêm khách mời'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập họ tên" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="email@..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0xxx..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="attendanceStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </div>



            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isEditing ? 'Cập nhật' : 'Thêm'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
