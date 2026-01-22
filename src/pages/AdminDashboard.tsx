import {
  Clock,
  Eye,
  Globe,
  Heart,
  MoreVertical,
  Search,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
// Admin Dashboard Page - Overview and read-only management
import { useWeddings } from "@/hooks";
import { useState } from "react";

// Mock admin stats - in real app, these would come from an admin API
const mockAdminStats = {
  totalWeddings: 156,
  publishedWeddings: 89,
  totalGuests: 4520,
  totalRSVPs: 2830,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: weddings, isLoading, refetch: fetchWedding } = useWeddings();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredWeddings = weddings.filter(
    (w) =>
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const publishedCount = weddings.filter(
    (w) => w.status === "published",
  ).length;
  const draftCount = weddings.filter((w) => w.status === "draft").length;

  const stats = [
    {
      label: "Tổng đám cưới",
      value: weddings.length,
      icon: Heart,
      color: "text-pink-600",
      bg: "bg-pink-100",
      trend: "+12%",
    },
    {
      label: "Đã xuất bản",
      value: publishedCount,
      icon: Globe,
      color: "text-green-600",
      bg: "bg-green-100",
      trend: "+8%",
    },
    {
      label: "Tổng khách mời",
      value: mockAdminStats.totalGuests.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "+15%",
    },
    {
      label: "Xác nhận RSVP",
      value: mockAdminStats.totalRSVPs.toLocaleString(),
      icon: UserCheck,
      color: "text-purple-600",
      bg: "bg-purple-100",
      trend: "+23%",
    },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-semibold">
          Bảng điều khiển Quản trị
        </h1>
        <p className="text-muted-foreground">
          Tổng quan hệ thống và quản lý đám cưới
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold mt-3">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="weddings">Danh sách đám cưới</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Weddings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Đám cưới gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weddings.slice(0, 5).map((wedding) => (
                  <div
                    key={wedding.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{wedding.title}</p>
                        <p className="text-sm text-muted-foreground">
                          /{wedding.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          wedding.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {wedding.status === "published"
                          ? "Đã xuất bản"
                          : "Nháp"}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {wedding.viewCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weddings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tất cả đám cưới (Chỉ xem)</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm theo tiêu đề hoặc slug..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Ngày cưới</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-center">Lượt xem</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Đang tải...
                        </TableCell>
                      </TableRow>
                    ) : filteredWeddings.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Không tìm thấy đám cưới nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWeddings.map((wedding) => (
                        <TableRow key={wedding.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4 text-primary" />
                              <span className="font-medium">
                                {wedding.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            /{wedding.slug}
                          </TableCell>
                          <TableCell>
                            {wedding.createdAt
                              ? formatDate(wedding.createdAt)
                              : "-"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                wedding.status === "published"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {wedding.status === "published"
                                ? "Đã xuất bản"
                                : "Nháp"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {wedding.viewCount}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    window.open(
                                      `/weddings/${wedding.slug}`,
                                      "_blank",
                                    )
                                  }
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Xem trang công khai
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 text-sm text-muted-foreground text-right">
                Hiển thị {filteredWeddings.length} / {weddings.length} đám cưới
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
