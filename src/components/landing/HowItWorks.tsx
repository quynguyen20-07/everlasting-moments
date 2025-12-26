import { motion } from "framer-motion";
import { UserPlus, Edit3, Send, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Account",
    description: "Sign up in seconds and get started with your wedding invitation journey",
  },
  {
    icon: Edit3,
    step: "02",
    title: "Customize Design",
    description: "Choose a template and personalize every detail to match your style",
  },
  {
    icon: Send,
    step: "03",
    title: "Share with Guests",
    description: "Send your beautiful invitation via link, social media, or QR code",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Celebrate Together",
    description: "Collect RSVPs, receive wishes, and enjoy your special day",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/30">
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
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Four Simple Steps to
            <span className="text-gradient-gold"> Your Dream Invitation</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative text-center">
                {/* Step Number */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl font-display font-bold text-primary/10">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary/20 mb-6 shadow-soft">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
