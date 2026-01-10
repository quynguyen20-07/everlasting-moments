import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  GlobeLock,
  Heart,
  Users,
  Calendar,
  Image,
  Wallet,
  Palette,
  Settings,
  Loader2,
  Check,
  BookHeart,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeddingEventManager } from "@/components/wedding/WeddingEventManager";
import { LoveStoryManager } from "@/components/wedding/LoveStoryManager";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useWeddingStore } from "@/stores/weddingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
// Wedding Edit Page - Full edit page with sections and autosave
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
    currentWedding,
    isLoading,
    fetchWedding,
    updateWedding,
    updateBride,
    updateGroom,
    publishWedding,
    unpublishWedding,
  } = useWeddingStore();

  const [activeTab, setActiveTab] = useState("couple");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const brideGroomForm = useForm<BrideGroomFormData>({
    resolver: zodResolver(brideGroomSchema),
    defaultValues: {
      bride: { fullName: "", shortBio: "", familyInfo: "" },
      groom: { fullName: "", shortBio: "", familyInfo: "" },
    },
  });

  useEffect(() => {
    if (id) {
      fetchWedding(id);
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

  const handleSaveBrideGroom = async (data: BrideGroomFormData) => {
    if (!id || !currentWedding) return;

    setIsSaving(true);
    try {
      // Update bride and groom in parallel
      await Promise.all([
        updateBride(id, {
          fullName: data.bride.fullName,
          shortBio: data.bride.shortBio,
          familyInfo: data.bride.familyInfo,
        }),
        updateGroom(id, {
          fullName: data.groom.fullName,
          shortBio: data.groom.shortBio,
          familyInfo: data.groom.familyInfo,
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

  const handleManualSave = async () => {
    if (!id || !currentWedding) return;

    // If on couple tab, save bride/groom form
    if (activeTab === "couple") {
      const isValid = await brideGroomForm.trigger();
      if (isValid) {
        await handleSaveBrideGroom(brideGroomForm.getValues());
      }
      return;
    }

    // Otherwise save general wedding info
    setIsSaving(true);
    try {
      await updateWedding(id, { title: currentWedding.title });
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
        await unpublishWedding(currentWedding.id);
        toast({
          title: "Đã hủy xuất bản",
          description: "Thiệp cưới đã chuyển về nháp.",
        });
      } else {
        await publishWedding(currentWedding.id);
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

  if (isLoading || !currentWedding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const tabItems = [
    { value: "couple", label: "Cô dâu & Chú rể", icon: Heart },
    { value: "lovestory", label: "Câu chuyện", icon: BookHeart },
    { value: "events", label: "Sự kiện", icon: Calendar },
    { value: "gallery", label: "Thư viện ảnh", icon: Image },
    {
      value: "guests",
      label: "Khách mời",
      icon: Users,
      link: `/dashboard/weddings/${id}/guests`,
    },
    {
      value: "wishes",
      label: "Lời chúc",
      icon: Heart,
      link: `/dashboard/weddings/${id}/wishes`,
    },
    { value: "gifts", label: "Mừng cưới", icon: Wallet },
    { value: "theme", label: "Giao diện", icon: Palette },
    { value: "settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl py-6 px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/weddings")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display text-2xl font-semibold">
                {currentWedding.title}
              </h1>
              {lastSaved && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  Đã lưu lúc {lastSaved.toLocaleTimeString("vi-VN")}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/weddings/${currentWedding.slug}`} target="_blank">
                <Eye className="w-4 h-4 mr-2" /> Xem trước
              </Link>
            </Button>
            <Button
              variant={
                currentWedding.status === "published" ? "outline" : "gold"
              }
              size="sm"
              onClick={handlePublishToggle}
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
              variant="outline"
              size="sm"
              onClick={handleManualSave}
              disabled={isSaving}
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

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            const tab = tabItems.find((t) => t.value === val);
            if (tab?.link) {
              navigate(tab.link);
            } else {
              setActiveTab(val);
            }
          }}
          className="space-y-6"
        >
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card border border-border p-1 rounded-lg">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Couple Tab */}
          <TabsContent value="couple">
            <Form {...brideGroomForm}>
              <form
                onSubmit={brideGroomForm.handleSubmit(handleSaveBrideGroom)}
                className="grid gap-6 md:grid-cols-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-primary" />{" "}
                      Thông tin Cô dâu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={brideGroomForm.control}
                      name="bride.fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Giới thiệu</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
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
                          <FormLabel>Thông tin gia đình</FormLabel>
                          <FormControl>
                            <Textarea rows={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-primary" />{" "}
                      Thông tin Chú rể
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={brideGroomForm.control}
                      name="groom.fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Giới thiệu</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
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
                          <FormLabel>Thông tin gia đình</FormLabel>
                          <FormControl>
                            <Textarea rows={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    variant="gold"
                    disabled={isSaving}
                    className="w-full sm:w-auto"
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
          </TabsContent>

          {/* Love Story Tab */}
          <TabsContent value="lovestory">
            <LoveStoryManager
              weddingId={currentWedding.id}
              stories={currentWedding.weddingDetail?.loveStories || []}
            />
          </TabsContent>

          <TabsContent value="events">
            <WeddingEventManager weddingId={currentWedding.id} />
          </TabsContent>

          {/* Other tabs - coming soon */}
          {["gallery", "gifts", "theme", "settings"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Tính năng đang được phát triển...
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default WeddingEdit;
