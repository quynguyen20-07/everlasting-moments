import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  {
    name: "Romantic Blush",
    description: "Soft pinks and elegant florals",
    color: "from-pink-100 to-rose-50",
    accent: "bg-pink-200",
  },
  {
    name: "Golden Hour",
    description: "Warm golds and champagne tones",
    color: "from-amber-50 to-yellow-50",
    accent: "bg-amber-200",
  },
  {
    name: "Garden Party",
    description: "Fresh greens and botanical vibes",
    color: "from-emerald-50 to-green-50",
    accent: "bg-emerald-200",
  },
  {
    name: "Classic Elegance",
    description: "Timeless black and white",
    color: "from-gray-50 to-slate-50",
    accent: "bg-gray-300",
  },
];

const Templates = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Templates
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Choose Your
            <span className="text-gradient-gold"> Style</span>
          </h2>
          <p className="text-muted-foreground font-elegant text-lg">
            Start with a beautifully designed template and make it uniquely yours
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div
                className={`relative aspect-[3/4] rounded-2xl bg-gradient-to-b ${template.color} overflow-hidden border border-border group-hover:border-primary/30 transition-all duration-300 group-hover:shadow-elegant`}
              >
                {/* Template Preview Content */}
                <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
                  <div className={`w-20 h-20 rounded-full ${template.accent} mb-6 flex items-center justify-center`}>
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
                    Preview
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline-elegant" size="lg" asChild>
            <Link to="/templates">
              View All Templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;
