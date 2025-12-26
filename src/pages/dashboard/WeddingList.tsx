import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, MoreHorizontal, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWeddingStore } from '@/stores/weddingStore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const WeddingList: React.FC = () => {
  const { weddings, isLoading, fetchWeddings } = useWeddingStore();

  useEffect(() => {
    fetchWeddings();
  }, [fetchWeddings]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge variant="published">Đã xuất bản</Badge>;
      case 'draft': return <Badge variant="draft">Bản nháp</Badge>;
      case 'archived': return <Badge variant="archived">Đã lưu trữ</Badge>;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Thiệp cưới của bạn</h1>
          <p className="text-muted-foreground mt-1">Quản lý và chỉnh sửa các thiệp cưới</p>
        </div>
        <Link to="/dashboard/weddings/new">
          <Button variant="gold" className="gap-2">
            <Plus className="w-4 h-4" />
            Tạo thiệp mới
          </Button>
        </Link>
      </div>

      {weddings.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose flex items-center justify-center">
              <Plus className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-display text-2xl">Chưa có thiệp cưới nào</h2>
            <p className="text-muted-foreground">
              Bắt đầu tạo thiệp cưới đầu tiên của bạn để chia sẻ với gia đình và bạn bè.
            </p>
            <Link to="/dashboard/weddings/new">
              <Button variant="gold" size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Tạo thiệp cưới đầu tiên
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {weddings.filter(w => w.status !== 'archived').map((wedding) => (
            <Card key={wedding.id} hover className="overflow-hidden">
              <div className="h-40 bg-gradient-rose relative">
                {wedding.gallery[0] && (
                  <img src={wedding.gallery[0].url} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute top-3 right-3">{getStatusBadge(wedding.status)}</div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{wedding.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(wedding.weddingDate), 'dd MMMM, yyyy', { locale: vi })}
                </div>
                {wedding.venue && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {wedding.venue}
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Link to={`/w/${wedding.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Eye className="w-4 h-4" /> Xem
                    </Button>
                  </Link>
                  <Link to={`/dashboard/weddings/${wedding.id}`} className="flex-1">
                    <Button variant="rose" size="sm" className="w-full gap-2">
                      <Edit className="w-4 h-4" /> Sửa
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeddingList;
