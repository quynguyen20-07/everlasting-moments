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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeddingStore } from "@/stores/weddingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Loader2, User, Palette, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { weddingTemplates } from "@/lib/templates/wedding-templates";

const createWeddingSchema = z.object({
  // Basic info
  title: z.string().min(1, "Vui lòng nhập tên thiệp cưới").max(100),
  weddingDate: z.string().min(1, "Vui lòng chọn ngày cưới"),
  language: z.enum(["vi", "en"]),

  // Bride info
  brideName: z.string().min(1, "Vui lòng nhập tên cô dâu").max(50),
  brideShortBio: z.string().max(200).optional(),
  brideFamilyInfo: z.string().max(500).optional(),

  // Groom info
  groomName: z.string().min(1, "Vui lòng nhập tên chú rể").max(50),
  groomShortBio: z.string().max(200).optional(),
  groomFamilyInfo: z.string().max(500).optional(),

  // Theme settings
  template: z.string().min(1, "Vui lòng chọn mẫu thiệp"),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontHeading: z.string().optional(),
  fontBody: z.string().optional(),
  backgroundMusic: z.string().optional(),
});

type CreateWeddingFormData = z.infer<typeof createWeddingSchema>;

interface CreateWeddingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FONT_OPTIONS = [
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond" },
  { value: "Abril Fatface", label: "Abril Fatface" },
  { value: "Inter", label: "Inter" },
  { value: "Lora", label: "Lora" },
];

const MUSIC_OPTIONS = [
  { value: "/music/beautiful-in-white.mp3", label: "Beautiful in White" },
  { value: "/music/i-do.mp3", label: "I Do" },
  { value: "", label: "Không có nhạc" },
];

export const CreateWeddingDialog = ({
  open,
  onOpenChange,
}: CreateWeddingDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { createWedding } = useWeddingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<CreateWeddingFormData>({
    resolver: zodResolver(createWeddingSchema),
    defaultValues: {
      title: "",
      weddingDate: "",
      language: "vi",
      brideName: "",
      brideShortBio: "",
      brideFamilyInfo: "",
      groomName: "",
      groomShortBio: "",
      groomFamilyInfo: "",
      template: "blush-romance",
      primaryColor: "#F4B6C2",
      secondaryColor: "#F7E7CE",
      fontHeading: "Playfair Display",
      fontBody: "Inter",
      backgroundMusic: "/music/beautiful-in-white.mp3",
    },
  });

  const onSubmit = async (data: CreateWeddingFormData) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const wedding = await createWedding({
        title: data.title,
        language: data.language,
        weddingDate: data.weddingDate,
        bride: {
          fullName: data.brideName,
          shortBio: data.brideShortBio,
          familyInfo: data.brideFamilyInfo,
        },
        groom: {
          fullName: data.groomName,
          shortBio: data.groomShortBio,
          familyInfo: data.groomFamilyInfo,
        },
        themeSettings: {
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          fontHeading: data.fontHeading,
          fontBody: data.fontBody,
          backgroundMusic: data.backgroundMusic,
        },
      });

      toast({
        title: "Tạo thiệp cưới thành công!",
        description: "Bạn có thể bắt đầu chỉnh sửa thiệp cưới ngay.",
      });

      onOpenChange(false);
      form.reset();
      navigate(`/dashboard/weddings/${wedding.id}/edit`);
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const goToNextTab = () => {
    if (activeTab === "basic") setActiveTab("bride");
    else if (activeTab === "bride") setActiveTab("groom");
    else if (activeTab === "groom") setActiveTab("theme");
  };

  const goToPrevTab = () => {
    if (activeTab === "theme") setActiveTab("groom");
    else if (activeTab === "groom") setActiveTab("bride");
    else if (activeTab === "bride") setActiveTab("basic");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </div>
          <DialogTitle className="text-center font-display text-xl">
            Tạo thiệp cưới mới
          </DialogTitle>
          <DialogDescription className="text-center">
            Điền đầy đủ thông tin để tạo thiệp cưới hoàn chỉnh
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="text-xs sm:text-sm">
                  Cơ bản
                </TabsTrigger>
                <TabsTrigger value="bride" className="text-xs sm:text-sm">
                  Cô dâu
                </TabsTrigger>
                <TabsTrigger value="groom" className="text-xs sm:text-sm">
                  Chú rể
                </TabsTrigger>
                <TabsTrigger value="theme" className="text-xs sm:text-sm">
                  Giao diện
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Basic Info */}
              <TabsContent value="basic" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên thiệp cưới *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: Đám cưới Minh & Linh"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weddingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày cưới *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngôn ngữ</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn ngôn ngữ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Tab 2: Bride Info */}
              <TabsContent value="bride" className="space-y-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-pink-500" />
                  <span className="font-medium">Thông tin cô dâu</span>
                </div>

                <FormField
                  control={form.control}
                  name="brideName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyễn Ngọc Linh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brideShortBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới thiệu ngắn</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Vài dòng giới thiệu về cô dâu..."
                          className="resize-none"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brideFamilyInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thông tin gia đình</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Con ông/bà: Nguyễn Văn A & Trần Thị B..."
                          className="resize-none"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Tab 3: Groom Info */}
              <TabsContent value="groom" className="space-y-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Thông tin chú rể</span>
                </div>

                <FormField
                  control={form.control}
                  name="groomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên *</FormLabel>
                      <FormControl>
                        <Input placeholder="Trần Minh Tuấn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groomShortBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới thiệu ngắn</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Vài dòng giới thiệu về chú rể..."
                          className="resize-none"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groomFamilyInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thông tin gia đình</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Con ông/bà: Trần Văn C & Lê Thị D..."
                          className="resize-none"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Tab 4: Theme Settings */}
              <TabsContent value="theme" className="space-y-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <span className="font-medium">Giao diện & Chủ đề</span>
                </div>

                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mẫu thiệp *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mẫu thiệp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {weddingTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.nameVi}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Màu chính</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              className="w-12 h-10 p-1 cursor-pointer"
                              {...field}
                            />
                            <Input
                              type="text"
                              placeholder="#F4B6C2"
                              value={field.value}
                              onChange={field.onChange}
                              className="flex-1"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="secondaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Màu phụ</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              className="w-12 h-10 p-1 cursor-pointer"
                              {...field}
                            />
                            <Input
                              type="text"
                              placeholder="#F7E7CE"
                              value={field.value}
                              onChange={field.onChange}
                              className="flex-1"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fontHeading"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font tiêu đề</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {FONT_OPTIONS.map((font) => (
                              <SelectItem key={font.value} value={font.value}>
                                {font.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fontBody"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font nội dung</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {FONT_OPTIONS.map((font) => (
                              <SelectItem key={font.value} value={font.value}>
                                {font.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="backgroundMusic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Music className="w-4 h-4" />
                        Nhạc nền
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn nhạc nền" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MUSIC_OPTIONS.map((music) => (
                            <SelectItem key={music.value} value={music.value}>
                              {music.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              {activeTab !== "basic" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPrevTab}
                  className="flex-1"
                >
                  Quay lại
                </Button>
              )}

              {activeTab === "basic" && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Hủy
                </Button>
              )}

              {activeTab !== "theme" ? (
                <Button
                  type="button"
                  variant="gold"
                  onClick={goToNextTab}
                  className="flex-1"
                >
                  Tiếp theo
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="gold"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Tạo thiệp cưới
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
