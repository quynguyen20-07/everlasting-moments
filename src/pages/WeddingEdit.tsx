import {
  ArrowLeft,
  BookHeart,
  Calendar,
  Check,
  Eye,
  Globe,
  GlobeLock,
  Heart,
  Image,
  Loader2,
  Save,
} from "lucide-react";
import {
  useUpdateBride,
  useUpdateGroom,
  useUpdateWedding,
  useUpdateWeddingStatus,
  useWedding,
} from "@/hooks";
import {
  useWeddingImages,
  useReplaceWeddingImages,
} from "@/hooks/useImages";
import { Image as ImageType } from "@/types/api.generated";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeddingEventManager } from "@/components/wedding/WeddingEventManager";
import { LoveStoryManager } from "@/components/wedding/LoveStoryManager";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { FileUpload } from "@/components/upload/FileUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";

// Form schemas
const brideGroomSchema = z.object({
  bride: z.object({
    fullName: z.string().min(1, "Vui lòng nhập tên cô dâu").max(50),
    shortBio: z.string().max(500).optional(),
    familyInfo: z.string().max(500).optional(),
  }),
  groom: z.object({
    fullName: z.string().min(1, "Vui lòng nhập tên chú rể").max(50),
    shortBio: z.string().max(500).optional(),
    familyInfo: z.string().max(500).optional(),
  }),
});

type BrideGroomFormData = z.infer<typeof brideGroomSchema>;

const WeddingEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: currentWedding,
    isFetching: loading,
    refetch: fetchWedding,
  } = useWedding(id);

  const { mutateAsync: updateWedding } = useUpdateWedding();
  const { mutateAsync: updateBride } = useUpdateBride();
  const { mutateAsync: updateGroom } = useUpdateGroom();
  const { mutateAsync: updateWeddingStatus } = useUpdateWeddingStatus();

  const [activeTab, setActiveTab] = useState("info");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [galleryImages, setGalleryImages] = useState<ImageType[]>([]);

  const { data: imagesData } = useWeddingImages(id);
  const { mutateAsync: replaceImages } = useReplaceWeddingImages(id || "");

  const brideGroomForm = useForm<BrideGroomFormData>({
    resolver: zodResolver(brideGroomSchema),
    defaultValues: {
      bride: { fullName: "", shortBio: "", familyInfo: "" },
      groom: { fullName: "", shortBio: "", familyInfo: "" },
    },
  });

  useEffect(() => {
    if (id) {
      fetchWedding();
    }
  }, [id, fetchWedding]);

  useEffect(() => {
    if (currentWedding?.weddingDetail) {
      const { bride, groom } = currentWedding.weddingDetail;
      brideGroomForm.reset({
        bride: {
          fullName: bride?.fullName || "",
          shortBio: bride?.shortBio || "",
          familyInfo: bride?.familyInfo || "",
        },
        groom: {
          fullName: groom?.fullName || "",
          shortBio: groom?.shortBio || "",
          familyInfo: groom?.familyInfo || "",
        },
      });
    }
  }, [currentWedding, brideGroomForm]);

  useEffect(() => {
    if (imagesData) {
      setGalleryImages(imagesData);
    }
  }, [imagesData]);

  const handleSaveBrideGroom = async (data: BrideGroomFormData) => {
    if (!id || !currentWedding) return;

    setIsSaving(true);
    try {
      const brideId = currentWedding.weddingDetail?.bride?.id;
      const groomId = currentWedding.weddingDetail?.groom?.id;

      if (!brideId || !groomId) {
        toast({
          title: "Lỗi",
          description: "Không tìm thấy thông tin cô dâu/chú rể.",
          variant: "destructive",
        });
        return;
      }

      await Promise.all([
        updateBride({
          id: brideId,
          bride: {
            fullName: data.bride.fullName,
            shortBio: data.bride.shortBio,
            familyInfo: data.bride.familyInfo,
          },
        }),
        updateGroom({
          id: groomId,
          groom: {
            fullName: data.groom.fullName,
            shortBio: data.groom.shortBio,
            familyInfo: data.groom.familyInfo,
          },
        }),
      ]);

      setLastSaved(new Date());
      toast({
        title: "Đã lưu",
        description: "Thông tin cô dâu & chú rể đã được cập nhật.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGallery = async () => {
    if (!id) return;

    setIsSaving(true);
    try {
      await replaceImages({
        images: galleryImages.map((img, index) => ({
          url: img.url,
          order: img.order ?? index,
        })),
      });

      setLastSaved(new Date());
      toast({
        title: "Đã lưu",
        description: "Thư viện ảnh đã được cập nhật.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu thư viện ảnh.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualSave = async () => {
    if (!id || !currentWedding) return;

    if (activeTab === "info") {
      const isValid = await brideGroomForm.trigger();
      if (isValid) {
        await handleSaveBrideGroom(brideGroomForm.getValues());
      }
      return;
    }

    if (activeTab === "gallery") {
      await handleSaveGallery();
      return;
    }

    setIsSaving(true);
    try {
      await updateWedding({ id, updates: { title: currentWedding.title } });
      setLastSaved(new Date());
      toast({
        title: "Đã lưu",
        description: "Thay đổi đã được lưu thành công.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    if (!currentWedding) return;
    try {
      if (currentWedding.status === "published") {
        await updateWeddingStatus({ id: currentWedding.id, status: "draft" });
        toast({
          title: "Đã hủy xuất bản",
          description: "Thiệp cưới đã chuyển về nháp.",
        });
      } else {
        await updateWeddingStatus({
          id: currentWedding.id,
          status: "published",
        });
        toast({
          title: "Đã xuất bản",
          description: "Thiệp cưới đã được công khai.",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF8F5]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const tabs = [
    { id: "info", label: "Thông tin", icon: Heart },
    { id: "story", label: "Câu chuyện", icon: BookHeart },
    { id: "events", label: "Sự kiện", icon: Calendar },
    { id: "gallery", label: "Thư viện", icon: Image },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Top Navigation */}
      <header className="bg-white border-b border-[#E8DDD5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C4A484] fill-[#C4A484]" />
              <span className="font-display text-lg font-semibold text-[#5D4A3C]">
                True loves
              </span>
            </Link>

            {/* Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm text-[#8B7355] hover:text-[#5D4A3C] transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/templates"
                className="text-sm text-[#8B7355] hover:text-[#5D4A3C] transition-colors"
              >
                Mẫu thiệp
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-[#8B7355] hover:text-[#5D4A3C] transition-colors"
              >
                Bảng giá
              </Link>
            </nav>

            {/* Logout */}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white px-5"
              onClick={() => navigate("/auth")}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        {currentWedding && (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/dashboard/weddings")}
                  className="p-2 rounded-full hover:bg-[#E8DDD5] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-[#5D4A3C]" />
                </button>
                <div>
                  <h1 className="font-display text-xl font-semibold text-[#5D4A3C]">
                    {currentWedding.title || "My Wedding"}
                  </h1>
                  {lastSaved && (
                    <span className="text-xs text-[#8B7355] flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-600" />
                      Đã lưu lúc {lastSaved.toLocaleTimeString("vi-VN")}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-full border-[#D4C4B5] text-[#5D4A3C] hover:bg-[#E8DDD5]"
                >
                  <Link to={`/weddings/${currentWedding.slug}`} target="_blank">
                    <Eye className="w-4 h-4 mr-2" /> Xem trước
                  </Link>
                </Button>
                <Button
                  size="sm"
                  onClick={handlePublishToggle}
                  className={cn(
                    "rounded-full",
                    currentWedding.status === "published"
                      ? "bg-[#E8DDD5] text-[#5D4A3C] hover:bg-[#D4C4B5]"
                      : "bg-[#C4A484] text-white hover:bg-[#A68B6A]",
                  )}
                >
                  {currentWedding.status === "published" ? (
                    <>
                      <GlobeLock className="w-4 h-4 mr-2" /> Hủy xuất bản
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 mr-2" /> Xuất bản
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={handleManualSave}
                  disabled={isSaving}
                  className="rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A]"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Lưu
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Tab Navigation   */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-xs sm:text-sm"
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content - Sử dụng TabsContent */}
              <TabsContent value="info" className="mt-0">
                <div className="bg-white rounded-[20px] shadow-sm border border-[#E8DDD5] p-6 sm:p-8">
                  <Form {...brideGroomForm}>
                    <form
                      onSubmit={brideGroomForm.handleSubmit(
                        handleSaveBrideGroom,
                      )}
                      className="grid gap-8 md:grid-cols-2"
                    >
                      {/* Bride Section */}
                      <div className="space-y-5">
                        <h2 className="font-display text-lg font-semibold text-[#5D4A3C] flex items-center gap-2">
                          <Heart className="w-5 h-5 text-[#C4A484] fill-[#C4A484]" />
                          Cô dâu
                        </h2>
                        <FormField
                          control={brideGroomForm.control}
                          name="bride.fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                                Họ và tên
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] shadow-sm"
                                  placeholder="Nhập họ tên cô dâu"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={brideGroomForm.control}
                          name="bride.shortBio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                                Giới thiệu ngắn
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={3}
                                  {...field}
                                  className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] shadow-sm resize-none"
                                  placeholder="Đôi nét về cô dâu..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={brideGroomForm.control}
                          name="bride.familyInfo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                                Thông tin gia đình
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={2}
                                  {...field}
                                  className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] shadow-sm resize-none"
                                  placeholder="Thông tin gia đình cô dâu..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Groom Section */}
                      <div className="space-y-5">
                        <h2 className="font-display text-lg font-semibold text-[#5D4A3C] flex items-center gap-2">
                          <Heart className="w-5 h-5 text-[#C4A484] fill-[#C4A484]" />
                          Chú rể
                        </h2>
                        <FormField
                          control={brideGroomForm.control}
                          name="groom.fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                                Họ và tên
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] shadow-sm"
                                  placeholder="Nhập họ tên chú rể"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={brideGroomForm.control}
                          name="groom.shortBio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                                Giới thiệu ngắn
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={3}
                                  {...field}
                                  className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] shadow-sm resize-none"
                                  placeholder="Đôi nét về chú rể..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={brideGroomForm.control}
                          name="groom.familyInfo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#5D4A3C] text-sm font-medium">
                                Thông tin gia đình
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={2}
                                  {...field}
                                  className="rounded-xl border-[#E8DDD5] bg-[#FAF8F5] focus:border-[#C4A484] focus:ring-[#C4A484] shadow-sm resize-none"
                                  placeholder="Thông tin gia đình chú rể..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A] px-8"
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          Lưu thông tin cô dâu & chú rể
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="story" className="mt-0">
                <div className="bg-white rounded-[20px] shadow-sm border border-[#E8DDD5] p-6 sm:p-8">
                  <LoveStoryManager
                    weddingId={currentWedding.id}
                    stories={currentWedding.weddingDetail?.loveStories || []}
                  />
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <div className="bg-white rounded-[20px] shadow-sm border border-[#E8DDD5] p-6 sm:p-8">
                  <WeddingEventManager weddingId={currentWedding.id} />
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="mt-0">
                <div className="bg-white rounded-[20px] shadow-sm border border-[#E8DDD5] p-6 sm:p-8">
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-[#5D4A3C] flex items-center gap-2 mb-1">
                        <Image className="w-5 h-5 text-[#C4A484]" />
                        Thư viện ảnh
                      </h2>
                      <p className="text-sm text-[#8B7355]">
                        Tải lên và quản lý ảnh cho thiệp cưới của bạn
                      </p>
                    </div>

                    <FileUpload
                      mode="multiple"
                      accept="image/*"
                      maxSizeMB={10}
                      label="Tải ảnh lên"
                      initialUrls={galleryImages.map((img) => img.url)}
                      onUploadSuccess={(urls) => {
                        const newImages = urls.map((url, index) => ({
                          id: `new-${Date.now()}-${index}`,
                          url,
                          weddingId: id || "",
                          order: galleryImages.length + index,
                        }));
                        setGalleryImages((prev) => [...prev, ...newImages]);
                        toast({
                          title: "Đã thêm",
                          description: `${urls.length} ảnh đã được thêm vào danh sách chờ lưu`,
                        });
                      }}
                      onDelete={(url) => {
                        setGalleryImages((prev) =>
                          prev.filter((img) => img.url !== url),
                        );
                        toast({
                          title: "Đã xóa",
                          description: "Ảnh đã được xóa khỏi danh sách chờ lưu",
                        });
                      }}
                    />

                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={handleSaveGallery}
                        disabled={isSaving}
                        className="rounded-full bg-[#C4A484] text-white hover:bg-[#A68B6A] px-8"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Lưu thư viện
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E8DDD5] py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-[#C4A484] fill-[#C4A484]" />
            <span className="font-display text-sm font-semibold text-[#5D4A3C]">
              True loves
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-[#8B7355] mb-3">
            <Link to="/" className="hover:text-[#5D4A3C]">
              Trang chủ
            </Link>
            <span>•</span>
            <Link to="/templates" className="hover:text-[#5D4A3C]">
              Mẫu thiệp
            </Link>
            <span>•</span>
            <Link to="/pricing" className="hover:text-[#5D4A3C]">
              Bảng giá
            </Link>
          </div>
          <p className="text-xs text-[#A89B8C]">
            © 2024 True loves. Thiết kế với tình yêu ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingEdit;
