import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  Users,
  Camera,
  MessageCircle,
  Gift,
  MapPin,
  Share2,
  Palette,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Love Story",
    description: "Share your beautiful journey together with a personalized timeline",
  },
  {
    icon: Calendar,
    title: "Event Timeline",
    description: "Display ceremony, reception, and all wedding events elegantly",
  },
  {
    icon: Users,
    title: "RSVP Management",
    description: "Collect responses and manage your guest list effortlessly",
  },
  {
    icon: Camera,
    title: "Photo Gallery",
    description: "Showcase your best moments with stunning photo albums",
  },
  {
    icon: MessageCircle,
    title: "Guest Wishes",
    description: "Let guests leave heartfelt messages and blessings",
  },
  {
    icon: Gift,
    title: "Gift Registry",
    description: "Share bank details and gift preferences with QR codes",
  },
  {
    icon: MapPin,
    title: "Venue Maps",
    description: "Help guests find their way with integrated location maps",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share via social media, WhatsApp, or custom links",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Choose from elegant templates and customize colors",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Support for Vietnamese, English, and more languages",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-cream-dark/50">
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
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Everything You Need for the
            <span className="text-gradient-gold"> Perfect Invitation</span>
          </h2>
          <p className="text-muted-foreground font-elegant text-lg">
            Our platform provides all the tools to create a memorable digital wedding experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-elegant transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
