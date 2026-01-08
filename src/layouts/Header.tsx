import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/uiStore";
import { Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { setSidebarOpen } = useUIStore();

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <span className="font-display text-lg font-semibold">True loves</span>
        </Link>
        <div className="w-10" />
      </div>
    </header>
  );
};
