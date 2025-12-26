import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  MapPin,
  Camera,
  MessageCircle,
  Music,
  Gift,
  Clock,
  ChevronDown,
  Play,
  Pause,
  Users,
  Mail,
  Phone,
  Send,
  Share2,
  Facebook,
  Instagram,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Demo couple data
const coupleData = {
  bride: {
    name: "Ngọc Linh",
    fullName: "Nguyễn Ngọc Linh",
    avatar: "/placeholder.svg",
  },
  groom: {
    name: "Minh Tuấn",
    fullName: "Trần Minh Tuấn",
    avatar: "/placeholder.svg",
  },
  weddingDate: new Date("2025-02-14T10:00:00"),
  story:
    "We first met at a coffee shop in Da Nang on a rainy afternoon. What started as a chance encounter became a beautiful journey of love, laughter, and countless memories together. After 5 years of being together, we are ready to take the next step and begin our forever.",
  events: [
    {
      name: "Lễ Vu Quy",
      date: "14/02/2025",
      time: "08:00",
      location: "Nhà Gái - 123 Đường ABC, Quận 1, TP.HCM",
      mapUrl: "#",
    },
    {
      name: "Lễ Thành Hôn",
      date: "14/02/2025",
      time: "10:00",
      location: "Nhà Trai - 456 Đường XYZ, Quận 7, TP.HCM",
      mapUrl: "#",
    },
    {
      name: "Tiệc Cưới",
      date: "14/02/2025",
      time: "18:00",
      location: "White Palace Convention Center",
      mapUrl: "#",
    },
  ],
  gallery: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  wishes: [
    {
      name: "Anh Khoa",
      message:
        "Chúc hai bạn trăm năm hạnh phúc, sớm có thiên thần nhỏ nhé! 💕",
      date: "2 days ago",
    },
    {
      name: "Hương Giang",
      message: "Congratulations! Wishing you both a lifetime of love and joy!",
      date: "3 days ago",
    },
    {
      name: "Thế Anh",
      message: "Happy wedding! May your love grow stronger each day! 🎊",
      date: "5 days ago",
    },
  ],
  bankInfo: {
    bride: {
      bank: "Vietcombank",
      account: "1234567890",
      name: "NGUYEN NGOC LINH",
    },
    groom: {
      bank: "Techcombank",
      account: "0987654321",
      name: "TRAN MINH TUAN",
    },
  },
};

