import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface HeaderNavigationProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
}

const HeaderNavigation = ({ colors }: HeaderNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-primary/10 transition-colors"
          style={{ color: colors.text }}
          onClick={() => navigate("/templates")}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay Lại
        </Button>
      </div>
    </div>
  );
};

export default HeaderNavigation;
