// Wedding Card Component - Displays individual wedding in list
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, Edit, MoreVertical, Globe, GlobeLock, Trash2, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Wedding } from "@/types/wedding";

interface WeddingCardProps {
  wedding: Wedding;
  index?: number;
  onPublishToggle: (id: string, publish: boolean) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export const WeddingCard = ({ 
  wedding, 
  index = 0, 
  onPublishToggle, 
  onDelete,
  onDuplicate 
}: WeddingCardProps) => {
  const eventDate = wedding.events[0]?.date;
  const formattedDate = eventDate 
    ? new Date(eventDate).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Chưa đặt ngày";

  const confirmedGuests = wedding.guests.filter(g => g.attendance === 'confirmed').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <Heart className="w-8 h-8 text-primary fill-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold truncate">
            {wedding.bride.fullName || "Cô dâu"} & {wedding.groom.fullName || "Chú rể"}
          </h3>
          <p className="text-sm text-muted-foreground mb-1.5 truncate">
            {formattedDate}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant={wedding.status === "published" ? "default" : "secondary"}
              className={wedding.status === "published" 
                ? "bg-green-100 text-green-700 hover:bg-green-100" 
                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
              }
            >
              {wedding.status === "published" ? (
                <><Globe className="w-3 h-3 mr-1" /> Đã xuất bản</>
              ) : (
                <><GlobeLock className="w-3 h-3 mr-1" /> Bản nháp</>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {wedding.theme.template}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="text-center">
            <p className="font-semibold">{wedding.viewCount}</p>
            <p className="text-muted-foreground text-xs">Lượt xem</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{confirmedGuests}</p>
            <p className="text-muted-foreground text-xs">Khách xác nhận</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/wedding/${wedding.slug}`} target="_blank">
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dashboard/wedding/${wedding.id}/edit`}>
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onPublishToggle(wedding.id, wedding.status !== 'published')}>
                {wedding.status === 'published' ? (
                  <><GlobeLock className="w-4 h-4 mr-2" /> Hủy xuất bản</>
                ) : (
                  <><Globe className="w-4 h-4 mr-2" /> Xuất bản</>
                )}
              </DropdownMenuItem>
              {onDuplicate && (
                <DropdownMenuItem onClick={() => onDuplicate(wedding.id)}>
                  <Copy className="w-4 h-4 mr-2" /> Nhân đôi
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" /> Xuất danh sách khách
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(wedding.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Xóa thiệp cưới
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};
