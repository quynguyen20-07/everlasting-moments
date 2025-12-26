import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Users, Palette, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-champagne" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-rose/40 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-champagne-dark/50 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10 px-4 py-20 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent shadow-lg mb-8">
              <Heart className="w-10 h-10 text-accent-foreground" />
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6 leading-tight">
              Thiệp Cưới <br />
              <span className="text-accent">Trực Tuyến</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Tạo thiệp cưới đẹp, sang trọng và chia sẻ với người thân yêu chỉ trong vài phút. 
              Hoàn toàn miễn phí và dễ dàng sử dụng.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-2 min-w-[200px]">
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="hero-outline" size="xl" className="min-w-[200px]">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-display text-4xl text-foreground mb-4">Tính năng nổi bật</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Mọi thứ bạn cần để tạo một thiệp cưới hoàn hảo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'Thiết kế đẹp mắt', desc: 'Nhiều mẫu thiệp sang trọng, hiện đại cho bạn lựa chọn' },
              { icon: Users, title: 'Quản lý khách mời', desc: 'Theo dõi RSVP và quản lý danh sách khách dễ dàng' },
              { icon: Palette, title: 'Tùy biến linh hoạt', desc: 'Thay đổi màu sắc, font chữ theo phong cách riêng' },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background border shadow-soft text-center card-hover animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose mb-6">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t text-center text-muted-foreground">
        <p>© 2024 Wedding Invitation. Made with ❤️</p>
      </footer>
    </div>
  );
};

export default Index;
