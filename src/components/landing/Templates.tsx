import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { TEMPLATES_LIST } from "@/lib/utils";
import { motion } from "framer-motion";

const TemplatesPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
            Tất Cả Mẫu Thiết Kế
            <span className="text-gradient-gold"> Có Sẵn</span>
          </h1>
          <p className="text-muted-foreground font-elegant text-lg">
            Khám phá {TEMPLATES_LIST.length} mẫu thiết kế và chọn phong cách yêu
            thích của bạn
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLATES_LIST.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/templates/${template.id}`)}
            >
              <div
                className={`relative aspect-[3/4] rounded-2xl bg-gradient-to-b ${template.color} overflow-hidden border border-border group-hover:border-primary/30 transition-all duration-300 group-hover:shadow-elegant`}
              >
                {/* Template Preview Content */}
                <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
                  <div
                    className={`w-20 h-20 rounded-full ${template.accent} mb-6 flex items-center justify-center`}
                  >
                    <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm" />
                  </div>
                  <div className="w-32 h-3 rounded bg-foreground/10 mb-3" />
                  <div className="w-24 h-2 rounded bg-foreground/5 mb-6" />
                  <div className="space-y-2 w-full px-4">
                    <div className="w-full h-2 rounded bg-foreground/5" />
                    <div className="w-3/4 h-2 rounded bg-foreground/5 mx-auto" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="gold" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem Chi Tiết
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-display text-lg font-semibold">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TemplatesPage;