const Demo = () => {
  const { toast } = useToast();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attending: true,
  });
  const [wishData, setWishData] = useState({ name: "", message: "" });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const diff = coupleData.weddingDate.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "RSVP Submitted!",
      description: "Thank you for confirming your attendance.",
    });
    setRsvpData({ name: "", phone: "", guests: "1", attending: true });
  };

  const handleWish = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Wish Sent!",
      description: "Thank you for your lovely message!",
    });
    setWishData({ name: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden invitation-pattern">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blush/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-champagne-light/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Save the Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-8">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium">Save the Date</span>
            </div>

            {/* Names */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold mb-4">
              <span className="text-gradient-gold">{coupleData.bride.name}</span>
              <span className="text-primary mx-4">&</span>
              <span className="text-gradient-gold">{coupleData.groom.name}</span>
            </h1>

            {/* Date */}
            <p className="font-elegant text-2xl md:text-3xl text-muted-foreground mb-12">
              February 14, 2025
            </p>

            {/* Avatars */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-primary/20 overflow-hidden shadow-elegant bg-secondary"
              />
              <Heart className="w-8 h-8 text-primary fill-primary animate-heartbeat" />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-primary/20 overflow-hidden shadow-elegant bg-secondary"
              />
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border shadow-soft"
                >
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("rsvp")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Users className="w-4 h-4" />
                RSVP Now
              </Button>
              <Button
                variant="outline-elegant"
                size="lg"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-primary/50" />
            </motion.div>
          </motion.div>
        </div>

        {/* Music Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-elegant"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </section>

      {/* Love Story Section */}
      <section className="py-24 bg-cream-dark/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Our Love Story
            </h2>
            <p className="font-elegant text-xl leading-relaxed text-muted-foreground">
              {coupleData.story}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Calendar className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Wedding Events
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-6">
            {coupleData.events.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {event.name}
                    </h3>
                    <p className="text-primary font-medium mb-1">
                      {event.date} - {event.time}
                    </p>
                    <p className="text-muted-foreground flex items-start gap-2">
                      <MapPin className="w-4 h-4 shrink-0 mt-1" />
                      {event.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Camera className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Our Moments
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {coupleData.gallery.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-2xl bg-cream-dark overflow-hidden shadow-soft hover:shadow-elegant transition-all cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-24 bg-background invitation-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              RSVP
            </h2>
            <p className="text-muted-foreground font-elegant text-lg">
              Please let us know if you'll be joining us
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleRSVP}
            className="max-w-md mx-auto p-8 rounded-2xl bg-card border border-border shadow-elegant"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  placeholder="Enter your name"
                  value={rsvpData.name}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  placeholder="Enter your phone"
                  value={rsvpData.phone}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Guests
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={rsvpData.guests}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, guests: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={rsvpData.attending ? "gold" : "outline"}
                  className="flex-1"
                  onClick={() => setRsvpData({ ...rsvpData, attending: true })}
                >
                  Attending
                </Button>
                <Button
                  type="button"
                  variant={!rsvpData.attending ? "gold" : "outline"}
                  className="flex-1"
                  onClick={() => setRsvpData({ ...rsvpData, attending: false })}
                >
                  Not Attending
                </Button>
              </div>
              <Button type="submit" variant="gold" className="w-full" size="lg">
                <Send className="w-4 h-4" />
                Submit RSVP
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Guest Wishes */}
      <section className="py-24 bg-cream-dark/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Wishes & Blessings
            </h2>
            <p className="text-muted-foreground font-elegant text-lg">
              Leave your wishes for the happy couple
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Wish Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleWish}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft mb-8"
            >
              <div className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={wishData.name}
                  onChange={(e) =>
                    setWishData({ ...wishData, name: e.target.value })
                  }
                  required
                />
                <Textarea
                  placeholder="Write your wishes..."
                  rows={3}
                  value={wishData.message}
                  onChange={(e) =>
                    setWishData({ ...wishData, message: e.target.value })
                  }
                  required
                />
                <Button type="submit" variant="gold">
                  <Send className="w-4 h-4" />
                  Send Wish
                </Button>
              </div>
            </motion.form>

            {/* Wishes List */}
            <div className="space-y-4">
              {coupleData.wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-semibold text-primary">
                      {wish.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{wish.name}</p>
                      <p className="text-xs text-muted-foreground">{wish.date}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{wish.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gift / Bank Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Gift className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Wedding Gift
            </h2>
            <p className="text-muted-foreground font-elegant text-lg">
              Your presence is the greatest gift, but if you wish to contribute
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Bride's Bank */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center"
            >
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">
                {coupleData.bride.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  {coupleData.bankInfo.bride.bank}
                </p>
                <p className="font-mono text-lg font-medium">
                  {coupleData.bankInfo.bride.account}
                </p>
                <p className="text-muted-foreground">
                  {coupleData.bankInfo.bride.name}
                </p>
              </div>
              <div className="mt-4 p-4 bg-secondary rounded-xl">
                <div className="w-24 h-24 mx-auto bg-foreground/10 rounded-lg" />
                <p className="text-xs text-muted-foreground mt-2">
                  Scan QR to transfer
                </p>
              </div>
            </motion.div>

            {/* Groom's Bank */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center"
            >
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">
                {coupleData.groom.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  {coupleData.bankInfo.groom.bank}
                </p>
                <p className="font-mono text-lg font-medium">
                  {coupleData.bankInfo.groom.account}
                </p>
                <p className="text-muted-foreground">
                  {coupleData.bankInfo.groom.name}
                </p>
              </div>
              <div className="mt-4 p-4 bg-secondary rounded-xl">
                <div className="w-24 h-24 mx-auto bg-foreground/10 rounded-lg" />
                <p className="text-xs text-muted-foreground mt-2">
                  Scan QR to transfer
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-cream-dark border-t border-border text-center">
        <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-4" />
        <p className="font-display text-2xl mb-2">
          {coupleData.bride.name} & {coupleData.groom.name}
        </p>
        <p className="text-muted-foreground">February 14, 2025</p>
        <p className="text-sm text-muted-foreground mt-4">
          Made with love using WeddingCard
        </p>
      </footer>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-elegant"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-semibold">
                  Share Invitation
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowShareModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors flex flex-col items-center gap-2">
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </button>
                <button className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors flex flex-col items-center gap-2">
                  <Instagram className="w-6 h-6 text-pink-600" />
                  <span className="text-xs">Instagram</span>
                </button>
                <button
                  className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors flex flex-col items-center gap-2"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link Copied!",
                      description: "Invitation link copied to clipboard.",
                    });
                  }}
                >
                  <LinkIcon className="w-6 h-6 text-primary" />
                  <span className="text-xs">Copy Link</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Demo;
