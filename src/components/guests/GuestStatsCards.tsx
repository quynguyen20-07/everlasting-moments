// Guest Statistics Cards Component
import { Users, UserCheck, Clock, UserX, UsersRound } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { GuestStats } from '@/types/graphql';
import { motion } from 'framer-motion';

interface GuestStatsCardsProps {
  stats: GuestStats | null;
  isLoading?: boolean;
}

const statItems = [
  {
    key: 'total',
    label: 'Tổng khách mời',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    key: 'confirmed',
    label: 'Xác nhận tham dự',
    icon: UserCheck,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    key: 'pending',
    label: 'Chờ phản hồi',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  {
    key: 'declined',
    label: 'Không tham dự',
    icon: UserX,
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
  {
    key: 'totalGuests',
    label: 'Tổng số người',
    icon: UsersRound,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
];

export function GuestStatsCards({ stats, isLoading }: GuestStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-bold">
                    {isLoading ? (
                      <span className="inline-block w-8 h-6 bg-muted animate-pulse rounded" />
                    ) : (
                      stats?.[item.key as keyof GuestStats] ?? 0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
