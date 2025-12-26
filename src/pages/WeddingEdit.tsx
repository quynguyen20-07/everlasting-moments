// Wedding Edit Page - Full edit page with sections and autosave
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Form schemas
const brideGroomSchema = z.object({
  bride: z.object({
    fullName: z.string().min(1, "Vui lòng nhập tên cô dâu").max(50),
    description: z.string().max(500).optional(),
    fatherName: z.string().max(50).optional(),
    motherName: z.string().max(50).optional(),
  }),
  groom: z.object({
    fullName: z.string().min(1, "Vui lòng nhập tên chú rể").max(50),
    description: z.string().max(500).optional(),
    fatherName: z.string().max(50).optional(),
    motherName: z.string().max(50).optional(),
  }),
});

type BrideGroomFormData = z.infer<typeof brideGroomSchema>;

const WeddingEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentWedding, isLoading, fetchWedding, updateWedding, updateStatus } = useWeddingStore();
  
  const [activeTab, setActiveTab] = useState("couple");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const brideGroomForm = useForm<BrideGroomFormData>({
    resolver: zodResolver(brideGroomSchema),
    defaultValues: {
      bride: { fullName: "", description: "", fatherName: "", motherName: "" },
      groom: { fullName: "", description: "", fatherName: "", motherName: "" },
    },
  });

  useEffect(() => {
    if (id) {
      fetchWedding(id);
    }
  }, [id, fetchWedding]);

  useEffect(() => {
    if (currentWedding) {
      brideGroomForm.reset({
        bride: {
          fullName: currentWedding.bride.fullName || "",
          description: currentWedding.bride.description || "",
          fatherName: currentWedding.bride.fatherName || "",
          motherName: currentWedding.bride.motherName || "",
        },
        groom: {
          fullName: currentWedding.groom.fullName || "",
          description: currentWedding.groom.description || "",
          fatherName: currentWedding.groom.fatherName || "",
          motherName: currentWedding.groom.motherName || "",
        },
      });
    }
  }, [currentWedding, brideGroomForm]);

  const handleManualSave = async () => {
    if (!id || !currentWedding) return;
    setIsSaving(true);
    try {
      const brideGroomData = brideGroomForm.getValues();
      await updateWedding(id, {
        bride: { ...currentWedding.bride, ...brideGroomData.bride },
        groom: { ...currentWedding.groom, ...brideGroomData.groom },
      });
      setLastSaved(new Date());
      toast({ title: "Đã lưu", description: "Thay đổi đã được lưu thành công." });
    } catch (error) {
      toast({ title: "Lỗi", description: "Không thể lưu.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    if (!currentWedding) return;
    try {
      const newStatus = currentWedding.status === 'published' ? 'draft' : 'published';
      await updateStatus(currentWedding.id, newStatus);
      toast({
        title: newStatus === 'published' ? "Đã xuất bản" : "Đã hủy xuất bản",
        description: newStatus === 'published' ? "Thiệp cưới đã được công khai." : "Thiệp cưới đã chuyển về nháp.",
      });
    } catch (error) {
      toast({ title: "Lỗi", description: "Không thể cập nhật trạng thái.", variant: "destructive" });
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
    { value: "events", label: "Sự kiện", icon: Calendar },
    { value: "gallery", label: "Thư viện ảnh", icon: Image },
    { value: "guests", label: "Khách mời", icon: Users },
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display text-2xl font-semibold">{currentWedding.name}</h1>
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
              <Link to={`/wedding/${currentWedding.slug}`} target="_blank">
                <Eye className="w-4 h-4 mr-2" /> Xem trước
              </Link>
            </Button>
            <Button
              variant={currentWedding.status === 'published' ? "outline" : "gold"}
              size="sm"
              onClick={handlePublishToggle}
            >
              {currentWedding.status === 'published' ? (
                <><GlobeLock className="w-4 h-4 mr-2" /> Hủy xuất bản</>
              ) : (
                <><Globe className="w-4 h-4 mr-2" /> Xuất bản</>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleManualSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Lưu</>}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card border border-border p-1 rounded-lg">
            {tabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 whitespace-nowrap">
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="couple">
            <Form {...brideGroomForm}>
              <form className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-primary" /> Thông tin Cô dâu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField control={brideGroomForm.control} name="bride.fullName" render={({ field }) => (
                      <FormItem><FormLabel>Họ và tên</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={brideGroomForm.control} name="bride.description" render={({ field }) => (
                      <FormItem><FormLabel>Giới thiệu</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary fill-primary" /> Thông tin Chú rể
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField control={brideGroomForm.control} name="groom.fullName" render={({ field }) => (
                      <FormItem><FormLabel>Họ và tên</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={brideGroomForm.control} name="groom.description" render={({ field }) => (
                      <FormItem><FormLabel>Giới thiệu</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </CardContent>
                </Card>
              </form>
            </Form>
          </TabsContent>

          {["events", "gallery", "guests", "gifts", "theme", "settings"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card><CardContent className="py-12 text-center text-muted-foreground">Tính năng đang được phát triển...</CardContent></Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default WeddingEdit;
