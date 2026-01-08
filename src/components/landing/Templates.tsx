import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEMPLATES_LIST } from "@/lib/utils";
import { motion } from "framer-motion";

const styleLabels: Record<string, string> = {
  classic: "Cổ điển",
  modern: "Hiện đại",
  rustic: "Mộc mạc",
  romantic: "Lãng mạn",
  minimalist: "Tối giản",
  luxury: "Xa hoa",
};

const TemplatesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTemplatePage = location.pathname.startsWith("/templates");

  return (
    <main className="min-h-screen bg-background">
      {isTemplatePage && (
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Quay Lại
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-elegant text-sm">6 Mẫu Thiệp Premium</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
            Bộ Sưu Tập Thiệp Cưới
            <span className="text-gradient-gold"> Cao Cấp</span>
          </h1>
          <p className="text-muted-foreground font-elegant text-lg">
            Mỗi mẫu thiệp được thiết kế tinh tế với bảng màu và phong cách riêng
            biệt, phù hợp với mọi phong cách cưới
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES_LIST.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/templates/${template.id}`)}
            >
              <div
                className={`relative aspect-[3/4] rounded-2xl bg-gradient-to-b ${template.color} overflow-hidden border-2 border-border group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-elegant`}
              >
                {/* Template Preview Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 rounded-tl-lg border-current opacity-20" />
                  <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 rounded-tr-lg border-current opacity-20" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 rounded-bl-lg border-current opacity-20" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 rounded-br-lg border-current opacity-20" />

                  {/* Heart Icon */}
                  <div
                    className={`w-16 h-16 rounded-full ${template.accent} mb-6 flex items-center justify-center`}
                  >
                    <Heart
                      className="w-8 h-8"
                      style={{ color: `hsl(${template.primaryHsl})` }}
                      fill={`hsl(${template.primaryHsl})`}
                    />
                  </div>

                  {/* Mock Names */}
                  <p
                    className={`font-display text-xl mb-2 ${
                      template.isDark ? "text-white" : "text-foreground"
                    }`}
                  >
                    Minh & Hương
                  </p>
                  <div
                    className="w-16 h-0.5 mx-auto my-3 rounded-full"
                    style={{ backgroundColor: `hsl(${template.primaryHsl})` }}
                  />
                  <p
                    className={`text-sm opacity-70 font-elegant ${
                      template.isDark ? "text-white" : "text-foreground"
                    }`}
                  >
                    20.12.2024
                  </p>

                  {/* Style Badge */}
                  <div
                    className={`absolute bottom-8 px-4 py-2 rounded-full text-xs font-medium ${
                      template.accent
                    } ${template.isDark ? "text-white" : ""}`}
                    style={{
                      color: template.isDark
                        ? "white"
                        : `hsl(${template.primaryHsl})`,
                    }}
                  >
                    {styleLabels[template.style] || template.style}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="gold" size="sm" className="shadow-lg">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem Chi Tiết
                  </Button>
                </div>
              </div>

              {/* Template Info */}
              <div className="mt-5 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-elegant">
                  {template.description}
                </p>

                {/* Color Swatch */}
                <div className="flex justify-center gap-2 mt-3">
                  <div
                    className="w-5 h-5 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: `hsl(${template.primaryHsl})` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TemplatesPage;
