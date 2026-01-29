import {
  MoreVertical,
  Edit,
  Trash2,
  Search,
  Download,
  UserPlus,
  Filter,
  UserCheck,
  Clock,
  UserX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Guest Table Component with filters and actions
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { downloadGuestsCsv } from "@/lib/api/guest"; // Function removed
const downloadGuestsCsv = (data: any[]) => {
  const content = "data:text/csv;charset=utf-8," +
    "Họ tên,Email,Số điện thoại,Số người,Trạng thái\n" +
    data.map(g => `${g.fullName},${g.email || ''},${g.phone || ''},${g.numberOfGuests},${g.attendanceStatus}`).join("\n");
  const encodedUri = encodeURI(content);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "guests.csv");
  document.body.appendChild(link);
  link.click();
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Guest } from "@/types/api.generated";
import { useState, useMemo } from "react";

interface GuestTableProps {
  guests: Guest[];
  isLoading?: boolean;
  onEdit?: (guest: Guest) => void;
  onDelete?: (guest: Guest) => void;
  onAdd?: () => void;
}

const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "confirmed", label: "Xác nhận" },
  { value: "pending", label: "Chờ phản hồi" },
  { value: "declined", label: "Từ chối" },
];

const RELATIONSHIP_OPTIONS = [
  { value: "all", label: "Tất cả quan hệ" },
  { value: "family", label: "Gia đình" },
  { value: "friend", label: "Bạn bè" },
  { value: "colleague", label: "Đồng nghiệp" },
  { value: "other", label: "Khác" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <UserCheck className="w-3 h-3 mr-1" />
          Xác nhận
        </Badge>
      );
    case "declined":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <UserX className="w-3 h-3 mr-1" />
          Từ chối
        </Badge>
      );
    default:
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          <Clock className="w-3 h-3 mr-1" />
          Chờ phản hồi
        </Badge>
      );
  }
};

export function GuestTable({
  guests,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: GuestTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [relationshipFilter, setRelationshipFilter] = useState("all");

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      // Only show active guests
      if (!guest.isActive) return false;

      // Search filter
      const matchesSearch =
        guest.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.phone?.includes(searchQuery);

      // Status filter
      const matchesStatus =
        statusFilter === "all" || guest.attendanceStatus === statusFilter;



      return matchesSearch && matchesStatus;
    });
  }, [guests, searchQuery, statusFilter, relationshipFilter]);

  const handleExport = () => {
    downloadGuestsCsv(filteredGuests);
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Xuất CSV
          </Button>
          {onAdd && (
            <Button size="sm" onClick={onAdd}>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm khách
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Họ tên</TableHead>
              <TableHead>Liên hệ</TableHead>
              <TableHead className="text-center">Số người</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-2xl animate-spin" />
                    Đang tải...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredGuests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  Không tìm thấy khách mời nào
                </TableCell>
              </TableRow>
            ) : (
              filteredGuests.map((guest) => (
                <TableRow key={guest.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="font-medium">{guest.fullName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {guest.email && <p>{guest.email}</p>}
                      {guest.phone && (
                        <p className="text-muted-foreground">{guest.phone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {guest.numberOfGuests}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(guest.attendanceStatus)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(guest)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(guest)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground text-right">
        Hiển thị {filteredGuests.length} /{" "}
        {guests.filter((g) => g.isActive).length} khách mời
      </div>
    </div>
  );
}
